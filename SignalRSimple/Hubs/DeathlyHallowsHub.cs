﻿using Microsoft.AspNetCore.SignalR;

namespace SignalRSimple.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DeathlyHallowRace;
        }
    }
}
