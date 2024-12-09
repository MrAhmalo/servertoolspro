import React from 'react';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import Content from '@/blueprint/extensions/{identifier}/Content';

const ExampleComponent = () => {
  return (
    <ServerContentBlock title={'Tools'}>
      <>
        <Content/>
      </>
    </ServerContentBlock>
  );
};

export default ExampleComponent;