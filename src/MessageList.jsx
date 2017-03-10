import React, {Component} from 'react';
import Message from './Message.jsx';



class MessageList extends Component {

   render(){
     return (
        <div>
            {this.props.messages.map((mess, index) => {
              return <Message type={mess.type} name={mess.username} mess={mess.content} key={index}/>
            })}
        </div>
      )
  };

}

export default MessageList;






















