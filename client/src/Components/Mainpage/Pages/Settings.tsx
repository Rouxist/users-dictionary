import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { userDataContext } from "../../../store/userData";
import './Settings.css';

import Sidebar from '../Sidebar';

function Settings() {
    const userContext = useContext(userDataContext);

    const isPc = useMediaQuery({
        query: "(min-width : 500px)"
    });

    const [selected, setSelected] = useState(true);

    function changeIsSelected() {
        setSelected(false);
    }



    if (isPc) {
        return (
            <div className='settings-page'>
                <Sidebar isSelectedFunction={changeIsSelected} />
                <div className='settings-box'>
                    <h1 className='title'>Settings</h1>
                    <div className="setting-area">
                        세팅은 아직 없음 ~~~
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div className='settings-page'>
                <div className='settings-box'>
                    <h1 className='title'>Settings</h1>
                    <div className="setting-area">
                        세팅은 아직 없음 ~~~
                    </div>
                </div>
                <Sidebar isSelectedFunction={changeIsSelected} />
            </div>
        )
    }
}

export default Settings;