import React, { FC } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

const Left: FC = ({ children }) => <div className="aligner__left">{children}</div>;

type RightProps = {
  paddingLeft?: number;
};

const Right: FC<RightProps> = ({ children, paddingLeft }) => {
  const paddingRightStyle = paddingLeft ? { paddingLeft } : undefined;
  return (
    <div style={paddingRightStyle} className={styles.aligner__right}>
      {children}
    </div>
  );
};
const Center: FC = ({ children }) => <div className={styles.aligner__center}>{children}</div>;

export interface AlignerProps {
  valign: 'center' | 'top' | 'baseline' | 'bottom';
  wrap?: boolean;
}

export class Aligner extends React.Component<AlignerProps> {
  static Left = Left;
  static Right = Right;
  static Center = Center;
  static defaultProps = { valign: 'center' };

  render() {
    const { children, valign, wrap, ...rest } = this.props;

    return (
      <div
        className={cn(styles.aligner, {
          [styles.aligner_wrap]: wrap,
          [styles.aligner_center]: valign === 'center',
          [styles.aligner_top]: valign === 'top',
          [styles.aligner_baseline]: valign === 'baseline',
          [styles.aligner_bottom]: valign === 'bottom',
        })}
        {...rest}
      >
        {children}
      </div>
    );
  }
}
