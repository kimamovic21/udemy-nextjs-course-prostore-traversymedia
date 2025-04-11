'use server';
 
import { UTApi } from 'uploadthing/server';
import { formatError } from '../utils';
 
// Delete images from uploadthing
export async function deleteImages(images: string[] | string) {
  const utapi = new UTApi();
 
  try {
    await utapi.deleteFiles(images);

    return { 
      success: true, 
      message: 'Image(s) deleted successfully',
    };
  } catch (error) {
    return { 
      success: false, 
      message: formatError(error),
    };
  };
};