using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class FigshareProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public FigshareProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public string ProviderName => "Figshare";
        public string ResultType => "datasets";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = "https://api.figshare.com/v2/articles/search";
                var payload = new
                {
                    search_for = query,
                    item_type = 3,
                    limit = 100
                };
                
                var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(url, content);
                response.EnsureSuccessStatusCode();
                
                var jsonString = await response.Content.ReadAsStringAsync();
                var items = JsonSerializer.Deserialize<JsonElement>(jsonString);
                
                var results = new List<SearchResultItem>();
                foreach (var item in items.EnumerateArray())
                {
                    var pubDate = item.TryGetProperty("published_date", out var pd) ? pd.GetString() : "";
                    var year = !string.IsNullOrEmpty(pubDate) && pubDate.Length >= 4 ? pubDate.Substring(0, 4) : "";

                    results.Add(new SearchResultItem
                    {
                        Id = item.TryGetProperty("id", out var id) ? id.GetInt64().ToString() : "",
                        Title = item.TryGetProperty("title", out var title) ? title.GetString() : "Unknown",
                        Source = ProviderName,
                        Year = year,
                        Link = item.TryGetProperty("url_public_html", out var link) ? link.GetString() : ""
                    });
                }
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Figshare API error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
