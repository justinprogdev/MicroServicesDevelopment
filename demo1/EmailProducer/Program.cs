// See https://aka.ms/new-console-template for more information
using Dapr.Client;

Console.WriteLine("Send a Message!");


//
//var client = new HttpClient();
//client.BaseAddress = new Uri("http://localhost:1337");
using var client = new DaprClientBuilder().Build();
while(true)
{
   

    var messageToSend = new EmailMessage("jeff@aol.com", "It is now " + DateTime.Now.ToLongTimeString());


    await client.PublishEventAsync("emails", "email-requested", messageToSend);

    await Task.Delay(3000);
   
}

public record EmailMessage(string emailAddress, string message);
