import { Button } from '@/components/elements/button/index';
import { ServerContext } from '@/state/server';
import { faGamepad, faTerminal, faUserPlus, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
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
    console.log('Sending command', commandToExecute);
    instance.send('send command', commandToExecute);
  }
};

const renderCommandsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [customCommand, setCustomCommand] = useState('');
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setCustomCommand('');
    setShowModal(false);
  };
  const handleCustomCommandSubmit = () => {
    if (customCommand.trim()) {
      sendCommand(customCommand);
      closeModal();
    } else {
      console.warn('Bitte einen gültigen Command eingeben.');
    }
  };

  return (
    <div>
      <div>
        <Banner title="Operators" className="bg-gray-700" icon={<FontAwesomeIcon icon={faTerminal} />}>
          Execute your preconfigured commands.
        </Banner>
      </div>
      <div className="flex flex-row mb-4">
        <Button.Text className="ml-2" onClick={openModal}>
          <FontAwesomeIcon icon={faPlus} />
        </Button.Text>
        {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Neuen Command eingeben</h2>
              <button onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            <input
              type="text"
              value={customCommand}
              onChange={(e) => setCustomCommand(e.target.value)}
              placeholder="Command eingeben"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              onClick={handleCustomCommandSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Command senden
            </button>
          </div>
        </div>
      )}
        
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

export default Content;