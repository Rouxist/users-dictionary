import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import './Infos.css';




function Agreement() {
    const isPc = useMediaQuery({
        query: "(min-width : 500px)"
    });

    let navigate = useNavigate();

    const [selected, setSelected] = useState(true);
    function changeIsSelected() {
        setSelected(false);
    }

    function Content() {
        return (
            <div className='main-box'>
                <h1 className='title'>이용 약관~~~</h1>
                <div className="notice-area">
                    <h3>즐겁게 이용합시다~~~</h3>
                </div>
                <button onClick={() => { navigate('/') }}>돌아가기~~~</button>
            </div>
        )
    }


    return (
        <div className='main-page'>
            {Content()}
        </div>
    )
}



export default Agreement;