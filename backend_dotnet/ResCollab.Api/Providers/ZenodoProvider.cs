using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class ZenodoProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public ZenodoProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public string ProviderName => "Zenodo";
        public string ResultType => "datasets";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"https://zenodo.org/api/records?q={Uri.EscapeDataString(query)}&size=100&type=dataset";
                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                
                var jsonString = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(jsonString);
                
                var results = new List<SearchResultItem>();
                if (data.TryGetProperty("hits", out var hits1) && hits1.TryGetProperty("hits", out var hits2))
                {
                    foreach (var item in hits2.EnumerateArray())
                    {
                        var metadata = item.GetProperty("metadata");
                        var pubDate = metadata.TryGetProperty("publication_date", out var pd) ? pd.GetString() : "";
                        var year = !string.IsNullOrEmpty(pubDate) && pubDate.Length >= 4 ? pubDate.Substring(0, 4) : "";
                        
                        string link = "";
                        if (item.TryGetProperty("links", out var links) && links.TryGetProperty("html", out var html))
                        {
                            link = html.GetString();
                        }

                        results.Add(new SearchResultItem
                        {
                            Id = item.TryGetProperty("id", out var id) ? id.GetInt64().ToString() : "",
                            Title = metadata.TryGetProperty("title", out var title) ? title.GetString() : "Unknown",
                            Source = ProviderName,
                            Year = year,
                            Link = link
                        });
                    }
                }
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Zenodo API error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
