import React from 'react';
import { Button } from './Button';

export default {
  title: 'Button',
};

export const Default = () => <Button>button</Button>;
export const unstyled = () => <Button type="unstyled">button</Button>;
export const TagA = () => (
  <Button tag="a" href="#">
    button
  </Button>
);

export const block = () => (
  <Button tag="a" block href="#">
    link block
  </Button>
);

export const disabled = () => (
  <Button disabled href="#">
    disabled
  </Button>
);
