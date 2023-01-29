import { jest, test, describe, expect, beforeEach } from '@jest/globals';
import axios from 'axios';
import fs from 'fs';
import { RickAndMortyUSA } from '../../src/business/integrations/rickAndMortyUSA.mjs';
import { Character } from '../../src/entities/character.mjs';

describe('#RickAndMortyUSA', () => {
  beforeEach(() => jest.clearAllMocks());

  test('#getCharactersFromXML should returns a list of character entity', async () => {
    const response = fs.readFileSync('./test/mocks/characters.xml');

    const expected = [
      {
        gender: 'Male',
        id: 1,
        location: 'Citadel of Ricks',
        name: 'Rick Sanchez',
        origin: 'Earth (C-137)',
        species: 'Human',
        status: 'Alive',
        type: '',
      },
    ];

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toMatchObject(expected);
  });

  test('#getCharactersFromXML should returns an empty list of character entity if API returns nothing', async () => {
    const response = fs.readFileSync('./test/mocks/characters-empty.xml');

    const expected = [];

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toStrictEqual(expected);
  });
});
