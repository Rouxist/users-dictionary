import './Infos.css';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom'

import Sidebar from '../Sidebar';



function Privacy() {
  const isPc = useMediaQuery ({
    query : "(min-width : 500px)"
  });
  let navigate = useNavigate();

  const [selected, setSelected] = useState(true);
  function changeIsSelected() {
      setSelected(false);
    }

  function Content() {
    return (
      <div className='main-box'>
          <h1 className='title'>개인정보 처리방침~~~</h1>
            <div className="notice-area">
              <div>
                <h4>&nbsp;저는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다~~~</h4>
              </div>
              <button onClick={() => {navigate('/')}}>돌아가기~~~</button>
            </div>
      </div>
    )
  }
  
  return (
    <div className='main-page'>
        {Content()}
      </div>
  )
}
        
export default Privacy;