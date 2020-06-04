import React, { ReactElement } from 'react';
import axios, { AxiosResponse } from 'axios';
import cn from 'classnames';
import Dropzone, { DropzoneProps, FileWithPath } from 'react-dropzone';

import {
  UniversalComponent as DropzoneArea,
  UniversalComponent as Caption,
  UniversalComponent as Label,
  UniversalComponent as ProgressBarWrapper,
  UniversalComponent as Filler,
  UniversalComponent as RemoveIconWrapper,
} from '../UniversalComponent';
import { Aligner, Icon, Spacer } from '..';
import { ProgressBar } from './ProgressBar';
import * as Icons from './icons';
import styles from './styles.module.scss';

const defaultComponents = { DropzoneArea, Caption, Label, ProgressBarWrapper, Filler, RemoveIconWrapper };

interface FileWithPercentage extends FileWithPath {
  percentage: number;
  error?: string;
  id?: string;
}

interface FileDefault {
  id: string;
  name: string;
}

export interface FileUploadProps extends DropzoneProps {
  url: string;
  requestHeaders?: any;
  name?: string;
  label?: string;
  caption?: string;
  multiple?: boolean;
  invalid?: boolean;
  fileIdProp?: string;
  defaultFiles?: FileDefault[];
  onChange?: (files: FileWithPercentage[]) => void;
  components?: {
    DropzoneArea?: (props: any) => ReactElement;
    Caption?: (props: any) => ReactElement;
    Label?: (props: any) => ReactElement;
    ProgressBarWrapper?: (props: any) => ReactElement;
    Filler?: (props: any) => ReactElement;
    RemoveIconWrapper?: (props: any) => ReactElement;
  };
}

interface State {
  files: FileWithPercentage[];
  defaultFiles: FileDefault[]; // default files can only be removed
}

export class FileUpload extends React.Component<FileUploadProps, State> {
  static defaultProps = {
    onChange: () => {},
    multiple: false,
    defaultFiles: [],
  };

  state: State = {
    files: [],
    defaultFiles: this.props.defaultFiles || [],
  };

  handleChange = (files: FileWithPercentage[]) => {
    this.setState({ files });
    const { defaultFiles } = this.state;

    const uploadingComplete = files.every((file: FileWithPercentage) => Boolean(file.id));

    if (this.props.onChange && uploadingComplete) {
      if (files.length === 0 && defaultFiles.length === 0) {
        this.props.onChange([]);
      } else if (files.length === 0 && defaultFiles.length !== 0) {
        this.props.onChange(defaultFiles.map((file: any) => file.id));
      } else {
        const defaultFilesIds = defaultFiles.map((file: any) => file.id);
        const filesIds = files.filter(file => file.id).map((file: any) => file.id);
        this.props.onChange([...defaultFilesIds, ...filesIds]);
      }
    }
  };

  handleDefaultFileRemove = (defaultFiles: FileDefault[]) => {
    this.setState({ defaultFiles });
    const { files } = this.state;

    if (this.props.onChange) {
      if (files.length === 0 && defaultFiles.length === 0) {
        this.props.onChange([]);
      } else if (files.length === 0 && defaultFiles.length !== 0) {
        this.props.onChange(defaultFiles.map((file: any) => file.id));
      } else {
        const defaultFilesIds = defaultFiles.map((file: any) => file.id);
        const filesIds = files.filter(file => file.id).map((file: any) => file.id);
        this.props.onChange([...defaultFilesIds, ...filesIds]);
      }
    }
  };

  handleDrop = (acceptedFiles: FileWithPath[]) => {
    const files: FileWithPercentage[] = acceptedFiles.map(acceptedFile => ({
      lastModified: acceptedFile.lastModified,
      size: acceptedFile.size,
      type: acceptedFile.type,
      slice: acceptedFile.slice,
      name: acceptedFile.name,
      percentage: 0,
    }));

    if (this.props.multiple) {
      this.handleChange([...this.state.files, ...files]);
    } else {
      this.handleChange(files);
      this.handleDefaultFileRemove([]);
    }

    acceptedFiles.forEach(async file => {
      const formData: FormData = new FormData();
      formData.append('file', file);

      try {
        const response: AxiosResponse = await axios.post(this.props.url, formData, {
          headers: { ...this.props.requestHeaders, 'Content-Type': 'multipart/form-data' },
          onUploadProgress: event => {
            const files = [...this.state.files];
            const fileIndex = files.findIndex(
              acceptedFile => acceptedFile.name === file.name && acceptedFile.lastModified === file.lastModified,
            );
            files[fileIndex] = { ...files[fileIndex], percentage: (event.loaded / event.total) * 100 };
            this.handleChange(files);
          },
        });
        const files = [...this.state.files];
        const fileIndex = files.findIndex(
          (acceptedFile: any) => acceptedFile.name === file.name && acceptedFile.lastModified === file.lastModified,
        );

        const { fileIdProp } = this.props;
        files[fileIndex] = {
          ...files[fileIndex],
          id: fileIdProp ? response.data[fileIdProp] : response.data.file_id || response.data.filename,
        };

        this.handleChange(files);
      } catch (error) {
        const files = [...this.state.files];
        const fileIndex = files.findIndex(
          acceptedFile => acceptedFile.name === file.name && acceptedFile.lastModified === file.lastModified,
        );
        files[fileIndex] = { ...files[fileIndex], error: error.message };

        this.handleChange(files);
      }
    });
  };

  handleRemove = (file: FileWithPercentage) => () => {
    const files = [...this.state.files];
    const fileIndex = files.findIndex(
      acceptedFile => acceptedFile.name === file.name && acceptedFile.lastModified === file.lastModified,
    );
    files.splice(fileIndex, 1);

    this.handleChange(files);
  };

  handleRemoveDefaultFile = (file: FileDefault) => () => {
    const defaultFiles = [...this.props.defaultFiles!];
    const index = defaultFiles.findIndex(defaultFile => defaultFile.id === file.id);
    defaultFiles.splice(index, 1);

    this.handleDefaultFileRemove(defaultFiles);
  };

  render() {
    const { label, caption, invalid, components, ...props } = this.props;
    const { files, defaultFiles } = this.state;

    const { DropzoneArea, Caption, Label, ProgressBarWrapper, Filler, RemoveIconWrapper } = {
      ...defaultComponents,
      ...components,
    };

    return (
      <Aligner valign="top">
        <Dropzone onDrop={this.handleDrop} {...props}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <DropzoneArea
                {...getRootProps()}
                className={cn(
                  styles.dropzone,
                  invalid && styles.dropzone_invalid,
                  props.disabled && styles.dropzone_disabled,
                )}
              >
                <input {...getInputProps()} />
                <Icon svgs={Icons} name="IconPlus" />
              </DropzoneArea>
            </section>
          )}
        </Dropzone>
        <Spacer marginRight="default" />
        <div className={styles.infoArea}>
          <Label className={cn(styles.label, invalid && styles.label_invalid)}>{label}</Label>
          {defaultFiles.length === 0 && files.length === 0 && <Caption className={styles.caption}>{caption}</Caption>}
          {defaultFiles!.map((file: FileDefault) => (
            <React.Fragment key={file.id}>
              <Aligner valign="center">
                <Aligner.Left>
                  <span className={styles.fileName}>{file.name}</span>
                </Aligner.Left>
                <Aligner.Right>
                  <RemoveIconWrapper onClick={this.handleRemoveDefaultFile(file)} className={styles.iconTrash}>
                    <Icon svgs={Icons} name="IconTrash" size="inherit" />
                  </RemoveIconWrapper>
                </Aligner.Right>
              </Aligner>
              <ProgressBar percentage={100} components={{ ProgressBarWrapper, Filler }} />
            </React.Fragment>
          ))}
          {files.map((file: FileWithPercentage) => (
            <React.Fragment key={`${file.name}-${file.lastModified}`}>
              <Aligner valign="center">
                <Aligner.Left>
                  <span className={styles.fileName}>{file.name}</span>
                </Aligner.Left>
                <Aligner.Right>
                  <RemoveIconWrapper onClick={this.handleRemove(file)} className={styles.iconTrash}>
                    <Icon svgs={Icons} name="IconTrash" size="inherit" />
                  </RemoveIconWrapper>
                </Aligner.Right>
              </Aligner>
              <ProgressBar
                percentage={file.percentage}
                error={file.error}
                components={{ ProgressBarWrapper, Filler }}
              />
              {file.error && <span className={styles.error}>{file.error}</span>}
            </React.Fragment>
          ))}
        </div>
      </Aligner>
    );
  }
}
