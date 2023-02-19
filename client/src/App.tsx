import './App.css';
import Body from './Components/Mainpage/Body';

import UserData from './store/userData';

function App() {
  return (
    <div className="App">
      <UserData>
        <Body />
      </UserData>
    </div>
  );
}

export default App;