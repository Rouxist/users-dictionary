import { useEffect } from 'react';

//CSS
import './Body.css';

//Components
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
import { gapi } from 'gapi-script';

//Route
import { Route, Routes } from 'react-router-dom';

function Body() {
  //Authentication
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className='LogInPage'>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/lobby" element={<NewLobby />} />
        <Route path="/wordSetMain" element={<WordSetMain />} />
        <Route path="/wordSet/:wordSetId" element={<WordSet />} />
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