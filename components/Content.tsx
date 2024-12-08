import { Button } from '@/components/elements/button/index';
import { Dialog } from '@/components/elements/dialog/index';
import { Input } from '@/components/elements/inputs/index';
import Label from '@/components/elements/Label';
import { ServerContext } from '@/state/server';
import { faGamepad, faPlus, faTerminal, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Banner from './Banner';

const Content = () => {
  const [viewing, setViewing] = useState<'commands' | 'gamemode' | 'players'>('commands');
  const { instance } = ServerContext.useStoreState((state) => state.socket);
  const [showDialog, setShowDialog] = useState(false);
  const [customCommand, setCustomCommand] = useState('');

  const sendCommand = (action: string) => {
    let commandToExecute = '';
    
    if (action === 'wartungsarbeiten') {
      commandToExecute = 'tellraw @p ["",{"text":"⚠: ","bold":true,"color":"red"},{"text":"Wartungsarbeiten","bold":true,"color":"yellow"},"\\n",{"text":"Server offline für ca. 15-20 minuten","color":"white"}]';
    } else {
      commandToExecute = action;
    }
  
    if (instance) {
      console.log('Sending command', commandToExecute);
      instance.send('send command', commandToExecute);
    }
  };

  const renderCommandsPage = () => {
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
    
  
    return (
      <div>
        <div>
          <Banner title="Operators" className="bg-gray-700" icon={<FontAwesomeIcon icon={faTerminal} />}>
            Execute your preconfigured commands.
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
  
          <Button.Text onClick={() => sendCommand('wartungsarbeiten')}>Wartungsarbeiten</Button.Text>
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