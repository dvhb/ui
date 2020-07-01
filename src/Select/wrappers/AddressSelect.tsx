import React, { FC } from 'react';

import { Select, SelectProps } from '../Select';
import { makeAddressString, makeStreetAddressString } from './utils';
import { DaDataSuggestion } from './types';

export interface AddressSelectProps extends Omit<SelectProps, 'loadOptions'> {
  apiKey: string;
  apiUrl?: string;
  fromBound?: 'country' | 'region' | 'area' | 'city' | 'settlement' | 'street' | 'house';
  toBound?: 'country' | 'region' | 'area' | 'city' | 'settlement' | 'street' | 'house';
  cityString?: string;
}

export const AddressSelect: FC<AddressSelectProps> = ({
  apiKey,
  apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
  fromBound,
  toBound,
  cityString,
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
      body: JSON.stringify({
        query: cityString ? `${cityString} ${inputValue}` : inputValue,
        from_bound: { value: fromBound },
        to_bound: { value: toBound },
        restrict_value: true,
      }),
    });
    const data = await response.json();
    const options = data.suggestions
      .map((suggestion: DaDataSuggestion) => {
        return {
          label: cityString ? makeStreetAddressString(suggestion.data) : makeAddressString(suggestion.data),
          value: suggestion.data,
        };
      })
      .filter((suggestion: any) => suggestion.label);

    return { options, hasMore: false };
  };

  return <Select {...props} cacheOptions loadOptions={loadAddresses} />;
};
