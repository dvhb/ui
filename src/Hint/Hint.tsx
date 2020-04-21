import React, { ReactElement, ReactNode, SyntheticEvent, useCallback, useState } from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import { Text } from '../Text';
import { Icon as UIIcon } from '../Icon';
import styles from './styles.module.scss';
import { UniversalComponent as Icon, UniversalComponentProps } from './components/UniversalComponent';

export type HintProps = {
  text: string | ReactNode;
  components?: {
    Icon?: (props: UniversalComponentProps) => ReactElement;
  };
};

const defaultComponents = {
  Icon,
};

export const Hint = ({ text, components }: HintProps) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const { Icon } = { ...defaultComponents, ...components };
  const [hintIsVisible, setHintIsVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const renderText = (text: string) => {
    return text.split('\n').map((item, i) => (
      <div key={i} className={styles.textItem}>
        {item}
      </div>
    ));
  };

  const HintPopup = () =>
    createPortal(
      <div className={cn(styles.hint, styles.hint_absolute)} style={{ left: x, top: y }}>
        <div className={styles.hint__popup}>{typeof text === 'string' ? <Text>{renderText(text)}</Text> : text}</div>
        <Icon className={cn(styles.hint__icon, styles.hint__icon_absolute)}>
          <UIIcon size="inherit" name="Question" />
        </Icon>
      </div>,
      document.body,
    );

  const handleHintMouseEnter = useCallback((e: SyntheticEvent) => {
    const { x, y } = e.currentTarget.getBoundingClientRect();
    setX(x + window.scrollX);
    setY(y + window.scrollY);
    setHintIsVisible(true);
  }, []);

  const handleHintMouseLeave = useCallback(() => {
    setHintIsVisible(false);
  }, []);

  return (
    <div
      className={styles.hint}
      onMouseEnter={!isMobile ? handleHintMouseEnter : () => {}}
      onMouseLeave={handleHintMouseLeave}
      onClick={isMobile ? handleHintMouseEnter : () => {}}
    >
      <Icon className={styles.hint__icon}>
        <UIIcon size="inherit" name="Question" />
      </Icon>
      {hintIsVisible && <HintPopup />}
    </div>
  );
};
