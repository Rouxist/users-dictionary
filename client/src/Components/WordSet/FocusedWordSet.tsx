import axios from 'axios';
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

//Route
import { useNavigate } from 'react-router-dom';

//CSS
import './FocusedWordSet.css';

//Context API
import { userDataContext } from '../../store/userData';

function WordSet() {
  const isPc = useMediaQuery({
    query: "(min-width : 500px)"
  });
  let navigate = useNavigate();
  const userContext = useContext(userDataContext);

  const [isShowMeaning, setIsShowMeaning] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const wordList = userContext.wordSetData.focusedWordSet;

  function handlePrevWord() {
    if (currentWordIndex != 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setIsShowMeaning(false);
    }
  }

  function handleNextWord() {
    if (currentWordIndex < wordList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsShowMeaning(false);
    }
  }

  function handleCardClick() {
    setIsShowMeaning(!isShowMeaning);
  }

  async function handleUnfocus() {
    const id = wordList[currentWordIndex]._id;
    await axios.put('/unfocusWord', { id: id }).then((res: any) => { // delete 말고 put 사용함
      if (res.data) {
        alert('unfocused');
      } else {
        alert('failed!!!!!!!!!!!!!!!!!!!');
      }
    });
  }

  function timeConverter(inputDate: Date) {
    const offset = inputDate.getTimezoneOffset() * 60000;
    const realDate = new Date(inputDate.getTime() - offset).toISOString();
    return realDate.replace('T', ' ').replace('Z', ' ').slice(0, 19);
  }

  function wordCard() {
    if (wordList.length == 0) {
      return <></>;
    } else {
      if (!isShowMeaning) {
        return (
          <div className='word-card-viewer' id='focused-word' onClick={handleCardClick} >
            <h2>{wordList[currentWordIndex].word}</h2>
            <h3>{timeConverter(new Date(wordList[currentWordIndex].addedDate))}</h3>
          </div>
        )
      } else {
        return (
          <div className='word-card-viewer' id='focused-word' onClick={handleCardClick}>
            <h4 className='meanings'>{wordList[currentWordIndex].meaning.map((word: string, index: number) => (<h4>{index + 1}. {word}</h4>))}</h4>
            <h5 className='from'>출처: {wordList[currentWordIndex].from}</h5>
          </div>
        )
      }
    }
  }

  if (isPc) {
    return (
      <div className='word-set-area'>
        <div className="word-set-box">
          <button onClick={() => navigate('/wordSetMain')}>뒤로 가기</button>
          <h1>Not in PC</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className='word-set-area'>
        <div className="word-set-box">
          <button onClick={() => navigate('/wordSetMain')}>뒤로 가기</button>
          <h1>Focused Words</h1>
          {currentWordIndex + 1} / {wordList.length}
          <div className="word-card-area">
            {wordCard()}
          </div>
          <div className="button-column">
            <div className="button-row">
              <button className='control-button' id='wide' onClick={handleUnfocus}>Unfocus</button>
            </div>
            <div className="button-row">
              <button className='control-button' onClick={handlePrevWord}>Prev</button>
              <button className='control-button' onClick={handleNextWord}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WordSet;