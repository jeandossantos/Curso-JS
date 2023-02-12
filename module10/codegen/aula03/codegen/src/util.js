export class Util {
  static #transform({ str: [first, ...rest], uppercase = true }) {
    if (!first) return '';

    const firstLetter = uppercase ? first.toUpperCase() : first.toLowerCase();

    return [firstLetter, ...rest].join('');
  }

  static uppercaseFirstLetter(str) {
    return Util.#transform({ str });
  }

  static lowercaseFirstLetter(str) {
    return Util.#transform({ str, uppercase: false });
  }
}
