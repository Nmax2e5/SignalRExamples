using Microsoft.AspNetCore.SignalR;

namespace SignalRSimple.Hubs
{
    public class NotificationHub : Hub
    {
        public static List<string> Notifications { get; set; } = new();     
        public async Task AddNotification(string notification)  
        {   
            Notifications.Add(notification);

            await Clients.All.SendAsync("notificationsList", Notifications); 
        }

        public async Task<List<string>> GetNotifications()
        {
            return Notifications;
        }
    }
}
