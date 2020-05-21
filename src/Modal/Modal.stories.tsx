import React from 'react';
import { Modal } from './Modal';

export default {
  title: 'Modal',
};

export const Default = () => (
  <Modal isOpen>
    {[...Array(20)].map((i, index) => (
      <div key={index}>modal</div>
    ))}
  </Modal>
);

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
