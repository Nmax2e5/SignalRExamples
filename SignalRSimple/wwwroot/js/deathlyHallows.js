﻿var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter"); 

//create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()   
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyhallows").build();

//connect to methods that hub inbokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowCount",
    (cloak, stone, wand) => {
        cloakSpan.innerText = cloak.toString();
        stoneSpan.innerText = stone.toString();
        wandSpan.innerText = wand.toString();
    });

//invoke hub methods aka send notification to hub

//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to DeathlyHallows Hub Successful");
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });
}
function rejected() {
    //rejected logs
}

connectionDeathlyHallows.start().then(fulfilled, rejected);