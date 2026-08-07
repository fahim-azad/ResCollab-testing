using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public class SearchManager
    {
        private readonly IEnumerable<ISearchProvider> _providers;

        public SearchManager(IEnumerable<ISearchProvider> providers)
        {
            _providers = providers;
        }

        public async Task<SearchResponse> SearchAsync(string query)
        {
            var stopwatch = Stopwatch.StartNew();
            
            var aggregatedResults = new Dictionary<string, List<SearchResultItem>>
            {
                { "papers", new List<SearchResultItem>() },
                { "datasets", new List<SearchResultItem>() },
                { "source_code", new List<SearchResultItem>() },
                { "supervisors", new List<SearchResultItem>() },
                { "open_projects", new List<SearchResultItem>() }
            };

            // Run all providers concurrently using Task.WhenAll
            var tasks = _providers.Select(async provider => 
            {
                var results = await provider.SearchAsync(query);
                return new { Type = provider.ResultType, Data = results };
            }).ToList();

            var completedTasks = await Task.WhenAll(tasks);

            foreach (var result in completedTasks)
            {
                if (aggregatedResults.ContainsKey(result.Type))
                {
                    aggregatedResults[result.Type].AddRange(result.Data);
                }
            }

            stopwatch.Stop();
            var totalResults = aggregatedResults.Values.Sum(list => list.Count);

            return new SearchResponse
            {
                Query = query,
                Results = aggregatedResults,
                Metadata = new SearchMetadata
                {
                    ExecutionTimeMs = stopwatch.ElapsedMilliseconds,
                    TotalResults = totalResults
                }
            };
        }
    }
}
