const https = require('https');
const fs = require('fs');
/**
 * HTTP 요청시 헤더에 중요 정보가 너무 많이 노출 된다. -> HTTPS 에서는 요청이 암호화 되있음 
 * node에서 https는 cert, key, ca의 인수가 추가 되는데
 * 공식인증기관에서 cert, key, ca를 받아 fs로 읽어 넣어주면된다.
 * readFileSync(딱 한번만 실행될 때는 Sync 가능)로 읽어주며 된다.
 * 공식 인증 기관중 가장 유명한 곳은 ->  letsencrypt 
 * https는 디폴트 포트가 443이다.
 * 
 */
https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });
