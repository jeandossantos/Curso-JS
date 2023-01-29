import { jest, test, describe, expect, beforeEach } from '@jest/globals';
import axios from 'axios';
import fs from 'fs';
import { RickAndMortyBRL } from '../../src/business/integrations/rickAndMortyBRL.mjs';
import { Character } from '../../src/entities/character.mjs';

describe('#RickAndMortyBRL', () => {
  beforeEach(() => jest.clearAllMocks());

  test('#getCharactersFromJSON should returns a list of character entity', async () => {
    const response = JSON.parse(
      fs.readFileSync('./test/mocks/characters.json')
    );
    const expected = response.results.map((char) => new Character(char));

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });
  test('#getCharactersFromJSON should returns an empty list of character entity if API returns nothing', async () => {
    const response = JSON.parse(
      fs.readFileSync('./test/mocks/characters-empty.json')
    );
    const expected = response.results;

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });
});
