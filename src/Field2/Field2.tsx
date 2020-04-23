import React, { FC, HTMLAttributes, ReactElement, ReactNode } from 'react';
import cn from 'classnames';

import { Spacer } from '../Spacer';
import { Text } from '../Text';
import { PropsUniversalComponent, UniversalComponent as TextHelper } from './components/UniversalComponent';
import styles from './styles.module.scss';

const Helper: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div className={cn(styles.fieldHelper, className)} {...rest} />;
};

export type Field2Props = {
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
    TextHelper?: (props: PropsUniversalComponent & { error?: boolean }) => ReactElement;
  };
};

const defaultComponents = {
  TextHelper,
};

export const Field2 = ({
  children,
  asLabel = false,
  label,
  labelHint,
  description,
  error,
  errorText,
  bottomMargin = false,
  components,
  ...rest
}: Field2Props) => {
  const Component = asLabel ? 'label' : 'div';

  const descriptionValue = error ? errorText : description;

  const { TextHelper } = { ...defaultComponents, ...components };

  return (
    <Component className={styles.field} {...rest}>
      {label && <Text>{label}</Text>}
      <div className={styles.fieldWrapper}>{children}</div>
      {descriptionValue && (
        <TextHelper error={error} className={styles.textHelper}>
          {typeof descriptionValue === 'string' ? (
            <Text type="inherit" color="inherit">
              {descriptionValue}
            </Text>
          ) : (
            <>{descriptionValue}</>
          )}
        </TextHelper>
      )}
      {bottomMargin && <Spacer />}
    </Component>
  );
};

Field2.Helper = Helper;
