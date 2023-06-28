
/**
 * 1. process.on('uncaughtExcetion', () => {})
 * 모든 에러가 다 프로세스로 들어감 
 * 콜백 함수의 동작이 보장 되지는 않으므로 복구 작업용으로 쓰는 것은 부적합
 * 에러 내용 기록용으롬나 쓰는 게 좋음
 * 
 * 2. 프로세스 종료하기 
 *  netstat -nao | findstr 포트
 *  taskkill /pid 프로세스아이디 /f
 */
process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
  console.log('실행됩니다');
}, 2000);
