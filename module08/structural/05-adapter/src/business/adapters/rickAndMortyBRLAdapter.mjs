import { RickAndMortyBRL } from '../integrations/rickAndMortyBRL.mjs';

export class RickAndMortyBRLAdapter {
  static async getCharacters() {
    return await RickAndMortyBRL.getCharactersFromJSON();
  }
}
