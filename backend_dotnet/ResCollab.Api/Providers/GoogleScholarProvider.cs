using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class GoogleScholarProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public GoogleScholarProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
            if (!_httpClient.DefaultRequestHeaders.Contains("User-Agent"))
            {
                _httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
                _httpClient.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.9");
            }
        }

        public string ProviderName => "Google Scholar";
        public string ResultType => "papers";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"https://scholar.google.com/scholar?q={Uri.EscapeDataString(query)}";
                var response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode) return new List<SearchResultItem>();
                
                var html = await response.Content.ReadAsStringAsync();
                var results = new List<SearchResultItem>();
                
                // Extremely simple regex matching for demo purposes
                var matches = Regex.Matches(html, @"<div class=""gs_ri"">(.*?)</div>", RegexOptions.Singleline);
                foreach (Match match in matches)
                {
                    if (results.Count >= 15) break;
                    
                    var itemHtml = match.Groups[1].Value;
                    var titleMatch = Regex.Match(itemHtml, @"<h3 class=""gs_rt"">.*?<a.*?href=""(.*?)"".*?>(.*?)</a></h3>");
                    if (!titleMatch.Success) continue;
                    
                    var link = titleMatch.Groups[1].Value.Replace("&amp;", "&");
                    var title = Regex.Replace(titleMatch.Groups[2].Value, "<.*?>", "");
                    
                    var metaMatch = Regex.Match(itemHtml, @"<div class=""gs_a"">(.*?)</div>");
                    var authors = new List<string>();
                    string year = "";
                    string journalName = "Unknown Journal";
                    
                    if (metaMatch.Success)
                    {
                        var metaText = Regex.Replace(metaMatch.Groups[1].Value, "<.*?>", "");
                        var parts = metaText.Split('-');
                        if (parts.Length >= 1)
                        {
                            foreach (var a in parts[0].Split(','))
                            {
                                authors.Add(a.Trim());
                            }
                        }
                        if (parts.Length >= 2)
                        {
                            var journalPart = parts[1];
                            var yearMatch = Regex.Match(journalPart, @"\b(19|20)\d{2}\b");
                            if (yearMatch.Success) 
                            {
                                year = yearMatch.Value;
                                journalName = journalPart.Replace(year, "").Replace(",", "").Trim();
                            }
                            else
                            {
                                journalName = journalPart.Trim();
                            }
                        }
                    }

                    // Extract Abstract
                    string abstractText = null;
                    var abstractMatch = Regex.Match(itemHtml, @"<div class=""gs_rs"">(.*?)</div>", RegexOptions.Singleline);
                    if (abstractMatch.Success)
                    {
                        abstractText = Regex.Replace(abstractMatch.Groups[1].Value, "<.*?>", "").Trim();
                    }

                    // Extract Citation Count
                    int? citationCount = null;
                    var citeMatch = Regex.Match(itemHtml, @"Cited by (\d+)");
                    if (citeMatch.Success && int.TryParse(citeMatch.Groups[1].Value, out int cites))
                    {
                        citationCount = cites;
                    }
                    
                    var resultItem = new SearchResultItem
                    {
                        Id = link,
                        Title = title,
                        Source = ProviderName,
                        Year = year,
                        Link = link,
                        Authors = authors,
                        Abstract = abstractText,
                        CitationCount = citationCount,
                        JournalName = string.IsNullOrEmpty(journalName) ? "Unknown Venue" : journalName
                    };

                    MockRankings(resultItem);
                    results.Add(resultItem);
                }
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Google Scholar Provider Error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }

        private void MockRankings(SearchResultItem item)
        {
            // Only assign rankings to some items to show UI variation
            var rand = new Random(item.Title.GetHashCode());
            
            // 70% chance to have rankings
            if (rand.Next(10) > 2)
            {
                var j = item.JournalName?.ToLower() ?? "";
                if (j.Contains("nature") || j.Contains("science") || j.Contains("machine learning"))
                {
                    item.SJR = "Q1";
                    item.ABS = "4*";
                    item.ABDC = "A*";
                }
                else if (j.Contains("ieee") || j.Contains("acm"))
                {
                    item.SJR = "Q1";
                    item.ABS = "3";
                    item.ABDC = "A";
                }
                else
                {
                    item.SJR = "Q" + rand.Next(1, 5);
                    var absRatings = new[] { "4", "3", "2", "1" };
                    item.ABS = absRatings[rand.Next(absRatings.Length)];
                    var abdcRatings = new[] { "A", "B", "C" };
                    item.ABDC = abdcRatings[rand.Next(abdcRatings.Length)];
                }
            }
        }
    }
}
