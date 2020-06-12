import React, { useCallback, useState } from 'react';
import { Modal } from './Modal';

export default {
  title: 'Modal',
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <button onClick={handleButtonClick}>Open modal</button>
      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
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
