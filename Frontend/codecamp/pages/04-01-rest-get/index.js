import { useState } from 'react'

export default function CounterStatePage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('') 


    function onChangeEmail(event){
        console.log(event.target)
        console.log(event.target.value)
        setEmail(event.target.value)
      }

      function onChangePassword(event){
        console.log(event.target)
        console.log(event.target.value)
        setPassword(event.target.value)
      }
    
    function onClickSignUp(){
   
       console.log(`이메일 : ${email} , 비밀번호: ${password}`)

       if(email.includes("@") === false ){
            setEmailError('이메일이 올바르지 않습니다. (@없음)')
       } else {
        // send api to Backend 
        alert("회원가입을 축하합니다. ")
       }
     }
 
     // html 영역
     return (
     <>
        이메일 : <input type='text' onChange={onChangeEmail}/>
        <div>{emailError}</div>
        비밀번호 : <input type='password' onChange={onChangePassword}/>
        <button onClick={onClickSignUp}>회원가입</button>
     
     </>
     )
}