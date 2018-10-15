import React from 'react';
import './inbox.scss'

export default class Inbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            conversations: [
                {
                    from: 'juan',
                    history: ['yo', 'hello', 'supaduda']
                },

                {
                    from: 'habibi',
                    history: ['pickle rickkkkk', 'wazzaaa', 'm8 no h8']
                },

                {
                    from: 'greg',
                    history: ['sup bae', 'wan some crak', 'wat up bae']
                }
            ]
        }
        console.log(props);
    }


    render() {
        let { conversations } = this.state;
        return (
            <div class="people-list conversations" id="people-list">
                <div class="search">
                    <input type="text" placeholder="search" />
                    <i class="fa fa-search"></i>
                </div>
                <ul class="list">
                    {conversations.map((e, i) => {
                        return (
                            <div>
                                <li className={"clearfix conversations convo"} key={i}>
                                    <img className='chat-img' src="http://www.stickpng.com/assets/images/585e4beacb11b227491c3399.png" alt="avatar" />
                                    <div className='about'>
                                        <div className='name'><h5>{e.from}</h5></div>
                                        <div className='status'>
                                            <p>{e.history[e.history.length - 1]}</p>
                                            <p>{e.history[e.history.length - 2]}</p>
                                        </div>
                                    </div>

                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

