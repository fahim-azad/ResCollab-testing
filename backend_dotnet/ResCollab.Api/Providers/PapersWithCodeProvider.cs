using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class PapersWithCodeProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public PapersWithCodeProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public string ProviderName => "Papers with Code";
        public string ResultType => "source_code";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"https://paperswithcode.com/api/v1/papers/?q={Uri.EscapeDataString(query)}&items_per_page=50";
                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                
                var jsonString = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(jsonString);
                
                var results = new List<SearchResultItem>();
                if (data.TryGetProperty("results", out var items))
                {
                    foreach (var item in items.EnumerateArray())
                    {
                        var pub = item.TryGetProperty("published", out var p) && p.ValueKind != JsonValueKind.Null ? p.GetString() : "";
                        var year = !string.IsNullOrEmpty(pub) && pub.Length >= 4 ? pub.Substring(0, 4) : "N/A";
                        
                        string link = "";
                        if (item.TryGetProperty("url_pdf", out var pdf) && pdf.ValueKind != JsonValueKind.Null && !string.IsNullOrEmpty(pdf.GetString()))
                            link = pdf.GetString();
                        else if (item.TryGetProperty("url_abs", out var abs) && abs.ValueKind != JsonValueKind.Null)
                            link = abs.GetString();

                        results.Add(new SearchResultItem
                        {
                            Id = item.TryGetProperty("id", out var id) ? id.GetString() : "",
                            Title = item.TryGetProperty("title", out var title) ? title.GetString() : "Unknown",
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
                Console.WriteLine($"Papers with Code API error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
