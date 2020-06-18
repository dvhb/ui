import { DaDataAddress } from './types';

const join = (array: (string | null)[], separator: string = ', ') => array.filter(n => n).join(separator);

const getRegion = (address: DaDataAddress) => {
  if (address.region_with_type?.startsWith(address.region)) {
    return join([address.region, address.region_type_full], ' ');
  }

  return join([address.region_type_full, address.region], ' ');
};

export const makeAddressString = (address: DaDataAddress) => {
  return join([
    getRegion(address),
    join([address.area, address.area_type_full], ' '),
    join([address.settlement_type_full, address.settlement], ' '),
    (address.city !== address.region && join([address.city_type_full, address.city], ' ')) || ' ',
    join([address.street_type_full, address.street], ' '),
    join([address.house_type_full, address.house, address.block_type_full, address.block], ' '),
    join([address.flat_type_full, address.flat], ' '),
  ]);
};

export const makeStreetAddressString = (address: DaDataAddress) => {
  return join([
    join([address.street_type_full, address.street], ' '),
    (!address.street && join([address.settlement_type_full, address.settlement], ' ')) || '',
    join([address.house_type_full, address.house, address.block_type_full, address.block], ' '),
    join([address.flat_type_full, address.flat], ' '),
  ]);
};
