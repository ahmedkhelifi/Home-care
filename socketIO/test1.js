

function test_function(io){
io.on('connection', function(socket){
      console.log('socketio connected')
      socket.on('sendMsg',function(data){
      console.log('server get browser msg',data)
      io.emit('recieveMsg',data.name+'_'+data.data)
      console.log('server send to browser',data)
      })
  })
}

module.exports = {test_function}