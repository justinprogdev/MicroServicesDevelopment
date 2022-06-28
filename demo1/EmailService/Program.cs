using Dapr;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var app = builder.Build();

app.UseCloudEvents(); // More on this in a minute.
// Configure the HTTP request pipeline.


app.MapSubscribeHandler();


app.MapPost("/messages", [Topic("emails", "email-requested")] (Object message) =>
{
    Console.WriteLine("Got a message" + message);

});

app.Run();

