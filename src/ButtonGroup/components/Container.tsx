import React, { FC, HTMLAttributes } from 'react';

export type PropsContainer = {} & HTMLAttributes<HTMLDivElement>;

export const Container: FC = ({ ...rest }: PropsContainer) => {
  return <div {...rest} />;
};
