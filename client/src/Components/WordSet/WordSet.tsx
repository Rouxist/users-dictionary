import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

//Component

//Route
import { useNavigate, useParams } from 'react-router-dom';

//CSS
import './WordSet.css';

//Context API
import { userDataContext } from '../../store/userData';

function WordSet() {
  const isPc = useMediaQuery({
    query: "(min-width : 500px)"
  });
  let navigate = useNavigate();
  const userContext = useContext(userDataContext);

  const params = useParams();
  const wordSetId = params.wordSetId;

  const [isShowMeaning, setIsShowMeaning] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);


  const userId = userContext.userId;

  const [data, setData] = useState({ title: '', userId: '', createdDate: new Date(), wordList: [{ word: '', meaning: [''], from: '수능 공부' }] });

  useEffect(() => {
    const fetchedData = userContext.wordSetData.wordSet.find((e: any) => e._id == wordSetId);
    setData(fetchedData);
  }, [])

  const focusedWordSetList = userContext.wordSetData.focusedWordSet;
  const focusedWordList = focusedWordSetList.map((e: any) => e.word);

  async function deleteWordSet() {
    if (window.confirm('삭제한 단어장은 복구할 수 없습니다.')) {
      await axios.put('/removeWordSet', { data: wordSetId }).then((res: any) => { // delete 말고 put 사용함
        if (res.data) {
          alert('삭제되었습니다.');
        } else {
          alert('삭제가.. 안됐습니다.');
        }
      });
      await axios.put('/fetchWordSet', { userId: userContext.userId }).then((res: any) => {
        userContext.setWordSetData(res.data);
      });
      navigate('/wordSetMain');
    }
  }

  function editWordSet() {
    navigate('/editWordSet/' + wordSetId);
  }

  // for test
  const dummyData = {
    title: 'Literacy Style Words IMJMWDP',
    userId: '1065...',
    createdDate: '2023.02.21',
    wordList: [
      {
        word: 'harbor',
        meaning: [
          '생각을 품다',
          '항구',
          '숨겨주다'
        ],
        from: '수능 공부'
      },
      {
        word: 'evenly',
        meaning: [
          '균일하게',
          'In general, you should think of linear transformations as keeping grid lines parallel and evenly spaced.'
        ],
        from: '3Blue1Brown, Essense of linear algebra Chapter 3'
      },
      {
        word: 'dam',
        meaning: [
          '댐'
        ],
        from: '웹 서핑~~'
      },
      {
        word: 'apple',
        meaning: [
          '회사',
          '사과'
        ],
        from: '인터넷 세상~~'
      },
    ]
  }

  // const data = dummyData

  function handlePrevWord() {
    if (currentWordIndex != 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setIsShowMeaning(false);
    }
  }

  function handleNextWord() {
    if (currentWordIndex < data.wordList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsShowMeaning(false);
    }
  }

  function handleCardClick() {
    setIsShowMeaning(!isShowMeaning);
  }

  function handleFocus() {
    const currentWord = data.wordList[currentWordIndex];
    const newData = {
      userId: userId,
      word: currentWord.word,
      meaning: currentWord.meaning,
      from: currentWord.from,
      addedDate: new Date()
    }
    axios.put('/focusWord', { data: newData }).then((res: any) => { // delete 말고 put 사용함
      if (res.data) {
        alert('added');
      } else {
        alert('failed');
      }
    });
  }

  function handleShuffle() {
    const shuffledWordList = data.wordList.sort(() => Math.random() - 0.5);
    setData({
      ...data,
      wordList: shuffledWordList
    })
    setCurrentWordIndex(0);
  }


  const displayWords = (data: any) => {
    if (data === undefined) {
      return <></>;
    } else {
      return (data.map((sess: any, index: number) => (
        <div className='word-card-element'>
          <h2>{index + 1}. {sess.word}</h2>
          <h4 className='meanings'>{sess.meaning.map((word: string, index: number) => (<h4>{index + 1}. {word}</h4>))}</h4>
          <h5 className='from'>출처: {sess.from}</h5>
        </div>
      )))
    }
  }

  function wordCard() {
    function idSelector(word: string) {
      if (focusedWordList.includes(word)) {
        return 'focused-word'
      } else {
        return ''
      }
    }

    if (!isShowMeaning) {
      return (
        <div className='word-card-viewer' id={idSelector(data.wordList[currentWordIndex].word)} onClick={handleCardClick} >
          <h2>{data.wordList[currentWordIndex].word}</h2>
        </div>
      )
    } else {
      return (
        <div className='word-card-viewer' id={idSelector(data.wordList[currentWordIndex].word)} onClick={handleCardClick}>
          <h4 className='meanings'>{data.wordList[currentWordIndex].meaning.map((word: string, index: number) => (<h4>{index + 1}. {word}</h4>))}</h4>
          <h5 className='from'>출처: {data.wordList[currentWordIndex].from}</h5>
        </div>
      )
    }
  }

  function timeConverter(inputDate: Date) {
    const offset = inputDate.getTimezoneOffset() * 60000;
    const realDate = new Date(inputDate.getTime() - offset).toISOString();
    return realDate.replace('T', ' ').replace('Z', ' ').slice(0, 19);
  }

  if (isPc) {
    return (
      <div className='word-set-area'>
        <div className="word-set-box">
          <button onClick={() => navigate('/wordSetMain')}>뒤로 가기</button>
          <h1>{data.title}</h1>
          <h4>만든 날짜 : {timeConverter(new Date(data.createdDate))}</h4>
          <div className="word-card-element-list">
            {displayWords(data.wordList)}
          </div>
          <button className='control-button' onClick={editWordSet}>수정</button>
          <button className='control-button' onClick={deleteWordSet}>삭제</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='word-set-area'>
        <div className="word-set-box">
          <button onClick={() => navigate('/wordSetMain')}>뒤로 가기</button>
          <h1>{data.title}</h1>
          {currentWordIndex + 1} / {data.wordList.length}
          <div className="word-card-area">
            {wordCard()}
          </div>
          <div className="button-column">
            <div className="button-row">
              <button className='control-button' onClick={handlePrevWord}>Prev</button>
              <button className='control-button' onClick={handleNextWord}>Next</button>
            </div>
            <div className="button-row">
              <button className='control-button' id='focus' onClick={handleFocus}>Focus</button>
            </div>
            <div className="button-row">
              <button className='control-button' onClick={editWordSet}>Edit</button>
              <button className='control-button' onClick={deleteWordSet}>Delete</button>
            </div>
            <div className="button-row">
              <button className='control-button' id='focus' onClick={handleShuffle}>shuffle</button>
            </div>
          </div>
          <h4>created at : {timeConverter(new Date(data.createdDate))}</h4>
        </div>
      </div>
    )
  }
}

export default WordSet;