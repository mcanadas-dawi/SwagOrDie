class Knight extends Creature{
    constructor(weapon, playerName) {
        super(1000, 30, playerName);
        this.weapon = weapon;
    }

    hit(opponent) {
        let damage = 40
        if (this.weapon === "rapier") {
            damage = 50;
        } else if (this.weapon === "sword") {
            damage = 60;
        }
        opponent.takeDamage(damage);
    }
}