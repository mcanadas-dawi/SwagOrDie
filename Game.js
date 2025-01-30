
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("game").addEventListener('click', function () {
        play();
    })
});


function play() {
    let playerA = prompt("What is your name?");
    let selectedCreatureA = prompt("1.- Mage, 2.- Knight, 3.- Vampire, 4. Demon");

    let playerB = prompt("What is your name?");
    let selectedCreatureB = prompt("1.- Mage, 2.- Knight, 3.- Vampire, 4. Demon");

    let creatureA = getCreature(selectedCreatureA, playerA);
    let creatureB = getCreature(selectedCreatureB, playerB);

    do {
        creatureA.hit(creatureB);
        console.log("A HITS B");
        console.log(creatureA.playerName + "'s creature hits " + creatureB.playerName +"'s creature" )
        console.log(creatureB.playerName + "Takes damage, HEALTH AFTER HIT: " + creatureB.health);
        console.log(creatureA.playerName + "'s Current health: " + creatureA.health);

        if (!creatureA.isAlive() || !creatureB.isAlive()) break;

        creatureB.hit(creatureA);
        console.log("B HITS A");
        console.log(creatureB.playerName + "'s creature hits " + creatureA.playerName +"'s creature" )
        console.log(creatureA.playerName + "Takes damage, HEALTH AFTER HIT: " + creatureA.health);
        console.log(creatureB.playerName + "'s Current health: " + creatureB.health);

    } while (creatureA.isAlive() && creatureB.isAlive());

    alert(checkAlive(creatureA, creatureB));
}

function getCreature(selectedCreature, playerName) {
    let creature;
    if (selectedCreature === "1") {
        creature = new Mage(prompt("Choose your mana type: write fire or lighting"), playerName)
    } else if (selectedCreature === "2") {
        creature = new Knight(prompt("Choose your weapon: write rapier or sword"), playerName)
    } else if (selectedCreature === "3") {
        creature = new Vampire(playerName)
    } else if (selectedCreature === "4") {
        creature = new Demon(playerName)
    }
    return creature
}

function checkAlive(creatureA, creatureB) {
    if (!creatureA.isAlive()) {
        return creatureB.win()
    } else {
        return creatureA.win()
    }
}