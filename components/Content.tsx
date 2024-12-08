import { Button } from '@/components/elements/button/index';
import { Dialog } from '@/components/elements/dialog/index';
import { Input } from '@/components/elements/inputs/index';
import Label from '@/components/elements/Label';
import { ServerContext } from '@/state/server';
import { faGamepad, faPlus, faTerminal, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Banner from './Banner';

function delay(ms : number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

// Main
const Content = () => {
  // Global variables
  const [viewing, setViewing] = useState<'commands' | 'gamemode' | 'players'>('commands');
  const { instance } = ServerContext.useStoreState((state) => state.socket);
  const [showDialog, setShowDialog] = useState(false);
  const [customCommand, setCustomCommand] = useState('');

  // Global functions
  const sendCommand = (action: string) => {
    if (instance) {
      console.log('Sending command', action);
      instance.send('send command', action);
    }
  };

  // commandsPage
  const renderCommandsPage = () => {
    // commandsPage functions
    // open/close create command dialog
    const openDialog = () => setShowDialog(true);
    const closeDialog = () => {
      setCustomCommand('');
      setShowDialog(false);
    };
    const handleCustomCommandSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (customCommand.trim()) {
        sendCommand(customCommand);
        closeDialog();
      } else {
        console.warn('Please enter a valid command.');
      }
    };
    const handleCommandKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && customCommand.trim().length > 0) {
        e.preventDefault();
        handleCustomCommandSubmit(e as unknown as React.FormEvent);
      }
    };
    
    // commands
    const restart1Command = async () => {
      sendCommand('tellraw @a ["","Server restarts in ",{"text":"1 minute","color":"green"}]')
      sendCommand('playsound minecraft:block.note_block.pling master @a')
      await delay(60 * 1000);
      sendCommand('restart');
    };
    const maintance1Command = async () => {
      sendCommand('tellraw @a ["",{"text":"⚠: ","bold":true,"color":"red"},{"text":"Maintance work","bold":true,"color":"yellow"},"\\n",{"text":"Server offtime due to maintance work","color":"white"}]')
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"1 minute","color":"green"}]')
      sendCommand('playsound minecraft:event.raid.horn master @a ~ ~ ~ 50')
      await delay(60 * 1000);
      sendCommand('stop');
    };
    const maintance5Command = async () => {
      sendCommand('tellraw @a ["",{"text":"⚠: ","bold":true,"color":"red"},{"text":"Maintance work","bold":true,"color":"yellow"},"\\n",{"text":"Server offtime due to maintance work","color":"white"}]')
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"5 minutes","color":"green"}]')
      await delay(240 * 1000);
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"1 minute","color":"green"}]')
      sendCommand('playsound minecraft:event.raid.horn master @a ~ ~ ~ 50')
      await delay(60 * 1000);
      sendCommand('stop');
    };
    const maintance10Command = async () => {
      sendCommand('tellraw @a ["",{"text":"⚠: ","bold":true,"color":"red"},{"text":"Maintance work","bold":true,"color":"yellow"},"\\n",{"text":"Server offtime due to maintance work","color":"white"}]')
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"10 minutes","color":"green"}]')
      await delay(300 * 1000);
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"5 minutes","color":"green"}]')
      await delay(240 * 1000);
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"1 minute","color":"green"}]')
      sendCommand('playsound minecraft:event.raid.horn master @a ~ ~ ~ 50')
      await delay(60 * 1000);
      sendCommand('stop');
    };
    const maintance30Command = async () => {
      sendCommand('tellraw @a ["",{"text":"⚠: ","bold":true,"color":"red"},{"text":"Maintance work","bold":true,"color":"yellow"},"\\n",{"text":"Server offtime due to maintance work","color":"white"}]')
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"30 minutes","color":"green"}]')
      await delay(900 * 1000);
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"15 minutes","color":"green"}]')
      await delay(840 * 1000);
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"1 minute","color":"green"}]')
      sendCommand('playsound minecraft:event.raid.horn master @a ~ ~ ~ 50')
      await delay(60 * 1000);
      sendCommand('stop');
    };
    const maintance60Command = async () => {
      sendCommand('tellraw @a ["",{"text":"⚠: ","bold":true,"color":"red"},{"text":"Maintance work","bold":true,"color":"yellow"},"\\n",{"text":"Server offtime due to maintance work","color":"white"}]')
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"60 minutes","color":"green"}]')
      await delay(1800 * 1000);
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"30 minutes","color":"green"}]')
      await delay(1740 * 1000);
      sendCommand('tellraw @a ["",{"text":"Server shutdown in ","color":"white"},{"text":"1 minute","color":"green"}]')
      sendCommand('playsound minecraft:event.raid.horn master @a ~ ~ ~ 50')
      await delay(60 * 1000);
      sendCommand('stop');
    };
  
    return (
      <div>
        <div>
          <Banner title="Operators" className="bg-gray-700" icon={<FontAwesomeIcon icon={faTerminal} />}>
            Execute your preconfigured commands. <br></br>
            Maintance commands: broadcasts a warning message and shutdowns the server after the given time. <br></br>
            Restart commands: broadcasts a warning message and restarts the server after the given time.
          </Banner>
        </div>
        <div className="flex flex-row mt-4">
          <Button.Text className="mr-2" onClick={openDialog}>
            <FontAwesomeIcon icon={faPlus} />
          </Button.Text>
  
          <Dialog open={showDialog} onClose={closeDialog} title={'Enter new command'}>
            <form id="custom-command-form" onSubmit={handleCustomCommandSubmit}>
              <Label>Command</Label>
              <Input.Text
                placeholder="give @a minecraft:diamond 1"
                value={customCommand}
                onChange={(e) => setCustomCommand(e.target.value)}
                onKeyDown={handleCommandKeyDown}
              />
  
              <Dialog.Footer>
                <Button.Text onClick={closeDialog}>Cancel</Button.Text>
                <Button
                  disabled={customCommand.trim().length === 0}
                  type="submit"
                  form="custom-command-form"
                >
                  Command senden
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog>
  
          <Button.Text onClick={() => restart1Command()} className="mr-2">Restart</Button.Text>
          <Button.Text onClick={() => maintance1Command()} className="mr-2">Maintance</Button.Text>
          <Button.Text onClick={() => maintance5Command()} className="mr-2">Maintance (5m)</Button.Text>
          <Button.Text onClick={() => maintance10Command()} className="mr-2">Maintance (10m)</Button.Text>
          <Button.Text onClick={() => maintance30Command()} className="mr-2">Maintance (30m)</Button.Text>
          <Button.Text onClick={() => maintance60Command()} className="mr-2">Maintance (1h)</Button.Text>
        </div>
      </div>
    );
  };

  const renderGamemodePage = () => {
    return (
      <Banner title="Gamemode" className="bg-gray-700" icon={<FontAwesomeIcon icon={faGamepad} />}>
        Manage the gamemode of your players.
      </Banner>
    );
  };
  
  const renderPlayersPage = () => {
    return (
      <Banner title="Players" className="bg-gray-700" icon={<FontAwesomeIcon icon={faUserPlus} />}>
        Manage the players on your server.
      </Banner>
    );
  };

  const renderPageContent = () => {
    switch (viewing) {
      case 'commands':
        return renderCommandsPage();
      case 'gamemode':
        return renderGamemodePage();
      case 'players':
        return renderPlayersPage();
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <>
      <div className={'mb-4 flex flex-col md:flex-row md:justify-between justify-center md:items-center content-between w-full'}>
        <h1 className={'text-2xl'}>Server tools</h1>
        <div className={'flex flex-row'}>
          <Button.Text disabled={viewing === 'commands'} onClick={() => setViewing('commands')}>
            Commands
          </Button.Text>
          <Button.Text disabled={viewing === 'gamemode'} onClick={() => setViewing('gamemode')} className={'ml-2'}>
            Gamemode
          </Button.Text>
          <Button.Text disabled={viewing === 'players'} onClick={() => setViewing('players')} className={'ml-2'}>
            Players
          </Button.Text>
        </div>
      </div>

      <div className="page-content mt-4">
        {renderPageContent()}
      </div>
    </>
  );
};

export default Content;