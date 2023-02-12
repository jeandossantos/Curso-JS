import fs from 'fs';

export async function createLayersIfNotExists({
  mainPath,
  defaultMainFolder,
  layers,
}) {
  const defaultPath = `${mainPath}/${defaultMainFolder}`;

  const foldersToCreate = layers.filter((layer) => !fs.existsSync(layer));

  const results = foldersToCreate.map((folder) =>
    fs.mkdirSync(`${defaultPath}/${folder}`, { recursive: true })
  );

  return Promise.all(results);
}
