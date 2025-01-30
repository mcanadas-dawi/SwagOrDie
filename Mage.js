class Mage extends Creature{
    constructor(type, playerName) {
        super(500, 20, playerName);
        this.type = type;
    }

    hit(opponent) {
        let damage = 50
        if (this.type === "fire") {
            damage = 80;
        } else if (this.type === "lighting") {
            damage = 100;
        }
        opponent.takeDamage(damage);
    }

    heal() {
        super.heal(Math.random() * 20);
    }
}