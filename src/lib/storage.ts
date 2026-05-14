// Firebase Storage Service for Image Upload/Delete
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  uploadString 
} from 'firebase/storage'
import { storage } from '@/lib/firebase'

/**
 * Upload an image to Firebase Storage
 * @param file - File object or base64 string
 * @param path - Storage path (e.g., 'products/product-id/image.jpg')
 * @returns Download URL of the uploaded image
 */
export const uploadImage = async (
  file: File | string,
  path: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, path)

    // Handle base64 string
    if (typeof file === 'string') {
      // If it's already a URL (starts with http), return it
      if (file.startsWith('http')) {
        return file
      }
      
      // Upload base64 string
      await uploadString(storageRef, file, 'data_url')
    } else {
      // Upload File object
      await uploadBytes(storageRef, file)
    }

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef)
    console.log('✅ Image uploaded:', downloadURL)
    return downloadURL
  } catch (error: any) {
    console.error('❌ Error uploading image:', error)
    throw new Error(`Failed to upload image: ${error?.message || 'Unknown error'}`)
  }
}

/**
 * Delete an image from Firebase Storage
 * @param imageUrl - Full download URL or storage path
 */
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Skip if it's a base64 string or not a Firebase URL
    if (!imageUrl.includes('firebasestorage.googleapis.com')) {
      console.log('⏭️ Skipping non-Firebase image deletion')
      return
    }

    // Extract path from URL
    const url = new URL(imageUrl)
    const pathMatch = url.pathname.match(/\/o\/(.+)\?/)
    if (!pathMatch) {
      throw new Error('Invalid Firebase Storage URL')
    }

    const path = decodeURIComponent(pathMatch[1])
    const storageRef = ref(storage, path)

    await deleteObject(storageRef)
    console.log('✅ Image deleted:', path)
  } catch (error: any) {
    // Don't throw error if image doesn't exist
    if (error?.code === 'storage/object-not-found') {
      console.log('⚠️ Image not found, skipping deletion')
      return
    }
    console.error('❌ Error deleting image:', error)
    throw new Error(`Failed to delete image: ${error?.message || 'Unknown error'}`)
  }
}

/**
 * Upload multiple images
 * @param files - Array of File objects or base64 strings
 * @param basePath - Base storage path (e.g., 'products/product-id')
 * @returns Array of download URLs
 */
export const uploadMultipleImages = async (
  files: (File | string)[],
  basePath: string
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file, index) => {
      const fileName = typeof file === 'string' 
        ? `image-${index}-${Date.now()}.jpg`
        : file.name
      const path = `${basePath}/${fileName}`
      return uploadImage(file, path)
    })

    const urls = await Promise.all(uploadPromises)
    console.log(`✅ Uploaded ${urls.length} images`)
    return urls
  } catch (error) {
    console.error('❌ Error uploading multiple images:', error)
    throw error
  }
}

/**
 * Delete multiple images
 * @param imageUrls - Array of image URLs to delete
 */
export const deleteMultipleImages = async (imageUrls: string[]): Promise<void> => {
  try {
    const deletePromises = imageUrls.map(url => deleteImage(url))
    await Promise.all(deletePromises)
    console.log(`✅ Deleted ${imageUrls.length} images`)
  } catch (error) {
    console.error('❌ Error deleting multiple images:', error)
    throw error
  }
}

/**
 * Replace product images - delete old ones and upload new ones
 * @param oldImages - Array of old image URLs to delete
 * @param newImages - Array of new images to upload
 * @param productId - Product ID for storage path
 * @returns Array of new download URLs
 */
export const replaceProductImages = async (
  oldImages: string[],
  newImages: (File | string)[],
  productId: string
): Promise<string[]> => {
  try {
    // Delete old images (only Firebase Storage images)
    const firebaseImages = oldImages.filter(url => 
      url.includes('firebasestorage.googleapis.com')
    )
    if (firebaseImages.length > 0) {
      await deleteMultipleImages(firebaseImages)
    }

    // Upload new images
    const basePath = `products/${productId}`
    const newUrls = await uploadMultipleImages(newImages, basePath)

    return newUrls
  } catch (error) {
    console.error('❌ Error replacing product images:', error)
    throw error
  }
}
