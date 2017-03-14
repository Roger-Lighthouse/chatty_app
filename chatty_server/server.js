const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
const rand_col = require('randomcolor');


const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
let connects = 0;
let currentContents = '';


wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('Color: ' + rand_col());
  users = {type: 'users', users: connects += 1};
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(users));
  });


  ws.on('message', handleMessage);


  ws.on('close', () => {
  users = {type: 'users', users: connects -= 1};
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(users));
  });
  })
});


wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(data));
  });
};


function handleMessage(message) {
  message = JSON.parse(message);
  message["id"] = uuid();
  message.clients = wss.clients.size;
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



function broadcastBack(message) {
  wss.broadcast(message);
}

