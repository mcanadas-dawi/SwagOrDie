class Creature {
    constructor(health, basicDamage) {
        this.health = health;
        this.basicDamage = basicDamage;
    }

    takeDamage(damageAmount) {
        this.health -= damageAmount;
    }

    heal(healthAmount) {
        this.health += damageAmount;
    }

    basicHit(opponent) {
        opponent.takeDamage(this.basicDamage);
    }
}