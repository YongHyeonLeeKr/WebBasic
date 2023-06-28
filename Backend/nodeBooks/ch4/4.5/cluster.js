const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


/**
 *  클러스터 - 기본적으로 싱글스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
 * - 포트를 공유하는 노드 프로레스를 여러개 둘 수 있음 
 * - 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 분산 요청됨
 * - 서버에 무기가 덜 감
 * - 코어가 8개인 서버가 있을 때: 보통은 코어 하나만 활용
 * - cluster로 코어 하나당 노드 프로세스 하나를 배정 간으
 * - 성능이 8배가 되는 것은 아니지만 개선은 됨
 * - 단점 : 컴퓨터 자원(메모리, 세션 등) 공유 못함
 * - Redis등 별도 서버로 해결 
 * 
 */
if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커(프로세스)를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork(); 
  });
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
    setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
      process.exit(1);
    }, 1000);
  }).listen(8086);

  console.log(`${process.pid}번 워커 실행`);
}
