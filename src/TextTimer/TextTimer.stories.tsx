import React from 'react';

import { TextTimer } from './TextTimer';

export default {
  title: 'TextTimer',
};

export const Default = () => <TextTimer duration={3685000} />;

export const DefaultShort = () => <TextTimer duration={10000} />;

export const WithText = () => <TextTimer duration={3685000} text="Осталось" />;

export const WithCustomLabels = () => (
  <TextTimer duration={3685000} labels={{ hours: 'hours', minutes: 'minutes', seconds: 'seconds' }} />
);
