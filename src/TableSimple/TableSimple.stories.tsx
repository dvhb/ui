import React from 'react';
import namor from 'namor';

import { TableSimple } from './TableSimple';

export default {
  title: 'TableSimple',
};

const makeColumnsData = () => {
  return Array(6)
    .fill(null)
    .map((_, index) => {
      return {
        header: namor.generate({ words: 1, saltLength: 0 }),
        accessor: `column${index}`,
      };
    });
};

const makeData = () => {
  return Array(20)
    .fill(null)
    .map(_ => {
      return {
        column0: namor.generate({ words: 4, saltLength: 0, separator: ' ' }),
        column1: namor.generate({ words: 1, saltLength: 0 }),
        column2: namor.generate({ words: 2, saltLength: 0, separator: ' ' }),
        column3: namor.generate({ words: 4, saltLength: 0, separator: ' ' }),
        column4: namor.generate({ words: 4, saltLength: 0, separator: ' ' }),
        column5: namor.generate({ words: 3, saltLength: 0, separator: ' ' }),
      };
    });
};

const columnsData = makeColumnsData();
const data = makeData();

export const Default = () => <TableSimple columns={columnsData} data={data} />;
