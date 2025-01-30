class Demon extends Creature{
    constructor(playerName) {
        super(600, 120, playerName);
    }

    hit(opponent) {
        this.basicHit(opponent);
        this.takeDamage(Math.random() * this.basicDamage);
    }
}