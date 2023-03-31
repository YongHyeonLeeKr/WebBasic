//import fetch from "node-fetch";


const setTimeOutTest = () => {
    setTimeout(()=>{
    console.log('456');
}, 0)
console.log('123');
}


const myCallback = () => {
    console.log('myCallBack');
}

const promiseTest =  function() {
 return new Promise((resolver,reject) => {
    resolver(150);
 }).then((res) => {
    console.log(res);
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

