import React from 'react';
import PageContentBlock from '@/components/elements/PageContentBlock';
import Content from '@/blueprint/extensions/{identifier}/Content';

const ExampleComponent = () => {
  return (
    <PageContentBlock title={'Players'}>
      <>
        <Content/>
      </>
    </PageContentBlock>
  );
};

export default ExampleComponent;