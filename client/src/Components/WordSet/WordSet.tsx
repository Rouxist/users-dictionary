import axios from 'axios';
import { useContext } from 'react';
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

  const data = userContext.wordSetData.find((e: any) => e._id == wordSetId);

  async function deleteWordSet() {
    await axios.put('/removeWordSet', { data: wordSetId }).then((res: any) => { // delete 말고 put 사용함
      if (res.data) {
        alert('잘 지워짐~~~');
      } else {
        alert('잘 안지워짐~~~');
      }
    });
    await axios.put('/fetchWordSet', { userId: userContext.userId }).then((res: any) => {
      userContext.setWordSetData(res.data);
    });
    navigate('/wordSetMain');
  }
  function editWordSet() {
    navigate('/editWordSet/' + wordSetId);
  }

  // for test
  const dummyData = {
    title: '나의 영단어장~~~',
    userId: '1065...',
    createdDate: 'hi',
    wordList: [
      {
        word: 'wow',
        meaning: [
          '어머나!',
          '세상에!',
          '에그머니나!'
        ],
        from: '건전한 유튜브 영상~~~'
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

  const displayWords = (data: any) => {
    if (data === undefined) {
      return <></>;
    } else {
      return (data.map((sess: any, index: number) => (
        <div className='word-card'>
          <h2>{index + 1}. {sess.word}</h2>
          <h4 className='meanings'>{sess.meaning.map((word: string, index: number) => (<h4>{index + 1}. {word}</h4>))}</h4>
          <h5 className='from'>출처: {sess.from}</h5>
        </div>
      )))
    }
  }

  if (isPc) {
    return (
      <div className='word-set-area'>
        <div className="word-set-box">
          <button onClick={() => navigate('/wordSetMain')}>돌아가기~~~</button>
          <h1>{data.title}</h1>
          <h4>만든 날짜 : {data.createdDate.toString()}</h4>
          {displayWords(data.wordList)}
          <button onClick={editWordSet}>수정하기~~~</button>
          <button onClick={deleteWordSet}>삭제하기~~~</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='mobile-room-area'>
        모바일 아직 지원 안함..
      </div>
    )
  }
}

export default WordSet;