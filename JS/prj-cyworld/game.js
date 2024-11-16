const startWord = () => {
    let myword = document.getElementById("myword").value;
    let word = document.getElementById("word").innerText;

    let lastWord = word[word.length - 1 ];
    let fisrtWord = myword[0];

    if(fisrtWord === lastWord) {
        // 정답
        document.getElementById('result').innerText = '정답입니다!'
        word = document.getElementById('word').innerText = myword
        document.getElementById('myword').value = '';
    } else {
        // 오답
        document.getElementById('result').innerText = '땡!!'
        document.getElementById('myword').value = '';
    }
}