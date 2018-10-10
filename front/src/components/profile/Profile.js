import React from 'react';

const Profile = (props) => {
    console.log(props);

    return (
        <div className='profileContent'>
            <div className='profileTop'>
                <img src="https://www.joispot.com/assets/img/user.jpg" className='img-circle' alt="some" />
                <div style={{ float: 'left', textAlign: 'start' }}>
                    <h1>{props.userInSession.username}</h1>
                    <p >kokoland</p>
                </div>
            </div>
            <hr />

            <div className='profileItems'>
                {
                    props.userInSession.items.length === 0 ? <h1>NO ITEMS YET</h1>
                        :
                        <div className='items'>
                            {props.userInSession.items.map(e => <img src={e} alt=""/> )}
                        </div>
                }

            </div>
        </div>
    );

}

export default Profile;