import React, { FC, ReactElement } from 'react';

import styles from './styles.module.scss';
import { UniversalComponentProps, UniversalComponent as ListItem } from './components/UniversalComponent';

export type ListProps = {
  items?: string[];
  components?: {
    ListItem?: (props: UniversalComponentProps) => ReactElement;
  };
};

const defaultComponents = {
  ListItem,
};

export const List: FC<ListProps> = ({ items, components }) => {
  const { ListItem } = { ...defaultComponents, ...components };

  return (
    <div className={styles.list}>
      {items?.map((i, index) => (
        <ListItem className={styles.listItem}>{i}</ListItem>
      ))}
    </div>
  );
};
