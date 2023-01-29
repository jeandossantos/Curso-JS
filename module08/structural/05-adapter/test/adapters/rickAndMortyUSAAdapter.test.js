import { jest, test, describe, expect, beforeEach } from '@jest/globals';
import { RickAndMortyUSAAdapter } from '../../src/business/adapters/rickAndMortyUSAAdapter.mjs';
import { RickAndMortyUSA } from '../../src/business/integrations/rickAndMortyUSA.mjs';

describe('#RickAndMortyUSAAdapter', () => {
  beforeEach(() => jest.clearAllMocks());

  test('#getCharacters should be an adapter for rickAndMortyUSA.getCharactersFromXML', async () => {
    const usaIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();

    const expected = [];

    expect(result).toEqual(expected);
    expect(usaIntegration).toHaveBeenCalled();
  });
});
