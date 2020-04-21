import React from 'react';

import { Hint } from './Hint';

export default {
  title: 'Hint',
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <div style={{ padding: 20 }}>
    <Hint text="В один полис можно добавить не более пяти путешественников." />
  </div>
);
