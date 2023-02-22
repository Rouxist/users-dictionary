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

    function timeConverter(inputDate: Date) {
        const offset = inputDate.getTimezoneOffset() * 60000;
        const realDate = new Date(inputDate.getTime() - offset).toISOString();
        return realDate.replace('T', ' ').replace('Z', ' ').slice(0, 19);
    }

    const displayWordSet = (data: any) => {
        if (data === undefined) {
            return <></>;
        } else {
            return (data.map((sess: any, index: number) => (
                <div className='word-set-card' onClick={() => enterWordSet(index)}>
                    <h2>{index + 1}. {sess.title}</h2>
                    <h4>만든 날짜: {timeConverter(new Date(sess.createdDate))}</h4>
                    <h4>{sess.wordList.length}개의 단어</h4>
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
                    <div className="wordset-list-area">
                        {displayWordSet(wordSetData)}
                    </div>
                    <button className='button' onClick={() => navigate('/newWordSet')}>새 단어장 만들기</button>
                </div>
            </div>

        )
    } else {
        return (
            <div className='wordset-main-page'>
                <div className='wordset-main-box'>
                    <h1 className='title'>WordSet</h1>
                    최근에 추가하거나 수정한 것이 아래로 내려가요 ~~~
                    <div className="wordset-list-area">
                        {displayWordSet(wordSetData)}
                    </div>
                    <button className='button' onClick={() => navigate('/newWordSet')}>새 단어장 만들기</button>
                </div>
                <Sidebar isSelectedFunction={changeIsSelected} />
            </div>
        )
    }
}

export default WordSetMain;