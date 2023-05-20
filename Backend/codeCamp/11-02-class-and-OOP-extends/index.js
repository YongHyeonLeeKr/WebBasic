class Monster {
    power = 10;

    constructor(power) {
        this.power = power;
    }
    attack = () => {
        console.log("공격하자! ")
        console.log("내 공격력은 " + this.power + "이야")
    }

    run = () => {
        console.log("도망가자!")
    }
}

class FlyableMonster extends Monster {
    constructor(power){
        super(power)
    }

    fly = () => {
        console.log("날아서 도망가자")
    }
}

class AquaMonster extends Monster {
    constructor(power) {
        super(power)
    }

    swim = () => {
        console.log("수영해서 도망가자. ")
    }
}

const myMonster1 = new FlyableMonster(23)

myMonster1.attack();
myMonster1.fly();

const myMonster2 = new AquaMonster(50)
myMonster2.attack();
myMonster2.swim();

