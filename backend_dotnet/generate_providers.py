import os

base_path = r"d:\3-2 class stuff\software lab\project\ResCollab testing\backend_dotnet\ResCollab.Api\Providers"

providers = {
    "ArxivProvider.cs": """using System;
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
                    var title = entry.Element(ns + "title")?.Value.Replace("\\n", " ").Trim() ?? "";
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
""",
    "CrossrefProvider.cs": """using System;
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
""",
    "GitHubProvider.cs": """using System;
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
""",
    "ZenodoProvider.cs": """using System;
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
""",
    "FigshareProvider.cs": """using System;
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
""",
    "PapersWithCodeProvider.cs": """using System;
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
""",
    "MockInternalPeopleProvider.cs": """using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class MockInternalPeopleProvider : ISearchProvider
    {
        public string ProviderName => "ResCollab Internal";
        public string ResultType => "supervisors";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            await Task.Delay(100);
            var results = new List<SearchResultItem>();
            if (query.ToLower().Contains("deepfake"))
            {
                results.Add(new SearchResultItem
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Dr. Sarah Connor",
                    University = "Stanford University",
                    Source = ProviderName,
                    ResearchInterests = new List<string> { "Computer Vision", "Deepfakes", "AI Safety" }
                });
            }
            return results;
        }
    }
}
""",
    "MockInternalProjectsProvider.cs": """using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class MockInternalProjectsProvider : ISearchProvider
    {
        public string ProviderName => "ResCollab Internal";
        public string ResultType => "open_projects";

        public async Task<List<SearchResultItem>> SearchAsync(string query)
        {
            await Task.Delay(100);
            var results = new List<SearchResultItem>();
            if (query.ToLower().Contains("deepfake"))
            {
                results.Add(new SearchResultItem
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = "Real-time Deepfake Detection Browser Extension",
                    Source = ProviderName,
                    OpenRoles = new List<string> { "Frontend Engineer", "ML Engineer" }
                });
            }
            return results;
        }
    }
}
""",
    "IEEEProvider.cs": """using System;
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
""",
    "GoogleScholarProvider.cs": """using System;
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
                            var yearMatch = Regex.Match(parts[1], @"\b(19|20)\d{2}\b");
                            if (yearMatch.Success) year = yearMatch.Value;
                        }
                    }
                    
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
                return results;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Google Scholar Provider Error: {ex.Message}");
                return new List<SearchResultItem>();
            }
        }
    }
}
""",
    "SemanticScholarProvider.cs": """using System;
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
"""
}

for filename, content in providers.items():
    with open(os.path.join(base_path, filename), "w", encoding="utf-8") as f:
        f.write(content)

print("Created all C# providers.")
