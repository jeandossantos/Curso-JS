import axios from 'axios';
import { Character } from '../../entities/character.mjs';

const URL = 'https://rickandmortyapi.com/api/character';

export class RickAndMortyBRL {
  static async getCharactersFromJSON() {
    const { data } = await axios.get(URL);
    const { results = [] } = data;

    return results.map((char) => new Character(char));
  }
}
