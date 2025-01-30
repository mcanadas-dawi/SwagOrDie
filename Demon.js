class Vampire extends Creature{
    constructor() {
        super(250, 90);
    }

    bite(opponent) {
        this.basicHit(opponent);
        super.heal(Math.random() * this.basicDamage);
    }
}