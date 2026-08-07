using System;
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
