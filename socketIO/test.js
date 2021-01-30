// module.exports=function(server){
//     const io = require('socket.io')(server, { cors: true });;
//     io.on('connection',function(socket){
//         console.log('socketio connected')
//         socket.on('recieveMsg', function(data){
//             console.log('browser get msg:',data)
//             io.emit('sendMsg',{name:'Tom',data:Date.now()})
//         console.log('browser send to server',{name:'Tom',data:Date.now()})
//     })
// })
// }


function test_function(io){
  io.on('connection', function(socket){
        console.log('socketio connected')
        socket.on('sendMsg',function(data){
          console.log('server get browser msg',data)
          data.name=data.name.toUpperCase()
          socket.emit('recieveMsg',data.name+'_'+data.data)
          console.log('server send to browser',data)
        })
    })
  }
  
  module.exports = {test_function}