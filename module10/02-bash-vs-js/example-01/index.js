const { existsSync, mkdirSync, rmSync } = require('fs');
const { setTimeout } = require('timers/promises');
const { execSync } = require('child_process');

const FOLDER_AMOUNT = 4;

const getFileName = (index) => (index >= 3 ? `js-0${index}` : `mjs-${index}`);

const rmFolder = (folderName) => rmSync(folderName, { recursive: true });

const makeDIRAndReturnName = (folderName) => {
  if (existsSync(folderName)) {
    rmFolder(folderName);
  }

  mkdirSync(folderName);

  return folderName;
};

const initializePackage = (folderName) => {
  execSync(`npm init -y --scope @jeandossantos --silent`, {
    cwd: `./${folderName}`,
  });

  return folderName;
};

const printNameAndVersion = (folderName) => {
  const { name, version } = require(`./${folderName}/package.json`);

  console.log({ n: name, v: version });

  return folderName;
};

Array.from(Array(FOLDER_AMOUNT).keys())
  .map((index) => makeDIRAndReturnName(getFileName(index + 1)))
  .map((folderName) => initializePackage(folderName))
  .map((folderName) => printNameAndVersion(folderName))
  .map((folderName) => rmFolder(folderName));
