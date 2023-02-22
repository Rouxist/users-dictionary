import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../../../store/userData';

//CSS
import './NewWordSet.css';

//Components
import Sidebar from '../Sidebar';

function NewWordSet() {
    const [update, setUpdate] = useState(true);
    const [selected, setSelected] = useState(true);
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [isNPressed, setIsNPressed] = useState(false);
    const [title, setTitle] = useState('');
    const [wordList, setWordList] = useState([{ word: '', meaning: ['', ''], from: '' }]);

    const scrollRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) { // scrollRef가 null이 아닌 경우로 한정시키기.
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        document.onkeydown = (e) => {
            if (e.key == 'n' || e.key == 'N') {
                setIsNPressed(true);
            }
            if (e.key == 'Shift') {
                setIsShiftPressed(true);
            }

        };
        document.onkeyup = (e) => {
            if (e.key == 'n' || e.key == 'N') {
                setIsNPressed(false);
            }
            if (e.key == 'Shift') {
                setIsShiftPressed(false);
            }

        };
    }, [])

    useEffect(() => {
        if (isShiftPressed && isNPressed) {
            handleWordAdd();
        }
    }, [isShiftPressed, isNPressed, update])

    let navigate = useNavigate();

    const isPc = useMediaQuery({
        query: "(min-width : 500px)"
    });

    const userContext = useContext(userDataContext);

    function changeIsSelected() {
        setSelected(false);
    }

    async function handleWordAdd() {
        await setWordList([...wordList, { word: '', meaning: ['', ''], from: '' }]);
        scrollToBottom(); // not working
    }

    function handleWordEdit(index: number, value: any) {
        const newWordList = wordList;
        newWordList[index].word = value;
    }

    function handleWordDelete(index: number) {
        const newWordList = wordList;
        newWordList.splice(index, 1);
        setWordList(newWordList);
        setUpdate(!update);
    }

    function handleFromEdit(index: number, value: any) {
        const newWordList = wordList;
        newWordList[index].from = value;
    }

    function handleMeaningAdd(wordIndex: number) {
        const newWordList = wordList
        newWordList[wordIndex].meaning.push('');
        setUpdate(!update);
    }

    function handleMeaningEdit(wordIndex: number, meaningIndex: number, value: any) {
        const newWordList = wordList
        newWordList[wordIndex].meaning[meaningIndex] = value;
        setWordList(newWordList); //여긴 필요
        setUpdate(!update);
    }


    function handleMeaningRemove(wordIndex: number, meaningIndex: number) {
        const newWordList = wordList
        newWordList[wordIndex].meaning.splice(meaningIndex, 1);

        setWordList(newWordList); //여긴 필요
        setUpdate(!update);
    }



    function displayMeaningInputs(wordIndex: number, data: Array<any>) {
        return (data.map((sess: any, meaningIndex: number) => (
            <div className='new-meaning-input' >
                <input
                    value={sess} // 지정 안해주면 단어를 지웠을 때 값들이 의도한대로 표시되지 못함
                    // value={wordList[wordIndex].meaningList[meaningIndex]} // 지정 안해주면 단어를 지웠을 때 값들이 의도한대로 표시되지 못함
                    placeholder={'뜻' + (meaningIndex + 1)}
                    onChange={(e: any) => handleMeaningEdit(wordIndex, meaningIndex, e.target.value)}
                />
                <div className='mini-button' onClick={() => handleMeaningRemove(wordIndex, meaningIndex)}>삭제</div>
            </div>
        )))
    }

    function displayWordInputs() {
        return (wordList.map((sess: any, wordIndex: number) => (
            <div className='new-word-card' >
                <h2>{wordIndex + 1}번째 단어~~~</h2>
                <input className='word-input' placeholder='단어' onChange={(e: any) => handleWordEdit(wordIndex, e.target.value)} />
                {displayMeaningInputs(wordIndex, sess.meaning)}
                <div className='mini-button' onClick={() => handleMeaningAdd(wordIndex)}>뜻 추가</div>
                <input className='from-input' placeholder='출처' onChange={(e: any) => handleFromEdit(wordIndex, e.target.value)} />
                <div className='mini-button' onClick={() => handleWordDelete(wordIndex)}>삭제</div>
            </div>
        )))
    }


    async function submit() {
        if (title.length > 0) {
            let wordListToUpload = [];
            const wordListLength = wordList.length;

            for (let i = 0; i < wordListLength; i++) {
                wordListToUpload.push(wordList[i]);
            }

            const wordSetData = {
                title: title,
                userId: userContext.userId,
                createdDate: new Date(),
                wordList: wordListToUpload
            };

            await axios.put('/createWordSet', { data: wordSetData }).then((res: any) => {
                if (res.data) {
                    alert('잘 올라감~~~');
                } else {
                    alert('잘 안올라감~~~');
                }
            });

            await axios.put('/fetchWordSet', { userId: userContext.userId }).then((res: any) => {
                userContext.setWordSetData(res.data);
            });
            navigate('/wordSetMain');
        } else {
            alert('제목을 써주세요~~~~ 그리고 빈 칸이 없게 했을 거라고 양심에 맡겨요~~');
        }
    }


    if (isPc) {
        return (
            <div className='new-wordset-main-page'>
                <Sidebar isSelectedFunction={changeIsSelected} />
                <div className='new-wordset-main-box'>
                    <button onClick={() => navigate('/wordSetMain')}>돌아가기~~~</button>
                    <h1 className='title'>단어장 만들기</h1>
                    <h3>Shift + N을 누르면 새로운 단어가 추가돼요~~</h3>
                    <div className="new-wordset-main-area">
                        <input className='title-input' value={title} placeholder='제목' type="text" onChange={(e: any) => setTitle(e.target.value)} />
                        <div className="new-word-list">
                            {displayWordInputs()}
                        </div>
                        <button className='mini-button' onClick={handleWordAdd}>단어 추가</button>
                        <button className='mini-button' onClick={submit}>저장</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='new-wordset-page'>
                <div className='new-wordset-box'>
                    <h1 className='title'>새 단어장 만들기~~</h1>
                    <div className="new-wordset-area">
                        모바일은 아직 없음 ~~~
                    </div>
                </div>
                <Sidebar isSelectedFunction={changeIsSelected} />
            </div>

        )
    }
}

export default NewWordSet;