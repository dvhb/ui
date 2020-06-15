import React, { createContext, useContext, useState, useMemo } from 'react';

import { Aligner } from '../Aligner';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { Datepicker, DatepickerBirthday, DatepickerPeriod } from '../Datepicker';
import { Field } from '../Field';
import { FileUpload } from '../FileUpload';
import { Row, Col } from '../Grid';
import { Hint } from '../Hint';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { InputWithIcon } from '../InputWithIcon';
import { Link } from '../Link';
import { List } from '../List';
import { Modal } from '../Modal';
import { Popover } from '../Popover';
import { RadioGroup } from '../RadioGroup';
import { Select } from '../Select';
import { Spacer } from '../Spacer';
import { Stepper } from '../Stepper';
import { Text } from '../Text';

const defaultComponents = {
  Aligner,
  Button,
  ButtonGroup,
  Checkbox,
  Datepicker,
  DatepickerPeriod,
  DatepickerBirthday,
  Field,
  FileUpload,
  Row,
  Col,
  Hint,
  Icon,
  Input,
  InputWithIcon,
  Link,
  List,
  Modal,
  Popover,
  RadioGroup,
  Select,
  Spacer,
  Stepper,
  Text,
};

export type ComponentsContextType = {
  [key: string]: any;
};

export const ComponentsContext = createContext<ComponentsContextType>(defaultComponents);

type Props = {
  children: React.ReactNode;
  components?: ComponentsContextType;
};

export const Provider = ({ children, components }: Props) => {
  const [componentsContext, setComponentsContext] = useState(defaultComponents);

  useMemo(() => {
    const merge = {
      ...defaultComponents,
      ...components,
    };
    setComponentsContext(merge);
  }, []);

  return <ComponentsContext.Provider value={componentsContext}>{children}</ComponentsContext.Provider>;
};

export const useComponents = () => useContext(ComponentsContext);
