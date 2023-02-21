import { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../../store/userData';


//Authentication
import { GoogleLogout } from 'react-google-login';

//Components
import Sidebar from './Sidebar';

//CSS
import './NewLobby.css';

function NewLobby() {
    const isPc = useMediaQuery({
        query: "(min-width : 500px)"
    });

    let navigate = useNavigate();
    const userContext = useContext(userDataContext);

    const userName = userContext.name;

    useEffect(() => {
        if (userName.length == 0) {
            navigate('/')
        }
    });

    //Authentication
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

    function signOutSuccessFunction(this: any) {
        userContext.setIsSignedIn(false);
        navigate('/')
    }

    const [selected, setSelected] = useState(true);
    function changeIsSelected() {
        setSelected(false);
    }

    if (isPc) {
        return (
            <div className='new-lobby-page'>
                <Sidebar isSelectedFunction={changeIsSelected} />
                <div className='new-lobby-box'>
                    <h1 className='title'>Lobby</h1>
                    <div className="new-lobby-area">
                        {userName} 님 로그인 됨~~~ <br />
                        <GoogleLogout
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className='log-out-button'>로그아웃~~~</button>
                            )}
                            clientId={clientId}
                            onLogoutSuccess={() => {
                                signOutSuccessFunction();
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='new-lobby-page'>
                <div className='new-lobby-box'>
                    <h1 className='title'>Lobby</h1>
                    <div className="new-lobby-area">
                        {userName} 님 로그인 됨~~~ <br />
                        <GoogleLogout
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className='log-out-button'>로그아웃~~~</button>
                            )}
                            clientId={clientId}
                            onLogoutSuccess={() => {
                                signOutSuccessFunction();
                            }}
                        />
                    </div>
                </div>
                <Sidebar isSelectedFunction={changeIsSelected} />
            </div>
        );
    }
}

export default NewLobby;