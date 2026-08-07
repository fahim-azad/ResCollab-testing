using System.Collections.Generic;

namespace ResCollab.Api.Models
{
    public class SearchResultItem
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Source { get; set; }
        public string Year { get; set; }
        public string Link { get; set; }
        public List<string> Authors { get; set; } = new();
        public string Language { get; set; }
        public int? Stars { get; set; }
        public string Name { get; set; }
        public string University { get; set; }
        public List<string> ResearchInterests { get; set; } = new();
        public List<string> OpenRoles { get; set; } = new();
    }

    public class SearchResponse
    {
        public string Query { get; set; }
        public Dictionary<string, List<SearchResultItem>> Results { get; set; } = new();
        public SearchMetadata Metadata { get; set; } = new();
    }

    public class SearchMetadata
    {
        public long ExecutionTimeMs { get; set; }
        public int TotalResults { get; set; }
    }
}
