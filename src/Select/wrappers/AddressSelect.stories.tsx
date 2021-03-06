import React from 'react';
import { action } from '@storybook/addon-actions';

import { AddressSelect } from './AddressSelect';

export default {
  title: 'Select/wrappers/AddressSelect',
};

const apiKey = process.env.REACT_APP_DADATA_API_KEY || '';

export const FullAddress = () => {
  return <AddressSelect apiKey={apiKey} onChange={action('onChange')} />;
};

export const CitiesAndSettlements = () => {
  return <AddressSelect apiKey={apiKey} fromBound="city" toBound="settlement" onChange={action('onChange')} />;
};

export const StreetAddressInKrasnoyarsk = () => {
  return <AddressSelect apiKey={apiKey} constraintKladrId="2400000100000" onChange={action('onChange')} />;
};
