import React, { forwardRef } from 'react';
import ReactSelect, { components } from 'react-select';
import { AsyncPaginateBase, Props as ReactSelectProps } from 'react-select-async-paginate';

import styles from './styles.module.scss';
import { Text } from '../Text';
import { Aligner } from '../Aligner';
import { Spacer } from '../Spacer';

export type SelectProps = {
  clearIndicator?: boolean;
  forwardedRef?: any;
} & ReactSelectProps<{ label: string; value: string }>;

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
            <Text tag="div" color="grey">
              {props.data.description}
            </Text>
          </>
        )}
      </Aligner>
    </components.Option>
  );
};

const SelectPure = ({
  clearIndicator = true,
  options,
  components: customComponents,
  forwardedRef,
  ...rest
}: SelectProps) => {
  const ClearIndicator = (props: any) => (clearIndicator ? <components.ClearIndicator {...props} /> : null);
  const SelectComponent: React.ComponentType<any> = rest.loadOptions ? AsyncPaginateBase : ReactSelect;

  return (
    <SelectComponent
      ref={forwardedRef}
      options={options}
      components={{ Option, ClearIndicator, IndicatorSeparator: null, ...customComponents }}
      formatGroupLabel={formatGroupLabel}
      styles={customStyles}
      {...rest}
    />
  );
};

export const Select = forwardRef((props: SelectProps, ref) => <SelectPure {...props} forwardedRef={ref} />);
