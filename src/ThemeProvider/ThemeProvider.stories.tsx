import React, { FC } from 'react';

import { Provider, useComponents } from './useComponents';
import { Button, ButtonProps } from '../Button';

export default {
  title: 'ThemeProvider',
};

const ButtonStyled: FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

const Component: FC = () => {
  const { Button } = useComponents();
  return (
    <div>
      component used <Button>styled button</Button>
    </div>
  );
};

const components = {
  Button: ButtonStyled,
};

export const Default = () => (
  <Provider<typeof components> components={components}>
    <Component />
  </Provider>
);
