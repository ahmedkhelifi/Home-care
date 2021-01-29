import io from "socket.io-client"
const socket = io('ws://localhost:5000')

socket.on('recieveMsg', function(data){
    console.log('browser get msg:',data)
})
socket.emit('sendMsg',{name:'Tom',data:Date.now()})
console.log('browser send to server',{name:'Tom',data:Date.now()})