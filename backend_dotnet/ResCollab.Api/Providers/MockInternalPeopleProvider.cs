using System;
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
