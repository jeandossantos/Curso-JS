import { spawn } from 'child_process';

const pythonFile = 'index.py';
const pythonCommand = 'python3';

async function requestPython({ url, headers, filepath }) {
  const py = spawn(pythonCommand, [
    pythonFile,
    JSON.stringify({ url, headers, filepath }),
  ]);

  const dataString = [];

  for await (const data of py.stdout) {
    dataString.push(data);
  }

  return dataString.join('');
}

const result = await requestPython({
  url: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
  filepath: './my-data.csv',
});

console.log('result', result);
