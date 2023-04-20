// index.js

import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js';
 


function createUser(user) {
  // 1. 이메일이 정상인지 ( 1- 존재여부 2- "@" 포함 여부)
  const isValid = checkValidationEmail(user.email);

  if (isValid === true) {
    // 2. 가입환영 템플릿 만들기 
    const mytemplate = getWelcomeTemplate(user);

    // 3. 이메일에 가입 환영 템플린 전송하기
    sendTemplateToEmail(user.email, mytemplate);
  }
}

const myuser = { 
    name: '헤일리',
    age: 20,
    school: '토끼초등학교',
    email : "a@a.com"
}




createUser(myuser);