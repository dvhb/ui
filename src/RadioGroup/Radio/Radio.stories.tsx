import React from 'react';

import { Radio } from './Radio';

export default {
  title: 'Radio',
  excludeStories: /.*Data$/,
};

export const Default = () => <Radio />;
export const Checked = () => <Radio checked />;
