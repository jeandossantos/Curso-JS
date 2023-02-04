const [nodePath, filePath, ...commands] = process.argv;

function parseArguments(commands) {
  const cm = new Map();

  const commandPrefix = '--';

  for (const key in commands) {
    const index = parseInt(key);

    if (!commands[index].includes(commandPrefix)) continue;

    const command = commands[index].replace(commandPrefix, '');

    cm.set(command, commands[index + 1]);
  }

  return Object.fromEntries(cm);
}

console.log(parseArguments(commands));
