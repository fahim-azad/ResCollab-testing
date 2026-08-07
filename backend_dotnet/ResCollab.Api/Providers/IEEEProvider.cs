using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class IEEEProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public IEEEProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
            if (!_httpClient.DefaultRequestHeaders.Contains("User-Agent"))
            {
                _httpClient.DefaultRequestHeaders.Add("User-Agent", "ResCollab/1.0 (mailto:rescollab@example.com)");
            }
        }

        public string ProviderName => "IEEE Xplore";
        public string ResultType => "papers";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"https://api.crossref.org/works?query={Uri.EscapeDataString(query)}&filter=member:263&select=title,author,URL,published-print,published-online&rows=20";
                var response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode) return new List<SearchResultItem>();
                
                var jsonString = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(jsonString);
                
                var results = new List<SearchResultItem>();
                if (data.TryGetProperty("message", out var message) && message.TryGetProperty("items", out var items))
                {
                    foreach (var item in items.EnumerateArray())
                    {
                        var title = item.TryGetProperty("title", out var titleList) && titleList.GetArrayLength() > 0 ? titleList[0].GetString() : "";
                        if (string.IsNullOrEmpty(title)) continue;
                        
                        var authors = new List<string>();
                        if (item.TryGetProperty("author", out var authorList))
                        {
                            foreach (var author in authorList.EnumerateArray())
                            {
                                var given = author.TryGetProperty("given", out var g) ? g.GetString() : "";
                                var family = author.TryGetProperty("family", out var f) ? f.GetString() : "";
                                var name = $"{given} {family}".Trim();
                                if (!string.IsNullOrEmpty(name)) authors.Add(name);
                            }
                        }
                        
                        string year = "";
                        var published = new JsonElement();
                        if (item.TryGetProperty("published-print", out var pp)) published = pp;
                        else if (item.TryGetProperty("published-online", out var po)) published = po;
                        
                        if (published.ValueKind != JsonValueKind.Undefined && published.TryGetProperty("date-parts", out var dp) && dp.GetArrayLength() > 0 && dp[0].GetArrayLength() > 0)
                        {
                            year = dp[0][0].GetInt32().ToString();
                        }
                        
                        string link = item.TryGetProperty("URL", out var u) ? u.GetString() : "";
                        results.Add(new SearchResultItem
                        {
                            Id = link,
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
                Console.WriteLine($"IEEE Provider Error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
