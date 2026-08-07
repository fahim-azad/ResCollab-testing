using System.Collections.Generic;
using System.Threading.Tasks;
using ResCollab.Api.Models;

namespace ResCollab.Api.Providers
{
    public interface ISearchProvider
    {
        string ProviderName { get; }
        string ResultType { get; }
        Task<List<SearchResultItem>> SearchAsync(string query);
    }
}
