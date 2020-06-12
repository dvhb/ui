import React from 'react';

import { Popover } from './Popover';

export default {
  title: 'Popover',
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Popover isOpen position={'bottom'} content={<div>Hi! I'm popover content.</div>}>
    <span>Popover positioner</span>
  </Popover>
);
