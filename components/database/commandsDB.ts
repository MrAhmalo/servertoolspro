import defaultCommands from './commands.json';

interface CommandDB {
    commands: string[];
}

let commandsData: CommandDB = defaultCommands;

export const getCommands = (): string[] => {
    return commandsData.commands;
};

export const saveCommand = (newCommand: string): void => {
    commandsData.commands = [...commandsData.commands, newCommand];
}; 