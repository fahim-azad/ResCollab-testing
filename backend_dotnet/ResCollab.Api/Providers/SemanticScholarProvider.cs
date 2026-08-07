using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class SemanticScholarProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public SemanticScholarProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
            if (!_httpClient.DefaultRequestHeaders.Contains("User-Agent"))
            {
                _httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0");
            }
        }

        public string ProviderName => "Semantic Scholar (ResearchGate Network)";
        public string ResultType => "papers";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"https://api.semanticscholar.org/graph/v1/paper/search?query={Uri.EscapeDataString(query)}&limit=15&fields=title,authors,year,url";
                var response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode) return new List<SearchResultItem>();
                
                var jsonString = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(jsonString);
                
                var results = new List<SearchResultItem>();
                if (data.TryGetProperty("data", out var items))
                {
                    foreach (var item in items.EnumerateArray())
                    {
                        var link = item.TryGetProperty("url", out var u) && u.ValueKind != JsonValueKind.Null ? u.GetString() : "";
                        var title = item.TryGetProperty("title", out var t) && t.ValueKind != JsonValueKind.Null ? t.GetString() : "";
                        if (string.IsNullOrEmpty(title)) continue;
                        
                        var authors = new List<string>();
                        if (item.TryGetProperty("authors", out var authorList))
                        {
                            foreach (var author in authorList.EnumerateArray())
                            {
                                if (author.TryGetProperty("name", out var name)) authors.Add(name.GetString());
                            }
                        }
                        
                        var id = item.TryGetProperty("paperId", out var pId) && pId.ValueKind != JsonValueKind.Null ? pId.GetString() : link;
                        var year = item.TryGetProperty("year", out var y) && y.ValueKind != JsonValueKind.Null ? y.GetInt32().ToString() : null;
                        
                        results.Add(new SearchResultItem
                        {
                            Id = id,
                            Title = title,
                            Source = ProviderName,
                            Year = year,
                            Link = link,
                            Authors = authors
                        });
                    }
                }
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Semantic Scholar Provider Error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
