using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Xml.Linq;
using System.Threading.Tasks;
using System.Linq;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class ArxivProvider : ISearchProvider
    {
        private readonly HttpClient _httpClient;

        public ArxivProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public string ProviderName => "arXiv";
        public string ResultType => "papers";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            try
            {
                var url = $"http://export.arxiv.org/api/query?search_query=all:{Uri.EscapeDataString(query)}&start=0&max_results=100";
                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                
                var xmlString = await response.Content.ReadAsStringAsync();
                var doc = XDocument.Parse(xmlString);
                XNamespace ns = "http://www.w3.org/2005/Atom";
                
                var results = new List<SearchResultItem>();
                foreach (var entry in doc.Descendants(ns + "entry"))
                {
                    var title = entry.Element(ns + "title")?.Value.Replace("\n", " ").Trim() ?? "";
                    var published = entry.Element(ns + "published")?.Value;
                    var year = !string.IsNullOrEmpty(published) && published.Length >= 4 ? published.Substring(0, 4) : "";
                    var link = entry.Element(ns + "id")?.Value ?? "";
                    
                    var authors = entry.Elements(ns + "author")
                        .Select(a => a.Element(ns + "name")?.Value)
                        .Where(n => !string.IsNullOrEmpty(n))
                        .Take(3)
                        .ToList();
                        
                    results.Add(new SearchResultItem
                    {
                        Id = link.Split('/').LastOrDefault() ?? link,
                        Title = title,
                        Source = ProviderName,
                        Authors = authors,
                        Year = year,
                        Link = link
                    });
                }
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"arXiv API error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
