import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { disableBodyScroll as disableBodyScrollLock, enableBodyScroll } from 'body-scroll-lock';
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
  disableBodyScroll?: boolean;
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
  disableBodyScroll = true,
  ...rest
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [overlayRef, setOverlayRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsModalOpen(isOpen);
    if (overlayRef && isOpen && disableBodyScroll) {
      disableBodyScrollLock(overlayRef);
    }
  }, [isOpen, overlayRef]);

  const handleCloseModal = useCallback(
    e => {
      onRequestClose && onRequestClose(e);
      setIsModalOpen(false);
      if (overlayRef !== null && disableBodyScroll) {
        enableBodyScroll(overlayRef);
      }
    },
    [onRequestClose, overlayRef],
  );

  const getOverlayRef = useCallback((node: HTMLDivElement) => {
    setOverlayRef(node);
  }, []);

  const { CloseButton, ModalContent } = { ...defaultComponents, ...components };

  return (
    <ReactModal
      overlayRef={getOverlayRef}
      overlayClassName={cn(styles.overlay, { overlayClassName })}
      className={cn(styles.modalWrapper, contentWrapperClassName)}
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      bodyOpenClassName={styles.bodyModalOpen}
      {...rest}
    >
      <ModalContent className={styles.modal}>
        <CloseButton tag="button" onClick={handleCloseModal}>
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
