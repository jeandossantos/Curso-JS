import fs from 'fs';

export async function createLayersIfNotExists({
  mainPath,
  defaultMainPath: defaultMainFolder,
  layers,
}) {
  const defaultPath = `${mainPath}/${defaultMainFolder}`;

  const foldersToCreate = layers.filter((layer) => !fs.existsSync(layer));

  const results = foldersToCreate.map((folder) =>
    fs.mkdir(`${defaultPath}/${folder}`, { recursive: true })
  );

  return Promise.all(results);
}
