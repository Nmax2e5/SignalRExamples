using Microsoft.AspNetCore.SignalR;

namespace SignalRSimple.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; }
        public static int TotalUsers { get; set; }

        public override Task OnConnectedAsync() 
        {
            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task<string> NewWindowLoaded(string name)  
        {   
            TotalViews++;
            //send update to all clients total views have been updated
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
            return $"total views from {name} - {TotalViews}";
        }
    }
}
