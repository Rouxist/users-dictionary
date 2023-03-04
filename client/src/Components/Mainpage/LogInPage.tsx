import axios from 'axios';
import { useContext } from 'react';

// Components
import CubeModel from './Cubemodel';
import './LogInPage.css';

// Auth
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './config';

import { useNavigate } from 'react-router-dom';

import { userDataContext } from '../../store/userData';

function LogInPage() {
  let navigate = useNavigate();
  const userContext = useContext(userDataContext);

  function firebaseGoogleSignIn() {
    const handleClick = () => {
      signInWithPopup(auth, provider).then(async (data: any) => {
        userContext.setIsSignedIn(true);
        userContext.setName(data.user.displayName);
        userContext.setUserId(data.user.uid);
        // userContext.setFirstSignIn(data.metadata.creationTime);
        axios.put('/fetchWordSet', { userId: data.user.uid }).then((res: any) => {
          userContext.setWordSetData(res.data);
          navigate('/lobby')
        });
      })
    }

    return (
      <button className='sign-in-button' onClick={handleClick}>Sign In</button>
    )
  }

  return (
    <div className='login-page'>
      <h1>단어를 외우는 페이지</h1>
      <div className="cube-model-area"><CubeModel /></div>
      {firebaseGoogleSignIn()}
      <p>로그인 시 이용 약관과 개인정보 처리방침에 동의하게 되는 것이라고 볼 수 있겠습니다.</p>
    </div>
  );
}

export default LogInPage;