import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Respect reduced motion: show the full line at once.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed: text.slice(0, count), done: count >= text.length };
}

// Mouse cursor tracking that smoothly updates video frame to follow the pointer
export function useMouseScrub() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isSeeking = false;

    const performSeek = () => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      if (!isSeeking && Math.abs(video.currentTime - targetTime.current) > 0.02) {
        isSeeking = true;
        video.currentTime = targetTime.current;
      }
    };

    const onSeeked = () => {
      isSeeking = false;
      if (Math.abs(video.currentTime - targetTime.current) > 0.02) {
        performSeek();
      }
    };

    const onLoadedMetadata = () => {
      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        // Set initial frame to center (facing user)
        targetTime.current = video.duration * 0.5;
        performSeek();
      }
    };

    const updateFromClientX = (clientX: number) => {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      const ratio = Math.max(0, Math.min(1, clientX / window.innerWidth));
      targetTime.current = ratio * video.duration;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          performSeek();
          rafId.current = null;
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      updateFromClientX(e.clientX);
    };

    const onPointerMove = (e: PointerEvent) => {
      updateFromClientX(e.clientX);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // In case metadata is already loaded
    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointermove", onPointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return videoRef;
}

