class Knight extends Creature{
    constructor(weapon) {
        super(1000, 30);
        this.weapon = weapon;
    }

    swing(opponent) {
        let damage = 60
        if (this.type === "rapier") {
            damage = 0;
        } else if (this.type === "sword") {
            damage = 60;
        }
        opponent.takeDamage(damage);
    }
}