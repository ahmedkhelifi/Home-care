import io from 'socket.io-client'
const socket = io('ws://localhost:5000')

socket.on('connect', function () {
    console.log( 'socket connected with sockID:',socket.id );   // 标识socket session独一无二的符号，在客户端连接到服务端被设置
});

socket.on('recieveMsg', function(data){
    console.log('browser get msg:',data)
})
socket.emit('sendMsg',{name:'Tom',data:Date.now()})
console.log('browser send to server',{name:'Tom',data:Date.now()})

