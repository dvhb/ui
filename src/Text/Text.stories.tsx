import React from 'react';
import { Text } from './Text';

export default {
  title: 'Text',
};

export const Default = () => (
  <>
    <Text tag="h1">Text h1</Text>
    <Text>Text</Text>
    <Text weight="bold">Text bold</Text>
  </>
);
