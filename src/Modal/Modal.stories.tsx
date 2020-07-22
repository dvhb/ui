import React, { useCallback, useState } from 'react';

import { Modal } from './Modal';
import { Button } from '../Button';

export default {
  title: 'Modal',
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleRequestClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <button onClick={handleButtonClick}>Open modal</button>
      {[...Array(30)].map((i, index) => (
        <div key={index}>parent content</div>
      ))}
      <Modal isOpen={isOpen} onRequestClose={handleRequestClose}>
        <>
          {[...Array(20)].map((i, index) => (
            <div key={index}>modal</div>
          ))}
          <Button onClick={handleRequestClose}>Close</Button>
        </>
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
