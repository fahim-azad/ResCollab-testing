using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class GitHubProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public GitHubProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
            // Add User-Agent required by GitHub API if not already added
            if (!_httpClient.DefaultRequestHeaders.Contains("User-Agent"))
            {
                _httpClient.DefaultRequestHeaders.Add("User-Agent", "ResCollab/1.0");
            }
        }

        public string ProviderName => "GitHub (Open Source)";
        public string ResultType => "source_code";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"https://api.github.com/search/repositories?q={Uri.EscapeDataString(query)}&sort=stars&order=desc&per_page=100";
                
                var request = new HttpRequestMessage(HttpMethod.Get, url);
                request.Headers.Add("Accept", "application/vnd.github.v3+json");

                var response = await _httpClient.SendAsync(request);
                response.EnsureSuccessStatusCode();
                
                var jsonString = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(jsonString);
                
                var results = new List<SearchResultItem>();
                if (data.TryGetProperty("items", out var items))
                {
                    foreach (var item in items.EnumerateArray())
                    {
                        int stars = item.TryGetProperty("stargazers_count", out var s) ? s.GetInt32() : 0;
                        results.Add(new SearchResultItem
                        {
                            Id = item.TryGetProperty("id", out var id) ? id.GetInt64().ToString() : "",
                            Title = item.TryGetProperty("full_name", out var fn) ? fn.GetString() : "Unknown",
                            Source = ProviderName,
                            Language = item.TryGetProperty("language", out var lang) && lang.ValueKind != JsonValueKind.Null ? lang.GetString() : "Unknown",
                            Stars = stars,
                            Link = item.TryGetProperty("html_url", out var link) ? link.GetString() : ""
                        });
                    }
                }
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"GitHub API error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
