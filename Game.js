class Creature {
    constructor(health, basicDamage) {
        this.health = health;
        this.basicDamage = basicDamage;
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
}