import './Infos.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';



function Develop() {
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
            // <div className='notice-box'>
            //     <h1 className='title'>개발자 정보</h1>
            //     <div className="notice-area">
            //         <span id='title'>개발 : 강용진</span>
            //         <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/self_educator/'>Instagram</a>
            //         <a target="_blank" rel="noopener noreferrer" href='https://www.worldcubeassociation.org/persons/2015YONG02'>WCA Profile</a>
            //         <br/>
            //         <span id='title'>스크램블 알고리즘 제작 : 안유성</span>
            //         <a target="_blank" rel="noopener noreferrer" href='https://www.worldcubeassociation.org/persons/2017ANYU01'>WCA Profile</a>
            //         <br/> 
            //     </div>
            // </div>
            <div className='main-box'>
                <div>강용진~~~</div>
                <button onClick={() => {navigate('/')}}>돌아가기~~~</button>
            </div> 
        )
    }

    if (isPc) {
        return (
            <div className='notice-page'>
              {/* <Sidebar isSelectedFunction={changeIsSelected} /> */}
              {Content()}
            </div>
        )
      } else {
        return (
            <div className='notice-page'>
                {Content()}
                {/* <Sidebar isSelectedFunction={changeIsSelected} /> */}
            </div>
        )
      }
  }
        
        
  
  export default Develop;