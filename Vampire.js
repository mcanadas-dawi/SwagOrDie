class Vampire extends Creature{
    constructor(playerName) {
        super(250, 90, playerName);
    }

    hit(opponent) {
        this.basicHit(opponent);
        super.heal(Math.random() * this.basicDamage);
    }
}