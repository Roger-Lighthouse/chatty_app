
import React, {Component} from 'react';

class ChatBar extends Component {
   constructor(props) {
    super(props);
    this.state = {test: "Some Stuff"};
  }


   render(){
      return (
        <div>
          <footer className="chatbar">
              <input className="chatbar-username"  onKeyUp={this.props.changeUserName} placeholder={this.props.username} />
              <input className="chatbar-message"  onKeyPress={this.props.changeMessage} placeholder={this.props.mess} />
          </footer>
        </div>
      )
  }
}

export default ChatBar;


