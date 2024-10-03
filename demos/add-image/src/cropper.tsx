"use client";
import "react-image-crop/dist/ReactCrop.css";
// import Image from "next/image";

import { useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface CropImageDialogProps {
  selectedImage: string;
}

export function CropImageDialog({ selectedImage }: CropImageDialogProps) {
  // const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  // const blobUrlRef = useRef("");

  const [crop, setCrop] = useState<Crop>();
  const [, setCompletedCrop] = useState<PixelCrop>();
  const [scale] = useState(1);
  const [rotate] = useState(0);
  const [aspect] = useState<number | undefined>(16 / 9);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  return (
    <ReactCrop
      crop={crop}
      onChange={(_, percentCrop) => setCrop(percentCrop)}
      onComplete={(c) => setCompletedCrop(c)}
      aspect={aspect}
      // minWidth={400}
      minHeight={100}
      // circularCrop
    >
      <img
        ref={imgRef}
        alt='Crop me'
        src={selectedImage}
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
        }}
        onLoad={onImageLoad}
      />
    </ReactCrop>
  );
}
