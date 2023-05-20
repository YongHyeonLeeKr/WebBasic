


class Monster {
    constructor(private readonly mypower){
        //this.mypower = mypower ; // public, private , readonly 중 1개만 포함되면 자동 생성 
    }

    attack() {
        console.log(this.mypower)
    }
}