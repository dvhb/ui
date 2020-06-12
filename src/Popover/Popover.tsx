import React from 'react';
import TinyPopover, { PopoverProps as DefaultPopoverProps } from 'react-tiny-popover';

export type PopoverProps = {} & DefaultPopoverProps;

export const Popover = ({ ...rest }: PopoverProps) => {
  return <TinyPopover {...rest} />;
};
