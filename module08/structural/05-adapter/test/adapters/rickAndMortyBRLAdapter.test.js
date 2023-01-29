import { jest, test, describe, expect, beforeEach } from '@jest/globals';
import { RickAndMortyBRLAdapter } from '../../src/business/adapters/rickAndMortyBRLAdapter.mjs';
import { RickAndMortyBRL } from '../../src/business/integrations/rickAndMortyBRL.mjs';

describe('#RickAndMortyBRLAdapter', () => {
  beforeEach(() => jest.clearAllMocks());

  test('#getCharacters should be an adapter for rickAndMortyBRL.getCharactersFromJSON', async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();

    const expected = [];

    expect(result).toEqual(expected);
    expect(brlIntegration).toHaveBeenCalled();
  });
});
