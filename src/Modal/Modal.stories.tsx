import React, { useCallback, useState } from 'react';
import { Modal } from './Modal';

export default {
  title: 'Modal',
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonClickHandler = useCallback(() => {
    setIsOpen(true);
  }, []);

  const modalCloseHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <button onClick={buttonClickHandler}>Open modal</button>
      <Modal isOpen={isOpen} onRequestClose={modalCloseHandler}>
        {[...Array(20)].map((i, index) => (
          <div key={index}>modal</div>
        ))}
      </Modal>
    </div>
  );
};

const parentSelector = () => document.getElementById('target')!;

export const CustomPlace = () => (
  <div id="target">
    <Modal isOpen parentSelector={parentSelector}>
      {[...Array(20)].map((i, index) => (
        <div key={index}>modal</div>
      ))}
    </Modal>
  </div>
);
