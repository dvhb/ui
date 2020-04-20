import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icon } from '.';
import * as Svg from './components';

const stories = storiesOf('@dvhb/ui`/Icon', module);

const icons = Object.keys(Svg);

stories.add('Release', () => (
  <div style={{ padding: '0px 20px' }}>
    <div className="row">
      {icons.map((icon: any) => (
        <div key={icon} className="col-3">
          <div className="spacer">
            <Icon name={icon} />
            <div>{icon}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
));
