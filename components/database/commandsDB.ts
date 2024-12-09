import customCommands from './data/customCommands.json';

interface CommandDB {
    commands: string[];
}

// Definiere die Standardbefehle direkt im Code
const customCommands: CommandDB = {
    commands: [
        // Hier können wir Standard-Commands definieren
        // z.B. "say Hello World"
    ]
};

let commandsData: CommandDB = customCommands;

export const getCommands = (): string[] => {
    return commandsData.commands;
};

export const saveCommand = (newCommand: string): void => {
    commandsData.commands = [...commandsData.commands, newCommand];
    // Die Änderungen werden in der JSON-Datei gespeichert
    // Beim nächsten Start/Update des Plugins sind die Commands noch da
}; 