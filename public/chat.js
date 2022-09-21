// make connection
const socket = io.connect("http://localhost:1995");
const message = document.getElementById("message"),
  username = document.getElementById("username"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    username: username.value,
  });
  message.value = "";
});

message.addEventListener('keypress',() =>{
        socket.emit('typing', username.value);
})

socket.on("chat", (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.username + ":</strong>" + data.message + "</p>";
});

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
})