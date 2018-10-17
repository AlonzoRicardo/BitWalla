import React from 'react';
import io from 'socket.io-client';
import './chat.scss';

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            input: '',
            from: this.props.userInSession.username,
            to: this.props.msgTo.match.params.id
        }
    }


    componentDidMount() {
        this.socket = io('localhost:3000/')
        this.socket.on(`message_user_${this.state.from}`, (msg) => {
            this.receiveMessage(msg.msg, msg.from);
            
        });
        
        this.socket.on(`/w ${this.state.from}: `, (msg) => {
            this.receiveWhispers(msg.msg, msg.from)
        })
    }


    receiveWhispers(msg, from) {
        this.setState({
            input: '',
            messages: [...this.state.messages, { msg, from, type: "server" }]
        })
    }


    receiveMessage(msg, from) {
        this.setState({
            input: '',
            messages: [...this.state.messages, { msg, from, type: "server" }]
        })
    }


    submitChat() {
        let msg = this.state.input;
        this.setState({
            input: '',
            messages: [...this.state.messages, { msg, from: this.state.from, type: "me" }]
        });
        this.socket.emit('message', { msg, to: this.state.to, from: this.state.from, timestamp: Date.now() })
    }

    handleSearchBarValue(from) {
        this.setState({
            input: `/w ${from}: `
        })
    }


    render() {
        let { messages, input } = this.state;
        return (
            <div className='private' style={{ border: '1px solid green', padding: '10px' }} onKeyDown={e => e.keyCode === 13 ? this.submitChat() : null}>
                <div className="messages">
                    {messages.map((e, i) => <div className={"msg " + e.type} key={i}><div className="wrap"> {e.from !== this.state.from && <div><small onClick={() => this.handleSearchBarValue(e.from)}> {'from: ' + e.from} </small> <br/></div> }  {e.msg.substring(e.msg.indexOf(':') + 1)} </div></div>)}
                </div>
                <input value={input} onChange={e => this.setState({ input: e.currentTarget.value })} />
            </div>
        )
    }
}