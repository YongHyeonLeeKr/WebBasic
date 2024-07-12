
const onClickMenuHome = () =>  {
    document.getElementById('contentFrame').setAttribute("src", 'home.html')
    document.getElementById('menuHome').style = "color: black; backround-color: white;"
    document.getElementById('jukeBox').style = "color: white; background-color: #298eb5;"
    document.getElementById('game').style = "color: white; background-color: #298eb5;"
}

const onClickJukeBox = () =>  {
    document.getElementById('contentFrame').setAttribute("src", 'jukebox.html')
    document.getElementById('jukeBox').style = "color: black; backround-color: white; "
    document.getElementById('menuHome').style = "color: white; background-color: #298eb5;"
    document.getElementById('game').style = "color: white; background-color: #298eb5;"


    
}

const onClickGame = () =>  {
    document.getElementById('contentFrame').setAttribute("src", 'game.html')
    document.getElementById('game').style = "color: black; backround-color: white; "
    document.getElementById('menuHome').style = "color: white; background-color: #298eb5;"
    document.getElementById('jukeBox').style = "color: white; background-color: #298eb5;"

}