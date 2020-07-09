import React, { ReactElement } from 'react';
import cn from 'classnames';

import { UniversalComponentProps } from './components/UniversalComponent';
import styles from './styles.module.scss';

export type TableCellProps = { rowEven?: boolean } & UniversalComponentProps;
export type TableHeaderCellProps = { innerProps: ColumnProps } & UniversalComponentProps;
export type TableProps = UniversalComponentProps;
export type TableHeaderRowProps = UniversalComponentProps;
export type TableRowProps = UniversalComponentProps;

type ColumnProps = { accessor: string; header?: string; [key: string]: any };

export type TableSimpleProps = {
  components?: {
    HeaderCell?: (props: TableHeaderCellProps) => ReactElement;
    Cell?: (props: TableCellProps) => ReactElement;
    Table?: (props: TableProps) => ReactElement;
    HeaderRow?: (props: TableHeaderRowProps) => ReactElement;
    Row?: (props: TableRowProps) => ReactElement;
  };

  columns: ColumnProps[];

  data: {
    [key: string]: any;
  }[];
};

const defaultComponents = {
  HeaderCell: (props: any) => <th className={cn(styles.cell, styles.headerCell)} {...props} />,
  Cell: (props: any) => <td className={styles.cell} {...props} />,
  Table: (props: any) => <table className={styles.table} {...props} />,
  HeaderRow: (props: any) => <tr className={cn(styles.row, styles.headerRow)} {...props} />,
  Row: (props: any) => <tr className={styles.row} {...props} />,
};

export const TableSimple = ({ columns, data, components }: TableSimpleProps) => {
  const { Cell, HeaderCell, HeaderRow, Row, Table } = { ...defaultComponents, ...components };

  return (
    <Table>
      <HeaderRow>
        {columns.map((i, index) => (
          <HeaderCell key={index} innerProps={i}>
            {i.header && i.header}
          </HeaderCell>
        ))}
      </HeaderRow>

      {data.map((i, index) => (
        <Row>
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
        </Row>
      ))}
    </Table>
  );
};
