import { RickAndMortyUSA } from '../integrations/rickAndMortyUSA.mjs';

export class RickAndMortyUSAAdapter {
  static async getCharacters() {
    return await RickAndMortyUSA.getCharactersFromXML();
  }
}
