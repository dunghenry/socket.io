document.addEventListener("DOMContentLoaded", function () {
    const socket = io('http://localhost:4000');
    const btn = document.getElementById('btn');
    const p = document.getElementsByTagName('p')[0];
    socket.on('sendNotification', msg =>{
        p.innerHTML = msg
    })
    socket.on('send', msg =>{
        console.log(msg);
    })
    btn.onclick = function () {
        socket.emit('chat', 'hello');
    }
}, false);