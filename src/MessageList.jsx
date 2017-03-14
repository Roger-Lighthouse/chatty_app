import React, {Component} from 'react';
import Message from './Message.jsx';



class MessageList extends Component {

   render(){
     return (
        <div>
            {this.props.messages.map((mess, index) => {
              if(mess.username == this.props.username){
                return <Message username={this.props.username} color={this.props.color}  type={mess.type} name={mess.username} mess={mess.content} key={index}/>
              }else{
                return <Message username={this.props.username} color={'black'}  type={mess.type} name={mess.username} mess={mess.content} key={index}/>
              }

            })}
        </div>
      )
  };

}

export default MessageList;






















