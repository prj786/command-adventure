import Levels from "./levels.js"

const levels = new Levels();

export default class Commands {
    heroDetails = {
        name: "Lord Chaos",
        power: 30,
        health: 110,
        mana: 60
    }

    enemyDetails = levels.enemyInfo;

    commandsList = ["hello", "commands"];

    box = document.getElementById("command_screen");
    mainScreen = document.getElementById("game_logic");
    infoTab = document.getElementById("info_tab");

    // main method
    commandInput = (command) => {
        // this.mainScreen.scrollTop;
        switch (command) {
            case "info":
                this.getInfo();
                break;
            case "commands":
                this.displayCommands();
                console.log(this.commandsList);
                break;
            case "hello":
                this.cast(command);
                break;
            case "attack":
                this.attack();
                break;
            case "eat":
                this.eat(23);
                break;
            case "clear":
                this.clearScreen();
                break;
            default:
                console.log(command);
                break;
        }

        this.infoTab.innerHTML = `
            <div>health: ${this.heroDetails.health}<div>
            <div>power: ${this.heroDetails.power}<div>   
        `
    }

    // missions screen
    cast(command) {
        this.mainScreen.innerHTML = "";
        let result = levels.levels().lordKazuma;
        let enemySpeech = document.createElement("div");
        let yourSpeech = document.createElement("div");
        enemySpeech.innerHTML =
            `
            <div>System: .......</div>
        `
        yourSpeech.innerHTML =
            `
            <div>You:</div> <div class="conversation"> ➡ ${command}</div>
        `
        setTimeout(() => {
            enemySpeech.innerHTML =
                `
            <div>Kazuma: </div> <div class="conversation"> ➡ ${result}</div>
        `
        }, 500);
        this.mainScreen.appendChild(yourSpeech);
        this.mainScreen.appendChild(enemySpeech);
    }

    // command methods
    getInfo() {
        let commandDiv = document.createElement("div");
        commandDiv.innerHTML = this.heroDetails.name;
        this.box.appendChild(commandDiv);
    }

    attack() {
        let commandDiv = document.createElement("div");
        let heroHealth = this.heroDetails.health;
        let heroPower = this.heroDetails.power;
        let enemyHealth = this.enemyDetails.health;
        let enemyPower = this.enemyDetails.power;
        let time = Math.floor(Math.random(100) * 1000);
        commandDiv.innerHTML = "System: greatest fight scene!";
        setTimeout(() => {
            if (heroPower >= enemyHealth) {
                commandDiv.innerHTML = `
                <div>System:</div> <div class="conversation"> ➡ you killed enemy!, go on!</div>
                `
            } else if (enemyPower >= heroHealth) {
                commandDiv.innerHTML = `
                <div>System:</div> <div class="conversation"> ➡ you died. :(</div>
            `
            } else {
                this.enemyDetails.health = Math.floor(enemyHealth - heroPower);
                this.heroDetails.health = Math.floor(heroHealth - enemyPower);
                commandDiv.innerHTML = `
                <div>System:</div> <div class="conversation"> ➡ enemy lost ${this.enemyDetails.health}hp, you lost ${this.heroDetails.health}</div>
                    `;
            }
        }, time)
        console.log(time);
        this.box.appendChild(commandDiv);
    }

    eat(healthPack) {
        this.heroDetails.health += healthPack;
        let commandDiv = document.createElement("div");
        commandDiv.innerHTML = `
        <div>System:</div> <div class="conversation"> ➡ yout health increased, you have ${this.heroDetails.health}hp</div>
        `;
        this.box.appendChild(commandDiv);
    }

    clearScreen() {
        this.box.innerHTML = "System: command receaved!";
        setTimeout(() => {
            this.box.innerHTML = "";
        }, 1000)
    }

    listCommands(commands = []) {
        this.commandsList = commands;
    }

    displayCommands() {
        let commandDiv = document.createElement("div");
        let system = document.createElement("div");
        system.innerHTML = "<div>System: </div>";
        commandDiv.appendChild(system)
        this.commandsList.forEach(command => {
            let div = document.createElement("div");
            div.innerHTML = `<div class="commands"> ➡ ${command}</div>`;
            commandDiv.appendChild(div);
        })
        this.box.appendChild(commandDiv);
    }

    appendText(text) {
        let commandDiv = document.createElement("div");
        commandDiv.innerHTML = text;
        this.box.appendChild(commandDiv);
    }
}