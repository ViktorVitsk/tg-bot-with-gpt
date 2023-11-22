import { unlink } from 'fs/promises';

export async function removeFile(path: string) {
  try {
    await unlink(path);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error while removing ${error.message}`);
    }
  }
}
