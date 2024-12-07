import { Button } from '@/components/elements/button/index';
import { ServerContext } from '@/state/server';
import { faGamepad, faTerminal, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Banner from './Banner';

const Content = () => {
  const { instance } = ServerContext.useStoreState((state) => state.socket);
  const [viewing, setViewing] = useState<'commands' | 'gamemode' | 'players'>('commands');

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

const sendCommand = (action: string) => {
  const { instance } = ServerContext.useStoreState((state) => state.socket);
  let commandToExecute = '';
  if (action === 'wartungsarbeiten') {
    commandToExecute = 'tellraw @a ["",{"text":"⚠: ","bold":true,"color":"red"},{"text":"Wartungsarbeiten","bold":true,"color":"yellow"},"\n",{"text":"Server offline für ca. 15-20 minuten","color":"white"}]';
  }
  if (instance) {
    instance.send('send command', commandToExecute);
  }
};

const renderCommandsPage = () => {
  return (
    <div>
      <div className="flex flex-row mb-4">
        <Banner title="Operators" className="bg-gray-700" icon={<FontAwesomeIcon icon={faTerminal} />}>
          Execute your preconfigured commands.
        </Banner>
      </div>
      <Button.Text onClick={() => sendCommand('wartungsarbeiten')}>Wartungsarbeiten</Button.Text>
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

export default Content;