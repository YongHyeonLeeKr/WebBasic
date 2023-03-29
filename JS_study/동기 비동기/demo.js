import fetch from "node-fetch";


const promiseTest =  function() {
 return new Promise((resolver,reject) => {
    resolver(150);
     
 });
}


const reqNaver = function() {

  fetch(`https://www.naver.com`)
  .then((res) => {
        console.log(res) 
        
    }).catch((err)=> {
        console.log(err)
    })
        
    
}
//undefined
promiseTest().then((res) => {
    console.log(res);
})

reqNaver()