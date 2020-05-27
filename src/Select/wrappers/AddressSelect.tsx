import React, { FC } from 'react';

import { Select, SelectProps } from '../Select';

export interface AddressSelectProps extends SelectProps {
  apiKey: string;
  apiUrl?: string;
  fromBound?: 'country' | 'region' | 'area' | 'city' | 'settlement' | 'street' | 'house';
  toBound?: 'country' | 'region' | 'area' | 'city' | 'settlement' | 'street' | 'house';
}

export const AddressSelect: FC<AddressSelectProps> = ({
  apiKey,
  apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
  fromBound,
  toBound,
  ...props
}) => {
  const headers = {
    Authorization: `Token ${apiKey}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const loadAddresses = async (inputValue: string) => {
    const response = await fetch(apiUrl, {
      headers,
      method: 'POST',
      body: JSON.stringify({ query: inputValue, from_bound: { value: fromBound }, to_bound: { value: toBound } }),
    });
    const data = await response.json();
    return data.suggestions.map((suggestion: any) => {
      return {
        label: suggestion.value,
        value: suggestion.data,
      };
    });
  };

  return <Select {...props} error cacheOptions loadOptions={loadAddresses} />;
};
