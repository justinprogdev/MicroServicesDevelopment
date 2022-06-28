global using Microsoft.AspNetCore.Mvc;
global using Dapr;

namespace RegistrationProcessor.Controllers;


[ApiController]
public class RegistrationProcessorController : ControllerBase
{
    private readonly ILogger<RegistrationProcessorController> _logger;

    public RegistrationProcessorController(ILogger<RegistrationProcessorController> logger)
    {
        _logger = logger;
    }


    [Topic("registrations", "registration-requested")]
    [HttpPost("registrations")]

    public async Task<ActionResult> ProcessRegistration([FromBody] Object message)
    {
        _logger.LogInformation("Got a registration!: " + message);
        return Ok(); // success status code.
    }
}
