import React, { useState } from 'react';
import { Button } from '@/components/elements/button/index';
import { faGamepad, faTerminal, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from './Banner';
import { ServerContext } from '@/state/server';

const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);

const Content = () => {
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
          <p>{uuid}</p>
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

const renderCommandsPage = () => {
  return (
    <Banner title={'Commands'} className={'bg-gray-700'} icon={<FontAwesomeIcon icon={faTerminal} />}>
        Execute your preconfigured commands.
    </Banner>
  );
};
const renderGamemodePage = () => {
  return (
    <Banner title={'Gamemode'} className={'bg-gray-700'} icon={<FontAwesomeIcon icon={faGamepad} />}>
      Manage the gamemode of your players.
    </Banner>
  );
};
const renderPlayersPage = () => {
  return (
    <Banner title={'Players'} className={'bg-gray-700'} icon={<FontAwesomeIcon icon={faUserPlus} />}>
      Manage the players on your server.
    </Banner>
  );
};

export default Content;
