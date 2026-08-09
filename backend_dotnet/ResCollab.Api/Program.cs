using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using ResCollab.Api.Providers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.SnakeCaseLower;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.SetIsOriginAllowed(_ => true)
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

// Register HttpClients for Providers
builder.Services.AddHttpClient<ISearchProvider, OpenAlexProvider>();
builder.Services.AddHttpClient<ISearchProvider, ArxivProvider>();
builder.Services.AddHttpClient<ISearchProvider, CrossrefProvider>();
builder.Services.AddHttpClient<ISearchProvider, GitHubProvider>();
builder.Services.AddHttpClient<ISearchProvider, ZenodoProvider>();
builder.Services.AddHttpClient<ISearchProvider, FigshareProvider>();
builder.Services.AddHttpClient<ISearchProvider, PapersWithCodeProvider>();
builder.Services.AddScoped<ISearchProvider, MockInternalPeopleProvider>();
builder.Services.AddScoped<ISearchProvider, MockInternalProjectsProvider>();
builder.Services.AddHttpClient<ISearchProvider, IEEEProvider>();
builder.Services.AddHttpClient<ISearchProvider, GoogleScholarProvider>();
builder.Services.AddHttpClient<ISearchProvider, SemanticScholarProvider>();
// Register SearchManager
builder.Services.AddScoped<SearchManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

// Must be called before MapControllers
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8000";
app.Run($"http://0.0.0.0:{port}");
