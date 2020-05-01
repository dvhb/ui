import React, { FC, ReactElement, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react';
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
} & Pick<HintProps, 'components'>;

type FormattedTextProps = {
  text: string;
};

const defaultComponents = {
  Icon,
};

const FormattedText = ({ text }: FormattedTextProps) => {
  return (
    <>
      {text.split('\n').map((item, i) => (
        <span key={i} className={styles.textItem}>
          {item}
        </span>
      ))}
    </>
  );
};

const HintPopup: FC<HintPopupProps> = ({ className, x, y, text, onIconClick, components }) => {
  const { Icon } = { ...defaultComponents, ...components };

  return createPortal(
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
};

export const Hint = ({ text, components, ...rest }: HintProps) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const { Icon } = { ...defaultComponents, ...components };
  const [hintIsVisible, setHintIsVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleHintShow = useCallback((e: SyntheticEvent) => {
    const { x, y } = e.currentTarget.getBoundingClientRect();
    setX(x + window.scrollX);
    setY(y + window.scrollY);
    setHintIsVisible(true);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }, []);

  const handleHintHide = useCallback(() => {
    setTimeout(() => setHintIsVisible(false), 0);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleHintHide);
  }, [handleHintHide]);

  return (
    <div
      className={styles.hint}
      onMouseEnter={!isMobile ? handleHintShow : () => {}}
      onMouseLeave={handleHintHide}
      onClick={isMobile ? handleHintShow : () => {}}
    >
      <Icon className={styles.hint__icon}>
        <UIIcon svgs={Icons} size="inherit" name="Question" />
      </Icon>
      {hintIsVisible && (
        <HintPopup components={components} x={x} y={y} text={text} onIconClick={handleHintHide} {...rest} />
      )}
    </div>
  );
};
