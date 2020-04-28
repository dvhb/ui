import React, { FC, HTMLAttributes, ReactElement, ReactNode } from 'react';
import cn from 'classnames';

import { Spacer } from '../Spacer';
import { Text } from '../Text';
import { Aligner } from '../Aligner';
import { Hint, HintProps } from '../Hint';
import {
  UniversalComponentProps,
  UniversalComponent as TextHelper,
  UniversalComponent as Label,
} from './components/UniversalComponent';
import styles from './styles.module.scss';

type Props = {
  children?: ReactNode;
  className?: string;
};

const Helper: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div className={cn(styles.fieldHelper, className)} {...rest} />;
};

export type FieldProps = {
  children?: ReactNode;
  asLabel?: boolean;
  label?: string;
  labelHint?: string | ReactNode;
  description?: string | ReactNode;
  errorText?: string | ReactNode;
  error?: boolean;
  bottomMargin?: boolean;
  style?: React.CSSProperties;
  value?: any;
  onChange?: (value: any) => void;
  components?: {
    Hint?: (props: HintProps) => ReactElement;
    TextHelper?: (props: UniversalComponentProps & { error?: boolean }) => ReactElement;
    Label?: (props: UniversalComponentProps) => ReactElement;
  };
};

const defaultComponents = {
  Hint,
  TextHelper,
  Label,
};

export const Field = ({
  children,
  asLabel = false,
  label,
  labelHint,
  description,
  error,
  errorText,
  bottomMargin = true,
  components,
  ...rest
}: FieldProps) => {
  const Component = asLabel ? 'label' : 'div';

  const descriptionValue = error ? errorText : description;

  const { Hint, TextHelper, Label } = { ...defaultComponents, ...components };

  return (
    <Component className={styles.field} {...rest}>
      {label && (
        <Label>
          <Spacer margin="xxs">
            <Aligner>
              <Text>{label}</Text>
              {labelHint && (
                <>
                  <Spacer marginRight="xs" />
                  <Hint text={labelHint} />
                </>
              )}
            </Aligner>
          </Spacer>
        </Label>
      )}
      <div className={styles.fieldWrapper}>{children}</div>
      {descriptionValue && (
        <TextHelper error={error} className={styles.textHelper}>
          {typeof descriptionValue === 'string' ? <Text>{descriptionValue}</Text> : <>{descriptionValue}</>}
        </TextHelper>
      )}
      {bottomMargin && <Spacer />}
    </Component>
  );
};

Field.Helper = Helper;
