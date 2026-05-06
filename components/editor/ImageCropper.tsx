import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useCVStore } from '@/store/useCVStore';

export default function ImageCropper({ onComplete }: { onComplete: () => void }) {
  const { profileImage, setField } = useCVStore();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_area: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const generateCroppedImage = async () => {
    try {
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = profileImage;
      await new Promise((res) => (image.onload = res));

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        croppedAreaPixels.x, croppedAreaPixels.y,
        croppedAreaPixels.width, croppedAreaPixels.height,
        0, 0,
        croppedAreaPixels.width, croppedAreaPixels.height
      );

      setField('croppedImage', canvas.toDataURL('image/jpeg'));
      onComplete();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md h-96 bg-white rounded-2xl overflow-hidden">
        <Cropper
          image={profileImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="mt-6 w-full max-w-md space-y-4">
        <input 
          type="range" value={zoom} min={1} max={3} step={0.1}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <button 
          onClick={generateCroppedImage}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold"
        >
          Save Profile Picture
        </button>
      </div>
    </div>
  );
}