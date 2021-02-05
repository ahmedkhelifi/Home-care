function handle_request(wss, WebSocket) {

  var online = []
  var ping = JSON.stringify({type: 'ping'})

  wss.on('connection', function connection(ws) {

     ws.on('message', function incoming(data) {
        // wss.clients.forEach(function each(client) {
        //   if (client !== ws && client.readyState === WebSocket.OPEN) {
        //     client.send(data);
        //   }
        // });

        let  m = JSON.parse(data)

          if (m.type == 'online') {
              // m.user.IP = ws._socket.remoteAddress
              // m.user.id = m.id
              // m.user.type = m.idType
              // m.user.lastAlive = Math.round((new Date()).getTime() / 1000)
              online.push({id: m.id, name: m.name, idType: m.idType, lastAlive: Math.round((new Date()).getTime() / 1000)})
              wss.clients.forEach(function each(client) {
                if (client == ws) {
                  client.id = m.id
                  client.name = m.name
                  client.idType = m.idType
                }
              })
              console.log(m.idType + ' ' + m.name + ' online')
          }
          //check if user still responsive
          if (m.type == 'pong') {
            // console.log('pobng')
            online.forEach(function each(client) {
              if(client.id == m.id && client.idType == m.idType ) client.lastAlive = Math.round((new Date()).getTime() / 1000);
            })
          }

          //check if user still responsive
          if (m.type == 'chatroom_update') {
            // console.log('pong')
            // console.log(m)
            // console.log('online')
            // console.log(online)
            send_chatroom(m.chatroom, m.to_id, m.to_type)
          }

      });

  })

    //Forward Message to Clients
    function send_chatroom(chatroom, to_id, to_type) {
            wss.clients.forEach(function each(client) {
                // console.log('client: -----')
                // console.log('id: ' + client.id + '(vs '+to_id+')' + ' typeID: ' + client.idType + '(vs '+to_type+')' )
                if ( client.id == to_id && client.idType == to_type && client.readyState === WebSocket.OPEN && !client.master) {
                    client.send( JSON.stringify({type: 'update_chatroom', chatroom: chatroom}));
                }
            });
    }

  //SEND PING INTERVAL
  setInterval(function(){
   if(online.length != 0) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(ping);
      }
    });
   }
  }, 8000);

  //DETECT OFFLINE USERS who didn't respond to ping after interval
  setInterval(function(){
   if(online.length != 0) {
    online.forEach(function each(client) {
      let currentTime = Math.round((new Date()).getTime() / 1000)
      if (currentTime - client.lastAlive > 10) {
        console.log(client.idType + ' ' + client.name + " Disconnected " )
        online = online.filter((item) => item.id !== client.id && item.idType !== client.idType  );
        // sendToMasters(JSON.stringify({type: 'online', clients: CLIENTS, voted: {}, master_session:{session: false}}))


      }
    });
   }
  }, 20000);


}
module.exports = {handle_request}
