var notificationInputSpan = document.getElementById("notificationInput");
var sendButton_btn = document.getElementById("sendButton");
var navbarDropdown_btn = document.getElementById("navbarDropdown");
var notificationCounterSpan = document.getElementById("notificationCounter");
var messageListSpan = document.getElementById("messageList");
    
//create connection
var connectionNotifications = new signalR.HubConnectionBuilder()   
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/notifications").build();   

sendButton_btn.addEventListener("click", function(event) {
    connectionNotifications.send("AddNotification", notificationInputSpan.value);
    event.preventDefault();
});

connectionNotifications.on("notificationsList",
    (notificationsList) => {
        messageListSpan.innerHTML = "";
        notificationsList.forEach(str => {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(`Notification - ${str}`));
            messageListSpan.appendChild(li);
        });

        notificationCounterSpan.innerText = `(${notificationsList.length})`;
    });

//start connection
function fulfilled() {
    //do something on start
    connectionNotifications.invoke("GetNotifications").then((notificationsList) => {
        messageListSpan.innerHTML = "";
        notificationsList.forEach(str => {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(`Notification - ${str}`));
            messageListSpan.appendChild(li);
        });

        notificationCounterSpan.innerText = `(${notificationsList.length})`;
    });
}
function rejected() {
    //rejected logs
}

connectionNotifications.start().then(fulfilled, rejected);