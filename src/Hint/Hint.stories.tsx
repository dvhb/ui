import React from 'react';

import { Hint } from './Hint';

export default {
  title: 'Hint',
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <div style={{ padding: 20 }}>
    <Hint text="Hint text" />
  </div>
);

export const CustomPlace = () => (
  <div style={{ padding: 20 }} id="targetId">
    <Hint text="Hint text" containerId="targetId" />
  </div>
);
