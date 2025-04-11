// cropImage.js
export default function getCroppedImg(imageSrc, pixelCrop, outputDimensions) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      // Sometimes, if the image is loaded from a different origin, setting crossOrigin may help:
      image.crossOrigin = 'anonymous';
      image.src = imageSrc;
      image.onload = () => {
        // Use provided outputDimensions or default to the pixelCrop's natural dimensions.
        const outputWidth = outputDimensions?.width || pixelCrop.width;
        const outputHeight = outputDimensions?.height || pixelCrop.height;
  
        const canvas = document.createElement('canvas');
        canvas.width = outputWidth;
        canvas.height = outputHeight;
        const ctx = canvas.getContext('2d');
  
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          outputWidth,
          outputHeight
        );
  
        canvas.toBlob((blob) => {
          if (!blob) {
            return reject(new Error('Canvas is empty'));
          }
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        }, 'image/jpeg');
      };
  
      image.onerror = () => reject(new Error('Failed to load image'));
    });
  }
  