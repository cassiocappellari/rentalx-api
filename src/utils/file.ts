import fs from "fs";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  await fs.promises.unlink(filename);
};
