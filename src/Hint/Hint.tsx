import React, { FC, ReactElement, ReactNode, SyntheticEvent, useCallback, useState } from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import { Text } from '../Text';
import { Icon as UIIcon } from '../Icon';
import styles from './styles.module.scss';
import { UniversalComponent as Icon, UniversalComponentProps } from './components/UniversalComponent';
import * as Icons from './icons';

export type HintProps = {
  text: string | ReactNode;
  components?: {
    Icon?: (props: UniversalComponentProps) => ReactElement;
  };
};

type HintPopupProps = {
  className?: string;
  x: number;
  y: number;
  text: string | ReactNode;
  onIconClick?: () => void;
};

type FormattedTextProps = {
  text: string;
};

const FormattedText = ({ text }: FormattedTextProps) => {
  return (
    <>
      {text.split('\n').map((item, i) => (
        <div key={i} className={styles.textItem}>
          {item}
        </div>
      ))}
    </>
  );
};

const HintPopup: FC<HintPopupProps> = ({ className, x, y, text, onIconClick }) =>
  createPortal(
    <div className={cn(styles.hint, styles.hint_absolute, className)} style={{ left: x, top: y }}>
      <div className={styles.hint__popup}>
        {typeof text === 'string' ? (
          <Text>
            <FormattedText text={text} />
          </Text>
        ) : (
          text
        )}
      </div>
      <div className={cn(styles.hint__icon, styles.hint__icon_absolute)} onClick={onIconClick}>
        <Icon>
          <UIIcon svgs={Icons} size="inherit" name="Question" />
        </Icon>
      </div>
    </div>,
    document.body,
  );

const defaultComponents = {
  Icon,
};

export const Hint = ({ text, components, ...rest }: HintProps) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const { Icon } = { ...defaultComponents, ...components };
  const [hintIsVisible, setHintIsVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleHintMouseEnter = useCallback((e: SyntheticEvent) => {
    const { x, y } = e.currentTarget.getBoundingClientRect();
    setX(x + window.scrollX);
    setY(y + window.scrollY);
    setHintIsVisible(true);
  }, []);

  const handleHintMouseLeave = useCallback(() => {
    setTimeout(() => setHintIsVisible(false), 0);
  }, []);

  return (
    <div
      className={styles.hint}
      onMouseEnter={!isMobile ? handleHintMouseEnter : () => {}}
      onMouseLeave={handleHintMouseLeave}
      onClick={isMobile ? handleHintMouseEnter : () => {}}
    >
      <Icon className={styles.hint__icon}>
        <UIIcon svgs={Icons} size="inherit" name="Question" />
      </Icon>
      {hintIsVisible && <HintPopup x={x} y={y} text={text} onIconClick={handleHintMouseLeave} {...rest} />}
    </div>
  );
};
