import './Footer.css';

function Footer() {
  return (
        <div className='footer-containor'>
          <div className='footer-links'>
            <div className="footer-horizontal-line">
              <a href='/agreement'>이용약관</a>
              <a href='/privacy'>개인정보 처리방침</a>
              <a href='/develop'>개발자 정보</a>
              <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/self_educator/'>문의</a>
            </div>
          </div>
          방문해주셔서 감사합니다~~~
        </div>
  );
}

export default Footer;
