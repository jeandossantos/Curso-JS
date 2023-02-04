#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() });

const { argv } = yargs(hideBin(process.argv))
  .command('createHero', 'create a hero', (builder) => {
    return builder
      .option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'The name of the hero',
        type: 'string',
      })
      .option('age', {
        alias: 'a',
        demandOption: true,
        describe: 'The age of the hero',
        type: 'number',
      })
      .option('power', {
        alias: 'p',
        demandOption: true,
        describe: 'The power  of the hero',
        type: 'string',
      })
      .example('createHero --name Flash --age 55 --power speed')
      .example('createHero --n Batman --a 45 --p rich');
  })
  .epilog('Copyright 2023 | TXTDBR');

console.log(hero(argv));
