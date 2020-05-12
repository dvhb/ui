import React, { FC, HTMLAttributes, ReactElement } from 'react';

import { UniversalComponentProps, UniversalComponent as ListItem } from './components/UniversalComponent';

export type ListProps = {
  items?: string[];
  components?: {
    ListItem?: (props: UniversalComponentProps) => ReactElement;
  };
} & HTMLAttributes<HTMLDivElement>;

const defaultComponents = {
  ListItem,
};

export const List: FC<ListProps> = ({ items, components, ...rest }) => {
  const { ListItem } = { ...defaultComponents, ...components };

  return (
    <div {...rest}>
      {items?.map((i, index) => (
        <ListItem key={index}>{i}</ListItem>
      ))}
    </div>
  );
};
