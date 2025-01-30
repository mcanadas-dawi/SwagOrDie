class Creature {
    constructor(health, basicDamage, playerName) {
        this.health = health;
        this.basicDamage = basicDamage;
        this.playerName = playerName;
    }

    takeDamage(damageAmount) {
        this.health -= damageAmount;
    }

    heal(healthAmount) {
        this.health += healthAmount;
    }

    basicHit(opponent) {
        opponent.takeDamage(this.basicDamage);
    }

    isAlive() {
        return (this.health > 0)
    }

    win() {
        return `${this.playerName} win with ${this.health} remaining`;
    }

    hit(opponent) {
        opponent.takeDamage(this.basicDamage);
    }
}