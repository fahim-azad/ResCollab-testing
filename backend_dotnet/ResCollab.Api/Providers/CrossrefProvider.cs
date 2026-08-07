using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class CrossrefProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public CrossrefProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public string ProviderName => "Crossref (IEEE/ACM)";
        public string ResultType => "papers";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"https://api.crossref.org/works?query={Uri.EscapeDataString(query)}&rows=100&mailto=rescollab@example.com&filter=type:journal-article";
                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                
                var jsonString = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<JsonElement>(jsonString);
                
                var results = new List<SearchResultItem>();
                if (data.TryGetProperty("message", out var message) && message.TryGetProperty("items", out var items))
                {
                    foreach (var item in items.EnumerateArray())
                    {
                        var title = item.TryGetProperty("title", out var titleList) && titleList.GetArrayLength() > 0 ? titleList[0].GetString() : "Unknown Title";
                        
                        var authors = new List<string>();
                        if (item.TryGetProperty("author", out var authorList))
                        {
                            int count = 0;
                            foreach (var author in authorList.EnumerateArray())
                            {
                                if (count >= 3) break;
                                var given = author.TryGetProperty("given", out var g) ? g.GetString() : "";
                                var family = author.TryGetProperty("family", out var f) ? f.GetString() : "";
                                var name = $"{given} {family}".Trim();
                                if (!string.IsNullOrEmpty(name)) authors.Add(name);
                                count++;
                            }
                        }
                        
                        string year = "";
                        if (item.TryGetProperty("published-print", out var pp) && pp.TryGetProperty("date-parts", out var dp1) && dp1.GetArrayLength() > 0 && dp1[0].GetArrayLength() > 0)
                        {
                            year = dp1[0][0].GetInt32().ToString();
                        }
                        else if (item.TryGetProperty("created", out var cr) && cr.TryGetProperty("date-parts", out var dp2) && dp2.GetArrayLength() > 0 && dp2[0].GetArrayLength() > 0)
                        {
                            year = dp2[0][0].GetInt32().ToString();
                        }

                        results.Add(new SearchResultItem
                        {
                            Id = item.TryGetProperty("DOI", out var doi) ? doi.GetString() : "",
                            Title = title,
                            Source = item.TryGetProperty("publisher", out var pub) ? pub.GetString() : ProviderName,
                            Authors = authors,
                            Year = year,
                            Link = item.TryGetProperty("URL", out var link) ? link.GetString() : ""
                        });
                    }
                }
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Crossref API error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
