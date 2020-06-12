import React, { FC, ReactElement } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  percentage: number;
  components: {
    ProgressBarWrapper: any;
    Filler: any;
  };
  error?: string;
};

export const ProgressBar: FC<Props> = ({ percentage, error, components }) => {
  const { ProgressBarWrapper, Filler } = components;

  return (
    <ProgressBarWrapper className={styles.progressBar}>
      <Filler
        className={cn(styles.filler, error && styles.filler_error, percentage === 100 && styles.filler_complete)}
        style={{ width: `${percentage}%` }}
      />
    </ProgressBarWrapper>
  );
};
