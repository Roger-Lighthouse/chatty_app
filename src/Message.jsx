import React, {Component} from 'react';



class Message extends Component {

  render(){
      if(this.props.type === 'inot'){
        return (
          <div>
            <span className="message-change-username">{this.props.mess}</span><br/>
          </div>
        );
      }else{
         const css = `
            .message-username{
              color: ${this.props.color}
            }
          `
          return (
          <div className="message system">
            <style>{css}</style>
            <span  className="message-username">{this.props.name}</span>
            <span className="message-content">{this.props.mess}</span><br/>
          </div>
        );
      }
    }
}

export default Message;
