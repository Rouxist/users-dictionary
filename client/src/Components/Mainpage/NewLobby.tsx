import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../../store/userData';


//Authentication
import { signOut } from 'firebase/auth';
import { auth } from './config';

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
    // const firstSignInDate = new Date(userContext.firstSignIn);
    // const firstSignInDateKoreanTime = new Date(firstSignInDate.getTime() - (firstSignInDate.getTimezoneOffset() * 60000)).toISOString().replace('Z', ' ').replace('T', ' ').slice(0, 19);

    //Authentication
    function firebaseGoogleSignOut() {
        const handleClick = () => {
            signOut(auth);
            userContext.setIsSignedIn(false);
            navigate('/')
        }

        return (
            <button className='sign-out-button' onClick={handleClick}>Sign Out</button>
        )
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
                        <h2>유저 정보</h2>
                        <h4>이름: {userName}</h4>
                        <h4>저장한 단어장 개수: {userContext.wordSetData.wordSet.length}개</h4>
                        {/* <h4>첫 접속일: {firstSignInDateKoreanTime}</h4> */}
                        {firebaseGoogleSignOut()}
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
                        <h2>유저 정보</h2>
                        <h4>이름: {userName}</h4>
                        <h4>저장한 단어장 개수: {userContext.wordSetData.wordSet.length}개</h4>
                        {/* <h4>첫 접속일: {firstSignInDateKoreanTime}</h4> */}
                        {firebaseGoogleSignOut()}
                    </div>
                </div>
                <Sidebar isSelectedFunction={changeIsSelected} />
            </div>
        );
    }
}

export default NewLobby;