import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { error } from './constants.mjs';
import { User } from './user.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

export class File {
  static async csvToJson(filePath) {
    const content = File.getFileContent(filePath);

    const validation = File.isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    return File.parseCSVToJSON(content);
  }

  static getFileContent(filePath) {
    const filename = join(__dirname, filePath);

    return readFileSync(filePath, { encoding: 'utf8' }, (error, data) => {
      if (error) {
        console.log(error);
      }

      return data;
    });
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\n');
    const firstLine = lines.shift().slice(0, -1);
    const headers = firstLine.split(',');

    const users = lines.map((line) => {
      const columns = line.split(',');
      let user = {};

      for (let index in columns) {
        user[headers[index]] = columns[index];
      }

      return new User(user);
    });

    return users;
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split('\n');
    const isHeaderValid = header.trim() === options.fields.join(',').trim();

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }
}
