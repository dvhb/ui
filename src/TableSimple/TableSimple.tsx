import React, { ReactElement } from 'react';

import { UniversalComponentProps } from './components/UniversalComponent';
import styles from './styles.module.scss';

export type TableCellProps = { rowEven?: boolean } & UniversalComponentProps;
export type TableHeaderCellProps = { innerProps: ColumnProps } & UniversalComponentProps;

type ColumnProps = { accessor: string; header?: string; [key: string]: any };

export type TableProps = {
  components?: {
    HeaderCell?: (props: TableHeaderCellProps) => ReactElement;
    Cell?: (props: TableCellProps) => ReactElement;
  };

  columns: ColumnProps[];

  data: {
    [key: string]: any;
  }[];
};

const defaultComponents = {
  HeaderCell: (props: any) => <th {...props} />,
  Cell: (props: any) => <td {...props} />,
};

export const TableSimple = ({ columns, data, components }: TableProps) => {
  const { Cell, HeaderCell } = { ...defaultComponents, ...components };

  return (
    <table className={styles.table}>
      <tr>
        {columns.map((i, index) => (
          <HeaderCell key={index} innerProps={i}>
            {i.header && i.header}
          </HeaderCell>
        ))}
      </tr>

      {data.map((i, index) => (
        <tr>
          {columns.map(j => {
            if (Array.isArray(i[j.accessor])) {
              return i[j.accessor].map((i: any) => (
                <Cell key={index} rowEven={index % 2 === 0}>
                  {i}
                </Cell>
              ));
            }
            return (
              <Cell key={index} rowEven={index % 2 === 0}>
                {i[j.accessor]}
              </Cell>
            );
          })}
        </tr>
      ))}
    </table>
  );
};
