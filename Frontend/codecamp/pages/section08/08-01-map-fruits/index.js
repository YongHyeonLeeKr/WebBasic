




const fruitsList = [
    { number: 1, title: "레드향"},
    { number: 2, title: "샤인머스켓"},
    { number: 3, title: "하하하 호호호"},
]

    



export default function MapFruitesPage() {

    // 기본 에제 
    const aaa = [ <div> 1 레드향</div>, <div> 2 샤인 머스켓 </div>, <div> 3 산청딸기</div> ]
    // 

    
    fruitsList.map(el => <div> el.number el.title</div>)
    
    return (
        <div>
            <div> 
                {/** 실문 효율적인 랜더링 예제  */}
                {fruitsList.map(el => <div> {el.number} {el.title}</div>)}
            </div>
        </div>
    )
}