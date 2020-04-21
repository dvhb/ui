import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';

import {
  UniversalComponentProps,
  UniversalComponent as CloseButton,
  UniversalComponent as ModalContent,
} from './components/UniversalComponent';
import styles from './styles.module.scss';

export type ModalProps = {
  contentWrapperClassName?: string;
  components?: {
    CloseButton?: (props: UniversalComponentProps) => ReactElement;
    ModalContent?: (props: UniversalComponentProps) => ReactElement;
  };
} & ReactModal.Props;

const defaultComponents = {
  CloseButton,
  ModalContent,
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  contentWrapperClassName,
  overlayClassName,
  onRequestClose,
  components,
  ...rest
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModalHandler = useCallback(
    e => {
      onRequestClose && onRequestClose(e);
      setIsModalOpen(false);
    },
    [onRequestClose],
  );

  const { CloseButton, ModalContent } = { ...defaultComponents, ...components };

  return (
    <ReactModal
      overlayClassName={cn(styles.overlay, { overlayClassName })}
      className={cn(styles.modalWrapper, contentWrapperClassName)}
      isOpen={isModalOpen}
      onRequestClose={closeModalHandler}
      bodyOpenClassName={styles.bodyModalOpen}
      {...rest}
    >
      <ModalContent className={styles.modal}>
        <CloseButton tag="button" onClick={closeModalHandler}>
          X
        </CloseButton>
        {children}
      </ModalContent>
    </ReactModal>
  );
};

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body');
}
