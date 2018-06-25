import React, {Component} from 'react';
import './chat.css';
import Message from '../../elements/message/message';
import SystemMessage from '../../elements/systemMessage/systemMessage';

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        this.props.socket.on('message', message => {
            this.addMessage(message.message, message.username, message.time);
        });
        this.props.socket.on('newUserJoined', data => {
            this.addSystemMessage(`${data.username} joined the chat`, data.time);
        });
        this.props.socket.on('userLeft', data => {
            if (data.reason) {
                this.addSystemMessage(data.reason, data.time);
            } else {
                this.addSystemMessage(`${data.username} left the chat`, data.time);
            }
        });
    }

    addSystemMessage(message, time) {
        this.setState(prevState => {
            return {
                messages: [
                    ...prevState.messages, 
                    {
                        isSystem: true,
                        message,
                        time,
                    }
                ]
            }
        });
    }

    submitMessage(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const message = data.get('message').trim();
        if (!message.length) {
            return;
        }

        this.props.socket.emit('message', message);
        this.refs.messageInput.value = '';

        this.addMessage(message, this.props.username, Date.now(), true);
    }

    addMessage(message, username, time, isUserMessage = false) {
        this.setState(prevState => {
            return {
                messages: [
                    ...prevState.messages, 
                    {
                        message,
                        username,
                        time, //TODO add ordering based on time 
                        isUserMessage
                    }
                ]
            }
        });
    }

    onDisconnectPressed() {
        this.props.onDisconnectPressed();
    }
    
    componentDidUpdate() {
        if (this.wasScrolledToBottom) {
            this.panelBodyElement.scrollTop = this.panelBodyElement.scrollHeight - this.panelBodyElement.clientHeight;
        }
    }
    componentWillUpdate() {
        this.wasScrolledToBottom = this.panelBodyElement.scrollHeight - this.panelBodyElement.clientHeight  <= this.panelBodyElement.scrollTop + 1;
    }

    render () {
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <button type="button" onClick={this.onDisconnectPressed.bind(this)} className="btn btn-dark btn-sm btn-disconnect">Disconnect</button>
                </div>
            </div>
            <div className="row panel-body" ref={el => {this.panelBodyElement = el}}>
                <div className="col-md-12">
                        <ul className="chat container">
                            {
                                this.state.messages.map((messageObj, i) => {
                                    if (messageObj.isSystem) {
                                        return <SystemMessage
                                            key={i}
                                            message={messageObj.message}
                                            time={messageObj.time}
                                        />
                                    } else {
                                        return <Message
                                            key={i}
                                            message={messageObj.message}
                                            username={messageObj.username}
                                            time={messageObj.time}
                                        />
                                    }
                                })
                            }
                        </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.submitMessage.bind(this)}>
                        <div className="input-group">
                            <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." name="message" ref="messageInput" autoFocus/>
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-dark btn-chat">Send</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default ChatPage;