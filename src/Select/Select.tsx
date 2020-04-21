import React from 'react';
import ReactSelect, { Props, components } from 'react-select';

import styles from './styles.module.scss';
import { Text } from '../Text';
import { Aligner } from '../Aligner';
import { Spacer } from '../Spacer';

export type SelectProps = { clearIndicator?: boolean } & Props;

const formatGroupLabel = (data: any) => {
  return data.label === 'groupBorder' ? <div className={styles.selectGroupDelimiter} /> : null;
};

const customStyles = {
  group: (provided: any) => {
    return { ...provided, padding: 0 };
  },
};

const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <Aligner>
        {props.data.label}
        {props.data.description && (
          <>
            <Spacer marginRight="xs" />
            <Text color="grey">{props.data.description}</Text>
          </>
        )}
      </Aligner>
    </components.Option>
  );
};

export const Select = ({ clearIndicator = true, options, components: customComponents, ...rest }: SelectProps) => {
  const ClearIndicator = (props: any) => (clearIndicator ? <components.ClearIndicator {...props} /> : null);

  return (
    <Text>
      <ReactSelect
        options={options}
        components={{ Option, ClearIndicator, IndicatorSeparator: null, ...customComponents }}
        formatGroupLabel={formatGroupLabel}
        styles={customStyles}
        {...rest}
      />
    </Text>
  );
};
