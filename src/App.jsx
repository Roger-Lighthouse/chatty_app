import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
const uuid = require('uuid/v1');
const colors = ['red', 'blue', 'orange', 'brown'];



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Type your message',
      username: 'Who?',
      messages: [],
      color: 'black'
    };
  }


  componentDidMount() {
    this.my_socket = new WebSocket("ws://localhost:3001/socketserver", "protocolOne");
    this.my_socket.onopen = (e) => {
      this.my_socket.onmessage = (ev) => {
        if(ev){
          let data = JSON.parse(ev.data);
            switch(data.type){
               case 'imess':
                 this.state.messages.push(data);
                 this.setState({messages: this.state.messages});
                 break;
               case 'inot':
                 this.state.messages.push(data);
                 this.setState({messages: this.state.messages});
                 break;
              case 'users':
                 this.setState({users: data.users});
                 break;
             }
       }
     }
    }
  }


  _changeMessage(ev){
    if(ev.which === 13){
      this.setState({message: ev.target.value});
      const newData = {id: null, type: 'pmess', username: this.state.username, content: ev.target.value};
      this.my_socket.send(JSON.stringify(newData));
    }
  }

  _changeUserName(ev){
    if(ev.which === 13){
      let old_u = this.state.username;
      this.setState({username: ev.target.value});
      let new_u = ev.target.value;
      const newData = {id: null, type: 'pnot', old_u: old_u, new_u: new_u};
      this.my_socket.send(JSON.stringify(newData));
      let color = colors[this._randomNumber()];
      this.setState({color: color})

    }
  }

  _randomNumber(){
    var min=0;
    var max=4;
    var val=Math.floor((Math.random()*(max-min))+min);
    return val;
  }


  render(){
    const num_mess = this.state.users;
      return (
      <div>
        <nav className='navbar'>
          <a href="/" className="navbar-brand">Chatty</a>
          <a href="/" className="navbar-users">Users Online {num_mess}</a>
        </nav>
        <MessageList username={this.state.username} color={this.state.color} messages={this.state.messages}/>
        <ChatBar username={this.state.username} message={this.state.message}  changeMessage={this._changeMessage.bind(this)} changeUserName={this._changeUserName.bind(this)}/>
      </div>
    );
  }

}

export default App;
