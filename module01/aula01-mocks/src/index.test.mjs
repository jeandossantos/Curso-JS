import { deepStrictEqual, rejects } from 'assert';

import { error } from './src/constants.mjs';
import { File } from './src/file.mjs';

(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);

    const expected = [
      {
        id: 123,
        name: 'Erick Wendel',
        profession: 'Javascript Instructor',
        birthday: 1997,
      },
      {
        id: 321,
        name: 'Xuxa da silva',
        profession: 'Javascript Specialist',
        birthday: 1942,
      },
      {
        id: 231,
        name: 'Joãozinho',
        profession: 'Java Development',
        birthday: 1992,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
