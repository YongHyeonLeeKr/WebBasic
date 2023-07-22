class Monster { 
     
    // power -> public, private, protected, readonly 중 1개라도 있으면 생략 가능

     constructor(private readonly power: any){
       //  this.power = power  // => public, private, protected, readonly 중 1개라도 있으면 생략 가능      
       // private readonly로 생성자에 박아두면 안팎에서 접근/수정 모두 불가 
     }

     attack = () => {
        console.log('공경')
        console.log('내 공격력은 ' + this.power + '임')
     }
}

class FlyingMonster extends Monster {
    flyingAttack = () => {// + '파워짜리 공중 공격!')
    }
}


const bird = new FlyingMonster(20)
