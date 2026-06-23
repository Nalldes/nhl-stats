using Microsoft.AspNetCore.Mvc;

namespace HockeyApi.Controllers;

// [ApiController] talar om för .NET att denna klass ska hantera API-anrop (och t.ex. automatiskt göra om data till JSON)
// [Route] bestämmer URL-sökvägen. [controller] byts automatiskt ut mot namnet på klassen (minus ordet Controller), dvs: api/nhl
[ApiController]
[Route("api/[controller]")]
public class NhlController : ControllerBase
{
    private readonly HttpClient _httpClient;

    // Här använder vi "Dependency Injection". .NET skickar automatiskt in den HttpClient vi registrerade i Program.cs
    public NhlController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    // Detta gör att endpointen lyssnar på ett GET-anrop på adressen: api/nhl/leaders
    [HttpGet("leaders")]
    public async Task<IActionResult> GetStatsLeaders()
    {
        try
        {
            // 1. Vi skickar ett anrop till NHL:s officiella API (här hämtar vi poängligan)
            var response = await _httpClient.GetAsync("https://api-web.nhle.com/v1/skater-stats-leaders/current?categories=points");

            // Om NHL:s server svarar med något fel (t.ex. 404 eller 500)
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Kunde inte hämta data från NHL:s API");
            }

            // 2. Vi läser ut svaret från NHL som en lång textsträng (vilket är rå JSON-data)
            var content = await response.Content.ReadAsStringAsync();

            // 3. Vi skickar tillbaka datan direkt till vår frontend med rätt Content-Type (application/json)
            return Content(content, "application/json");
        }
        catch (Exception ex)
        {
            // Om något totalt kraschar (t.ex. om din dator tappar internet)
            return StatusCode(500, $"Internt serverfel: {ex.Message}");
        }
    }
}