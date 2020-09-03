import Commands from "./commands.js";

const command = new Commands();
const commandName = document.getElementById("command_name");

let commandList = ["hello", "commands"];

let level = 0;

commandName.addEventListener("keypress", (e) => {
    let keyValue = e.which || e.keyCode;
    let value = commandName.value;
    if (keyValue === 13) {
        commandName.value = "";
        if (commandList.includes(value) && value !== "commands") {
            if (level === 3) {
                commandList = [
                    "attack",
                    "info",
                    "clear",
                    "commands"
                ];
                level = 0;
            } else {
                commandList = [
                    "kiss",
                    "info",
                    "eat",
                    "walk",
                    "clear",
                    "commands"
                ];
            }
            level += 1;
            command.commandInput(value);
        } else {
            if (value === "commands") {
                command.commandInput(value);
            } else {
                console.log("failed");
            }
        }
        command.listCommands(commandList);
    }
});