import timers from 'timers/promises';
const setTimeoutAsync = timers.setTimeout;

// const result = ['1', '2'].map(async (item) => {
//   console.log('starting process...');
//   await setTimeoutAsync(100);
//   console.log(item);
//   console.log(await Promise.resolve('timeout order!'));
//   await setTimeoutAsync(100);
//   console.count('debug');

//   return item * 2;
// });

// console.log('result', await Promise.all(result));

setTimeout(async () => {
  console.log('starting process...');
  await setTimeoutAsync(100);
  console.count('debug');
  console.log(await Promise.resolve('timeout order!'));
  await setTimeoutAsync(100);
  console.count('debug');

  await Promise.reject('promise rejected on setTimeout');
}, 1000);

const throwError = (msg) => {
  throw new Error(msg);
};

try {
  console.log('Hello');
  console.log('world');

  throwError('error dentro do try/catch');
} catch (error) {
  console.log('Pego no catch', error.message);
} finally {
  console.log('Executado depois de tudo!');
}

process.on('unhandledRejection', (err) => {
  console.log('[unhandledRejection]', err.message || err);
});

process.on('uncaughtException', (err) => {
  console.log('[uncaughtException]', err.message || err);
});

//cai no unhandledRejection
setTimeout(async () => {
  await Promise.reject('Promise on setTimeout rejected!!!');
});

//cai no uncaughtException
await Promise.reject('Promise async/await rejected!!!');
