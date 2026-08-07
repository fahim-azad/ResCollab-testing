using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ResCollab.Api.Providers;
using ResCollab.Api.Models;

namespace ResCollab.Api.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        private readonly SearchManager _searchManager;

        public SearchController(SearchManager searchManager)
        {
            _searchManager = searchManager;
        }

        [HttpGet]
        public async Task<ActionResult<SearchResponse>> Get([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return BadRequest(new { error = "Query parameter 'q' is required." });
            }

            var result = await _searchManager.SearchAsync(q);
            return Ok(result);
        }
    }
}
