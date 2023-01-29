import { RickAndMortyBRLAdapter } from './business/adapters/rickAndMortyBRLAdapter.mjs';
import { RickAndMortyUSAAdapter } from './business/adapters/rickAndMortyUSAAdapter.mjs';

const data = [RickAndMortyBRLAdapter, RickAndMortyUSAAdapter].map(
  (integration) => integration.getCharacters()
);

const all = await Promise.allSettled(data);

const errors = all.filter(({ status }) => status === 'rejected');

const successes = all
  .filter(({ status }) => status === 'fulfilled')
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), []);

console.table(successes);
// não tenho a url, por isso erros
console.table(errors);
