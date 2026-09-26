let humanScore = 0;
let computerScore = 0;

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer));
    });
}

async function getHumanChoice() {
    const validChoices = ["rock", "paper", "scissors"];

    while (true) {
        const input = await ask("Elige: rock, paper o scissors (o 'salir' para cancelar): ");
        if (input === undefined || input === null) {
            console.log("Juego cancelado por el usuario.");
            return null;
        }
        const choice = input.trim().toLowerCase();
        if (choice === "" || choice === "salir" || choice === "exit" || choice === "cancelar") {
            console.log("Juego cancelado por el usuario.");
            return null;
        }
        if (validChoices.includes(choice)) {
            return choice;
        }
        console.log("Entrada inválida. Por favor escribe: rock, paper o scissors.");
    }
}

// Alias para compatibilidad con el nombre anterior
async function getPlayerChoice() {
    return await getHumanChoice();
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return "It's a tie! Both chose " + playerSelection + ".";
    }

    if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        humanScore++;
        return "You win! " + playerSelection + " beats " + computerSelection + ".";
    }

    computerScore++;
    return "You lose! " + computerSelection + " beats " + playerSelection + ".";
}

async function playGame(rounds = 5) {
    humanScore = 0;
    computerScore = 0;

    for (let i = 1; i <= rounds; i++) {
        console.log("--- Ronda " + i + " de " + rounds + " ---");
        const humanSelection = await getHumanChoice();
        if (humanSelection === null) {
            console.log("Juego terminado anticipadamente.");
            break;
        }
        const computerSelection = getComputerChoice();

        console.log("Tu elección:", humanSelection);
        console.log("Elección de la computadora:", computerSelection);
        console.log(playRound(humanSelection, computerSelection));
        console.log("Marcador -> Tú:", humanScore, "| Computadora:", computerScore);
    }

    console.log("=== Resultado final ===");
    console.log("Tu puntaje:", humanScore);
    console.log("Puntaje de la computadora:", computerScore);

    if (humanScore > computerScore) {
        console.log("¡Felicidades! Ganaste el juego.");
    } else if (computerScore > humanScore) {
        console.log("La computadora gana el juego. ¡Inténtalo de nuevo!");
    } else {
        console.log("El juego termina en empate.");
    }

    rl.close();
}

playGame();