import React from 'react';
import io from 'socket.io-client';
import './chat.scss';

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            prefix: `/w ${this.props.msgTo.match.params.id}:`,
            input: '',
            from: this.props.userInSession.username,
            to: this.props.msgTo.match.params.id
        }
    }


    componentDidMount() {
        this.socket = io(`${process.env.REACT_APP_API_URL}/`)

        this.socket.on(`/w ${this.state.from}: `, (msg) => {
            this.receiveWhispers(msg.msg, msg.from)
        })

        document.body.style.backgroundColor = "#ffffff";
    }


    receiveWhispers(msg, from) {
        this.setState({
            messages: [...this.state.messages, { msg, from, type: "server" }]
        })
    }


    submitChat() {
        let msg = this.state.input;

        this.setState({
            input: this.state.prefix,
            messages: [...this.state.messages, { msg, from: this.state.from, type: "me" }]
        })

        this.socket.emit('message', { msg, to: this.state.to, from: this.state.from, timestamp: Date.now() })
    }


    handleSearchBarValue(from) {
        this.setState({
            prefix: `/w ${from}: `,
            input: `/w ${from}: `
        })
    }


    render() {
        let { messages, input } = this.state;
        return (
            <div>
                <div className='private'  onKeyDown={e => e.keyCode === 13 ? this.submitChat() : null}>
                    <div className="messages" title="This is a unique title" scrolling="yes">
                        {messages.map((e, i) => <div className={"msg " + e.type} key={i}><div className="wrap"> {e.from !== this.state.from && <div><small onClick={() => this.handleSearchBarValue(e.from)}> {'from: ' + e.from} </small> <br /></div>}  {e.msg.substring(e.msg.indexOf(':') + 1)} </div></div>)}
                    </div>
                    <div className='input-group mb-3 chatGroup'>
                        <input className='form-control chatInput' aria-label="Recipient's username" aria-describedby="basic-addon2" value={input} onChange={e => this.setState({ input: e.currentTarget.value })} />
                        <div className="input-group-append">
                            <span className="input-group-text chatSend" id="basic-addon2" onClick={() => this.submitChat()}>send</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}