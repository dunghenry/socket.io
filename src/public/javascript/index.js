document.addEventListener("DOMContentLoaded", function () {
    const socket = io('http://localhost:4000');
    const btn = document.getElementById('btn');
    btn.onclick = function () {
        socket.emit('chat', 'hello');
    }
}, false);