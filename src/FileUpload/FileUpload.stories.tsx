import React from 'react';
import { FileUpload } from './FileUpload';
import { FormDemo } from '../utils/forms';
import { Field } from 'react-final-form';

export default {
  title: 'FileUpload',
};

export const Default = () => (
  <FileUpload url="https://jsonplaceholder.typicode.com/albums/1/photos" label="Загрузить файл" caption="Helper text" />
);

export const OnlyJpgAndPng = () => (
  <FileUpload
    url="https://jsonplaceholder.typicode.com/albums/1/photos"
    label="Загрузить файл"
    caption="JPG and PNG only"
    accept=".jpeg,.jpg,.png"
  />
);

export const Invalid = () => (
  <FileUpload
    url="https://jsonplaceholder.typicode.com/albums/1/photos"
    label="Загрузить файл"
    caption="JPG and PNG only"
    invalid
  />
);

export const Disabled = () => (
  <FileUpload
    url="https://jsonplaceholder.typicode.com/albums/1/photos"
    label="Загрузить файл"
    caption="Helper text"
    disabled
  />
);

export const MultiUpload = () => (
  <FileUpload
    url="https://jsonplaceholder.typicode.com/albums/1/photos"
    label="Загрузить файлы"
    caption="Helper text"
    multiple
  />
);

export const FilePreLoaded = () => (
  <FileUpload
    url="https://jsonplaceholder.typicode.com/albums/1/photos"
    label="Загрузить файл"
    caption="Helper text"
    defaultFiles={[{ id: 'test_id', name: 'some_file.jpg' }]}
  />
);

export const MultiFilesPreLoaded = () => (
  <FileUpload
    url="https://jsonplaceholder.typicode.com/albums/1/photos"
    label="Загрузить файлы"
    caption="Helper text"
    multiple
    defaultFiles={[
      { id: 'test_id1', name: 'some_file1.jpg' },
      { id: 'test_id2', name: 'some_file2.jpg' },
    ]}
  />
);

export const WithForm = () => (
  <FormDemo>
    <Field name="fileUpload">
      {({ input }) => (
        <FileUpload
          url="https://jsonplaceholder.typicode.com/albums/1/photos"
          label="Загрузить файл"
          caption="Helper text"
          onChange={input.onChange}
        />
      )}
    </Field>
  </FormDemo>
);
