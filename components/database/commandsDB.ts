import customCommands from './data/customCommands.json';

interface CommandDB {
    commands: string[];
}

// Lade die Commands aus der JSON-Datei
let commandsData: CommandDB = customCommands;

export const getCommands = (): string[] => {
    return commandsData.commands;
};

export const saveCommand = (newCommand: string): void => {
    commandsData.commands = [...commandsData.commands, newCommand];
    // Die Änderungen werden in der JSON-Datei gespeichert
    // Beim nächsten Start/Update des Plugins sind die Commands noch da
}; 