import React, { AnchorHTMLAttributes, FC, ReactElement } from 'react';

export type LinkProps = {
  components?: {
    Link?: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactElement;
  };
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const defaultComponents = {
  Link: 'a',
};

export const Link: FC<LinkProps> = ({ children, components, ...rest }) => {
  const { Link: LinkComponent } = { ...defaultComponents, ...components };

  return <LinkComponent {...rest}>{children}</LinkComponent>;
};
