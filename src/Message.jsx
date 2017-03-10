import React, {Component} from 'react';



class Message extends Component {

  render(){
  console.log("In <Message/>", this.props);
  let className = 'message-change-username-red';
      if(this.props.type === 'inot'){
        return (
          <div>
            <span className={className}>{this.props.mess}</span><br/>
          </div>
        );

      }else{
        return (
          <div className="message system">
            <span className="message-username-"{className}>{this.props.name}</span>
            <span className="message-content">{this.props.mess}</span><br/>
          </div>
        );

      }
    }
}

export default Message;
