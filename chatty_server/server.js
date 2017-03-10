const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let connects = 0;
let currentContents = '';

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  users = {type: 'users', users: connects += 1};
  console.log('Users:', users);
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(users));
  });


  //ws.send(currentContents);

  // Handle messages
  ws.on('message', handleMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
  users = {type: 'users', users: connects -= 1};
  console.log('Users:', users);
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(users));
  });
  })
});



// Broadcast - Goes through each client and sends message data
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(data));
  });
};


// Handles incoming messages.
// Stores the current state of the textbox and broadcasts it
function handleMessage(message) {
  message = JSON.parse(message);
  message["id"] = uuid();
  message.clients = wss.clients.size;
  console.log("Serv Mess************:", message);
  switch(message.type){
    case 'pmess':
      message.type='imess'
      break;
    case 'pnot':
      message.type='inot'
      message.content=`Hey Everyone ${message.old_u} changed their name to ${message.new_u}`
      break;
  }

  wss.broadcast(message);
}


// Simply broadcasts the message back to all clients
function broadcastBack(message) {
  console.log(`Received: ${message}`)
  wss.broadcast(message);
}

