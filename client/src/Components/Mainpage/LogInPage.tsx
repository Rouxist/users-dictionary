import axios from 'axios';
import { useContext } from 'react';

//Components
import './LogInPage.css';


import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import { userDataContext } from '../../store/userData';


function LogInPage() {
  let navigate = useNavigate();
  const userContext = useContext(userDataContext);

  //Authentication
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

  async function onSignInSuccess(this: any, res: any) {
    userContext.setIsSignedIn(true);
    userContext.setName(res.profileObj.name);
    userContext.setUserId(res.profileObj.googleId);
    await axios.put('/fetchWordSet', { userId: res.profileObj.googleId }).then((res: any) => {
      userContext.setWordSetData(res.data);
    });
    navigate('/lobby');
  }

  const onFailure = (res: any) => {
    console.log("LOGIN FAILED! res: ", res)
  }

  return (
    <div className='loginpage'>
      <h1>단어를 외우는 페이지</h1>
      <GoogleLogin
        render={renderProps => (
          <button onClick={renderProps.onClick} className='log-in-button'>로그인</button>
        )}
        clientId={clientId}
        onSuccess={(res) => {
          onSignInSuccess(res);
        }}
        onFailure={(res) => onFailure(res)}//res 주기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
      <p>로그인 시 이용 약관과 개인정보 처리방침에 동의하게 되는 것이라고 볼 수 있겠습니다.</p>
    </div>
  );
}

export default LogInPage;