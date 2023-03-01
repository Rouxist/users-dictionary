import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//CSS
import './Body.css';

//Components
import FocusedWordSet from '../WordSet/FocusedWordSet';
import WordSet from '../WordSet/WordSet';
import Agreement from './Footer/Agreement';
import Develop from './Footer/Develop';
import Footer from './Footer/Footer';
import Privacy from './Footer/Privacy';
import LogInPage from './LogInPage';
import NewLobby from './NewLobby';
import EditWordSet from './Pages/EditWordSet';
import NewWordSet from './Pages/NewWordSet';
import Settings from './Pages/Settings';
import WordSetMain from './Pages/WordSetMain';

//Authentication
import { auth } from './config';

//Route
import { Route, Routes } from 'react-router-dom';
import { userDataContext } from '../../store/userData';
import AllWordSet from '../WordSet/AllWordSet';

function Body() {
  let navigate = useNavigate();
  const userContext = useContext(userDataContext);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        userContext.setIsSignedIn(true);
        userContext.setName(user.displayName);
        userContext.setUserId(user.uid);
        // userContext.setFirstSignIn(user.metadata.creationTime);
        axios.put('/fetchWordSet', { userId: user.uid }).then((res: any) => {
          userContext.setWordSetData(res.data);
          navigate('/lobby');
        });
      } else {
        userContext.setIsSignedIn(false);
      }
    });
  }, [])

  return (
    <div className='LogInPage'>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/lobby" element={<NewLobby />} />
        <Route path="/wordSetMain" element={<WordSetMain />} />
        <Route path="/wordSet/:wordSetId" element={<WordSet />} />
        <Route path="/wordSet/all" element={<AllWordSet />} />
        <Route path="/wordSet/focused" element={<FocusedWordSet />} />
        <Route path="/newWordSet" element={<NewWordSet />} />
        <Route path="/editWordSet/:wordSetId" element={<EditWordSet />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/develop" element={<Develop />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Body;