function handle_request(wss, WebSocket) {

  wss.on('connection', function connection(ws) {

     ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });

  })
}
module.exports = {handle_request}
