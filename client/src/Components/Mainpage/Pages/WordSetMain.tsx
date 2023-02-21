import { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from "../../../store/userData";

//CSS
import './WordSetMain.css';

//Components
import Sidebar from '../Sidebar';

function WordSetMain() {
    const userContext = useContext(userDataContext);
    const userId = userContext.userId;
    // const [wordSetData, setWordSetData] = useState();
    const fetchedWordSetData = userContext.wordSetData;
    const wordSetData = fetchedWordSetData.sort(function (a: any, b: any) {
        return a.createdDate > b.createdDate;
    });

    let navigate = useNavigate();

    useEffect(() => {
        if (wordSetData.length == 0) {
            navigate('/')
        }
    })

    const isPc = useMediaQuery({
        query: "(min-width : 500px)"
    });

    const [selected, setSelected] = useState(true);

    function changeIsSelected() {
        setSelected(false);
    }

    function enterWordSet(index: number) {
        const id = wordSetData[index]._id;
        navigate('/wordSet/' + id);
    }

    const displayWordSet = (data: any) => {
        if (data === undefined) {
            return <></>;
        } else {
            return (data.map((sess: any, index: number) => (
                <div className='word-set-card' onClick={() => enterWordSet(index)}>
                    <h2>{index + 1}. {sess.title}</h2>
                    <h4>만든 날짜: {sess.createdDate.toString()}</h4>
                    <h5>누르면 이동함~~~</h5>
                </div>
            )))
        }
    }

    if (isPc) {
        return (
            <div className='wordset-main-page'>
                <Sidebar isSelectedFunction={changeIsSelected} />
                <div className='wordset-main-box'>
                    <h1 className='title'>WordSet</h1>
                    최근에 추가하거나 수정한 것이 아래로 내려가요 ~~~
                    <div className="wordset-main-area">
                        {displayWordSet(wordSetData)}
                    </div>
                    <button onClick={() => navigate('/newWordSet')}>새 단어장 만들기~~~</button>
                </div>
            </div>

        )
    } else {
        return (
            <div className='wordset-main-page'>
                <div className='wordset-main-box'>
                    <h1 className='title'>WordSet</h1>
                    최근에 추가하거나 수정한 것이 아래로 내려가요 ~~~
                    <div className="wordset-main-area">
                        {displayWordSet(wordSetData)}
                    </div>
                    <button onClick={() => navigate('/newWordSet')}>새 단어장 만들기~~~</button>
                </div>
                <Sidebar isSelectedFunction={changeIsSelected} />
            </div>
        )
    }
}

export default WordSetMain;