
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
        doTurn(creatureA, creatureB);
        if (!creatureA.isAlive() || !creatureB.isAlive()) break;
        doTurn(creatureB, creatureA);
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

function doTurn(dealer, receiver) {
    dealer.hit(receiver);
    alert(
        `${dealer.playerName} HITS ${receiver.playerName} \n` +
        `${dealer.playerName}'s creature hits ${receiver.playerName}'s creature" \n` +
        `${receiver.playerName} Takes damage, HEALTH AFTER HIT: ${receiver.health} \n` +
        `${dealer.playerName}'s Current health: ${dealer.health}`
    )
}