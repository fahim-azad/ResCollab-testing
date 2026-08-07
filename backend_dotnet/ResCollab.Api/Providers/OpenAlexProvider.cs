using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class OpenAlexProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public OpenAlexProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public string ProviderName => "OpenAlex (Global Papers)";
        public string ResultType => "papers";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"https://api.openalex.org/works?search={Uri.EscapeDataString(query)}&per-page=50&mailto=rescollab@example.com";
                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                
                var jsonString = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(jsonString);
                
                var results = new List<SearchResultItem>();
                if (data.TryGetProperty("results", out var items))
                {
                    foreach (var item in items.EnumerateArray())
                    {
                        results.Add(new SearchResultItem
                        {
                            Id = item.GetProperty("id").GetString(),
                            Title = item.TryGetProperty("title", out var title) ? title.GetString() : "Unknown",
                            Source = ProviderName,
                            Year = item.TryGetProperty("publication_year", out var year) ? year.GetInt32().ToString() : "",
                            Link = item.TryGetProperty("doi", out var doi) && doi.ValueKind != JsonValueKind.Null ? doi.GetString() : item.GetProperty("id").GetString()
                        });
                    }
                }
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"OpenAlex Error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
