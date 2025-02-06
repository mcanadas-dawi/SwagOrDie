
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("game").addEventListener('click', function () {
        play();
    })
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("saveCharacter1").addEventListener('click', function () {
        saveCharacter(1);
    })
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("saveCharacter2").addEventListener('click', function () {
        saveCharacter(2);
    })
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dessert1").addEventListener('click', function () {
        changeBg('dessert.webp');
    })
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dessert2").addEventListener('click', function () {
        changeBg('dessert3.jpg');
    })
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("street").addEventListener('click', function () {
        changeBg('davQLBo.gif');
    })
});

let creatureA;
let creatureB;
let playerAwin = 0;
let playerBwin = 0;

const players = {
    player1: {
        name: "",
        class: "",
        weapon: ""
    },
    player2: {
        name: "",
        class: "",
        weapon: ""
    }
};


function saveCharacter(player) {

    if (player === 1 ){
        let player1NameInput = document.getElementById("player1name");
        let player1ClassInput = document.getElementById("player1class");

        if (player1NameInput != null && player1NameInput.value !== ""){
            players.player1.name = player1NameInput.value;
        }

        if (player1ClassInput != null && player1ClassInput.value !== ""){
            players.player1.class = pickClass(player1ClassInput.value);
            players.player1.weapon = player1ClassInput.value;
        }

        if (checkCharacter(1)){
            characterFilled(1);
        }
        else{
            alert("Please Fill the form")
        }
    }
    if (player === 2 ){
        let player2NameInput = document.getElementById("player2name");
        let player2ClassInput = document.getElementById("player2class");

        if (player2NameInput != null && player2NameInput.value !== ""){
            players.player2.name = player2NameInput.value;
        }

        if (player2ClassInput != null && player2ClassInput.value !== ""){
            players.player2.class = pickClass(player2ClassInput.value);
            players.player2.weapon = player2ClassInput.value;
        }
        if (checkCharacter(2)){
            characterFilled(2);
        }
        else{
            alert("Please Fill the form")
        }
    }

}

function pickClass(weapon){

    if (weapon === "Rapier" || weapon === "Sword"){
        return "Knight";
    }
    if (weapon === "Fire" || weapon === "Lightning"){
        return "Mage";
    }
    if (weapon === "Demon"){
        return "Demon";
    }
    if (weapon === "Vampire"){
        return "Vampire";
    }
}

function checkCharacter(player) {
    if (player === 1 ){
        if (players.player1.name !== "" && players.player1.class !== "" && players.player1.weapon !== ""){
            return true;
        }
    }
    if (player === 2 ){
        if (players.player2.name !== "" && players.player2.class !== "" && players.player2.weapon !== ""){
            return true;
        }
    }
    return false;
}

function characterFilled(player){
    if (player === 1 ){
        document.getElementById("player1Settings").style.display = "none";
        document.getElementById("player1").style.display = "flex";
        document.getElementById("player1Image").src = `assets/creatures/${players.player1.weapon}.png`;
    }
    if (player === 2){
        document.getElementById("player2Settings").style.display = "none";
        document.getElementById("player2").style.display = "flex";
        document.getElementById("player2Image").src = `assets/creatures/${players.player2.weapon}.png`;
        document.getElementById("player2Image").style.transform = "scaleX(-1)";
    }
}

async function play() {
    document.getElementById("game").style.display = "none";

    let playerA = players.player1.name;
    let selectedCreatureA = players.player1.class;
    let selectedWeaponA = players.player1.weapon;

    let playerB = players.player2.name;
    let selectedCreatureB = players.player2.class;
    let selectedWeaponB = players.player2.weapon;

    creatureA = getCreature(selectedCreatureA, selectedWeaponA, playerA);
    document.getElementById("player1Health").setAttribute("value", creatureA.health);
    document.getElementById("player1Health").setAttribute("max", creatureA.health);

    creatureB = getCreature(selectedCreatureB, selectedWeaponB, playerB);
    document.getElementById("player2Health").setAttribute("value", creatureB.health);
    document.getElementById("player2Health").setAttribute("max", creatureB.health);



    // Add a flag to track if we should keep going or not
    while (creatureA.isAlive() && creatureB.isAlive()) {
        // Wait before next hit
        await doTurn(creatureA, creatureB);
        document.getElementById("player1Health").setAttribute("value", creatureA.health);
        document.getElementById("player2Health").setAttribute("value", creatureB.health);

        // Check if a player has been defeated before continuing
        if (!creatureA.isAlive() || !creatureB.isAlive()) break;

        // Wait before the second player's turn
        await doTurn(creatureB, creatureA);
        document.getElementById("player1Health").setAttribute("value", creatureA.health);
        document.getElementById("player2Health").setAttribute("value", creatureB.health);

        // Waite half second to make the user experience better
        await wait(500);
    }

    // Display the winner after the loop ends
    roundControl();
    if (playerAwin==2||playerBwin==2) {
    alert(endGame());
    } else {
        alert(checkAlive(creatureA, creatureB));
        document.getElementById('nextRound').style.display = "block";
    }
    console.log(playerAwin);
    console.log(playerBwin);
}

function getCreature(selectedCreature, selectedWeapon, playerName) {
    let creature;
    if (selectedCreature === "Mage") {
        creature = new Mage(selectedWeapon, playerName)
    } else if (selectedCreature === "Knight") {
        creature = new Knight(selectedWeapon, playerName)
    } else if (selectedCreature === "Vampire") {
        creature = new Vampire(playerName)
    } else if (selectedCreature === "Demon") {
        creature = new Demon(playerName)
    }
    return creature
}

function checkAlive(creatureA, creatureB) {
    if (!creatureA.isAlive()) {
        return `${creatureB.playerName} wins this round!`;
    } else {
        return `${creatureA.playerName} wins this round!`;
    }
    
}

//CONTROL DE RONDAS GANADAS
function roundControl() {
    if (!creatureA.isAlive()) {
        playerBwin++;
    } else {
        playerAwin++;
    }
}

//CONTROL DE FIN DE PARTIDA
function endGame() {
    if (playerAwin === 2) {
        return `${creatureA.playerName} wins the game!`;
    } else if (playerBwin === 2) {
        return `${creatureB.playerName} wins the game!`;
    }
    document.getElementById('playAgain').style.display = "flex";
    document.getElementById('nextRound').style.display = "none";
}

async function doTurn(dealer, receiver) {
    await wait(); // Now correctly delays before executing hit
    dealer.hit(receiver);
}

function wait() {
    return new Promise(resolve => setTimeout(resolve, 200)); // Changed to 1 second (1000 ms)
}

function changeBg(bg) {
    document.body.style.backgroundImage = `url('./assets/backgrounds/${bg}')`;
}