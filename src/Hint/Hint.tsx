import React, { FC, ReactElement, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import { Text } from '../Text';
import { Icon as UIIcon } from '../Icon';
import styles from './styles.module.scss';
import {
  UniversalComponent as Icon,
  UniversalComponentProps,
  UniversalComponent as Popup,
  UniversalComponent as PopupContent,
  UniversalComponent as PopupIcon,
} from './components/UniversalComponent';
import * as Icons from './icons';

export type HintPopupComponentProps = {
  onClose?: () => void;
} & UniversalComponentProps;

export type HintProps = {
  text: string | ReactNode;
  containerId?: string;
  components?: {
    Icon?: (props: UniversalComponentProps) => ReactElement;
    Popup?: (props: HintPopupComponentProps) => ReactElement;
    PopupContent?: (props: UniversalComponentProps) => ReactElement;
    PopupIcon?: (props: UniversalComponentProps) => ReactElement;
  };
};

type HintPopupProps = {
  className?: string;
  x: number;
  y: number;
  text: string | ReactNode;
  onIconClick?: () => void;
} & Pick<HintProps, 'components' | 'containerId'>;

type FormattedTextProps = {
  text: string;
};

const defaultComponents = {
  Icon,
  Popup,
  PopupContent,
  PopupIcon,
};

const FormattedText = ({ text }: FormattedTextProps) => {
  return (
    <>
      {text.split('\n').map((item, i) => (
        <span key={i} className={styles.textItem} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </>
  );
};

const HintPopup: FC<HintPopupProps> = ({ className, x, y, text, onIconClick, components, containerId }) => {
  const { Icon, Popup, PopupContent, PopupIcon } = { ...defaultComponents, ...components };

  return createPortal(
    <Popup
      className={cn(styles.hint, styles.hint_absolute, className)}
      style={{ left: x, top: y }}
      onClose={onIconClick}
    >
      <PopupContent className={styles.hint__popup}>
        {typeof text === 'string' ? (
          <Text>
            <FormattedText text={text} />
          </Text>
        ) : (
          text
        )}
      </PopupContent>
      {PopupIcon && (
        <PopupIcon className={cn(styles.hint__icon, styles.hint__icon_absolute)} onClick={onIconClick}>
          <Icon>
            <UIIcon svgs={Icons} size="inherit" name="Question" />
          </Icon>
        </PopupIcon>
      )}
    </Popup>,
    containerId ? document.getElementById(containerId)! : document.body,
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
