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

const myMonster1 = new Monster(23)

myMonster1.attack();
myMonster1.run();

const myMonster2 = new Monster(2)
myMonster2.attack();
myMonster2.run();

