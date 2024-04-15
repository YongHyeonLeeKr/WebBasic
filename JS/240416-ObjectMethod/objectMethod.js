let jsonData = {name: 'Jason', age: 25, gender: 'Male'};





let jsonDataKeys = Object.keys(jsonData) // 모든 요소가 문자열 배열로 반환
console.log(jsonDataKeys.includes('name'))

jsonDataValues = Object.values(jsonData) // value 모음을 배열로(데이터 그대로)
console.log(jsonDataValues)