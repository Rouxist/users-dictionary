import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { userDataContext } from '../../../store/userData';

//CSS
import './EditWordSet.css';

//Components
import Sidebar from '../Sidebar';

function NewWordSet() {
    const [update, setUpdate] = useState(true);
    const [selected, setSelected] = useState(true);
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [isNPressed, setIsNPressed] = useState(false);
    const userContext = useContext(userDataContext);

    const params = useParams();
    const wordSetId = params.wordSetId;

    const wordSetData = userContext.wordSetData.find((e: any) => e._id == wordSetId);

    const [title, setTitle] = useState(wordSetData.title);
    const [wordList, setWordList] = useState(wordSetData.wordList);

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
    }, [isShiftPressed, isNPressed])

    let navigate = useNavigate();

    const isPc = useMediaQuery({
        query: "(min-width : 500px)"
    });

    function changeIsSelected() {
        setSelected(false);
    }

    function handleWordAdd() {
        setWordList([...wordList, { word: '', meaning: ['', ''], from: '' }]);
    }

    function handleWordDelete(index: number) {
        const newWordList = wordList;
        newWordList.splice(index, 1);
        setWordList(newWordList);
        setUpdate(!update);
    }

    function handleWordEdit(index: number, value: any) {
        const newWordList = wordList;
        newWordList[index].word = value;
        setUpdate(!update);
    }

    function handleFromEdit(index: number, value: any) {
        const newWordList = wordList;
        newWordList[index].from = value;
        setUpdate(!update);
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

    function handleKeyInput() {
        document.onkeydown = (e) => {
            console.log(e.key);
            // handleWordAdd();
        };
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
                <button onClick={() => handleMeaningRemove(wordIndex, meaningIndex)}>이 뜻 지우기~~~</button>
            </div>
        )))
    }

    function displayWordInputs() {
        return (wordList.map((sess: any, wordIndex: number) => (
            <div className='new-word-card' >
                <h2>{wordIndex + 1}번째 단어~~~</h2>
                <input value={sess.word} placeholder='단어' onChange={(e: any) => handleWordEdit(wordIndex, e.target.value)} />
                <h5>뜻을 적어볼까요~~~ </h5>
                {displayMeaningInputs(wordIndex, sess.meaning)}
                <button onClick={() => handleMeaningAdd(wordIndex)}>뜻 더 쓰기~~~</button>
                <input value={sess.from} placeholder='출처는?' onChange={(e: any) => handleFromEdit(wordIndex, e.target.value)} />
                <button onClick={() => handleWordDelete(wordIndex)}>이 단어 지우기~~~</button>
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

            const newWordSetData = {
                title: title,
                userId: userContext.userId,
                createdDate: wordSetData.createdDate,
                wordList: wordListToUpload
            };

            await axios.put('/replaceWordSet', { idToDelete: wordSetId, data: newWordSetData }).then((res: any) => {
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
                    <h1 className='title'>단어장 수정하기~~</h1>
                    <h3>Shift + N을 누르면 새로운 단어가 추가돼요~~</h3>
                    <div className="new-wordset-main-area">
                        제목을 입력해 보아요~~~
                        <input value={title} placeholder='제목' type="text" onChange={(e: any) => setTitle(e.target.value)} />
                        <br /><br />
                        단어들을 입력해보아요~~~
                        {displayWordInputs()}
                        <button onClick={handleWordAdd}>단어 추가하기~~~~</button>
                        <button onClick={submit}>저장~~~~</button>
                        <button onClick={() => console.log(wordList)}>미리보기~~~~</button>
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div className='new-wordset-page'>
                <div className='new-wordset-box'>
                    <h1 className='title'>단어장 수정하기~~</h1>
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