import { useState, useEffect } from 'react';

export const useImagePreloader = (frameCount: number, pathPrefix: string, extension: string = '.webp', startOffset: number = 0, padLength: number = 4) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(0);

    useEffect(() => {
        let isCancelled = false;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            // e.g. /sequence-1/ezgif-frame-011.jpg
            const img = new Image();
            const paddedIndex = (i + startOffset).toString().padStart(padLength, '0');
            img.src = `${pathPrefix}${paddedIndex}${extension}`;
            img.onload = () => {
                if (!isCancelled) {
                    setLoaded((prev) => prev + 1);
                }
            };
            loadedImages.push(img);
        }

        setImages(loadedImages);

        return () => {
            isCancelled = true;
        };
    }, [frameCount, pathPrefix, extension, startOffset, padLength]);

    return { images, progress: frameCount > 0 ? (loaded / frameCount) * 100 : 0, isComplete: loaded === frameCount && frameCount > 0 };
};
