"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ArticleImageBlock } from "@/data/chuyenDe80NamAnnd";

type LightboxImage = Pick<
  ArticleImageBlock,
  "src" | "width" | "height" | "alt" | "caption"
>;

type ArticleImageLightboxContextValue = {
  images: LightboxImage[];
  open: (index: number) => void;
};

type ArticleImageLightboxProviderProps = {
  children: ReactNode;
  images: LightboxImage[];
};

const CLOSE_TRANSITION_MS = 180;

const ArticleImageLightboxContext =
  createContext<ArticleImageLightboxContextValue | null>(null);

export function useArticleImageLightbox() {
  return useContext(ArticleImageLightboxContext);
}

function getImageCaption(image: LightboxImage) {
  return image.caption?.trim() || image.alt?.trim() || "";
}

function normalizeIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      {direction === "previous" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

export function ArticleImageLightboxProvider({
  children,
  images,
}: ArticleImageLightboxProviderProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const imageCount = images.length;
  const isOpen = activeIndex !== null;

  const clearPendingTransitions = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (openFrameRef.current !== null) {
      window.cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
  }, []);

  const open = useCallback(
    (index: number) => {
      if (imageCount === 0) {
        return;
      }

      clearPendingTransitions();
      setActiveIndex(normalizeIndex(index, imageCount));
      setIsVisible(false);
      openFrameRef.current = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
    },
    [clearPendingTransitions, imageCount],
  );

  const close = useCallback(() => {
    clearPendingTransitions();
    setIsVisible(false);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveIndex(null);
      closeTimerRef.current = null;
    }, CLOSE_TRANSITION_MS);
  }, [clearPendingTransitions]);

  const goToIndex = useCallback(
    (index: number) => {
      if (imageCount === 0) {
        return;
      }

      setActiveIndex(normalizeIndex(index, imageCount));
      setIsVisible(true);
    },
    [imageCount],
  );

  const goToPrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === null || imageCount === 0
        ? currentIndex
        : normalizeIndex(currentIndex - 1, imageCount),
    );
  }, [imageCount]);

  const goToNext = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === null || imageCount === 0
        ? currentIndex
        : normalizeIndex(currentIndex + 1, imageCount),
    );
  }, [imageCount]);

  useEffect(() => {
    return () => {
      clearPendingTransitions();
    };
  }, [clearPendingTransitions]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, goToNext, goToPrevious, isOpen]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  const contextValue = useMemo(
    () => ({
      images,
      open,
    }),
    [images, open],
  );

  const currentImage = activeIndex === null ? null : images[activeIndex];
  const currentCaption = currentImage ? getImageCaption(currentImage) : "";

  return (
    <ArticleImageLightboxContext.Provider value={contextValue}>
      {children}

      {currentImage && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-image-lightbox-title"
          aria-describedby={
            currentCaption ? "article-image-lightbox-caption" : undefined
          }
          className={[
            "fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 px-3 py-4 backdrop-blur-sm transition-opacity duration-200 sm:px-6",
            isVisible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              close();
            }
          }}
        >
          <div
            className={[
              "relative flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-black/50 transition duration-200",
              isVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-2 scale-[0.98] opacity-0",
            ].join(" ")}
          >
            <h2 id="article-image-lightbox-title" className="sr-only">
              Xem ảnh chuyên đề
            </h2>

            <button
              type="button"
              aria-label="Đóng ảnh phóng to"
              onClick={close}
              className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-red-950 shadow-lg shadow-black/25 transition hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
            >
              <CloseIcon />
            </button>

            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/40 px-3 pb-3 pt-16 sm:px-8 sm:pb-5 sm:pt-14">
              {imageCount > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Xem ảnh trước"
                    onClick={goToPrevious}
                    className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-red-950 shadow-lg shadow-black/25 transition hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 sm:left-4"
                  >
                    <ChevronIcon direction="previous" />
                  </button>

                  <button
                    type="button"
                    aria-label="Xem ảnh tiếp theo"
                    onClick={goToNext}
                    className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-red-950 shadow-lg shadow-black/25 transition hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 sm:right-4"
                  >
                    <ChevronIcon direction="next" />
                  </button>
                </>
              ) : null}

              <Image
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt || currentCaption}
                width={currentImage.width}
                height={currentImage.height}
                sizes="(min-width: 1024px) 88vw, 96vw"
                className="max-h-[54dvh] w-auto max-w-full rounded-md object-contain shadow-2xl shadow-black/40 sm:max-h-[62dvh] lg:max-h-[68dvh]"
              />
            </div>

            <div className="shrink-0 border-t border-white/10 bg-zinc-950 px-3 py-3 sm:px-5">
              <div className="flex items-start gap-3">
                <p className="shrink-0 rounded-full border border-yellow-300/30 bg-red-950 px-3 py-1 text-xs font-black text-yellow-200">
                  {activeIndex + 1}/{imageCount}
                </p>
                {currentCaption ? (
                  <p
                    id="article-image-lightbox-caption"
                    className="max-h-20 min-w-0 overflow-y-auto pr-1 text-sm leading-6 text-zinc-100 sm:text-base"
                  >
                    {currentCaption}
                  </p>
                ) : null}
              </div>

              <div
                className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin] [scrollbar-color:rgba(250,204,21,0.7)_rgba(255,255,255,0.12)]"
                aria-label="Danh sách ảnh chuyên đề"
              >
                {images.map((image, index) => {
                  const caption = getImageCaption(image);
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={`${image.src}-${index}`}
                      ref={(element) => {
                        thumbnailRefs.current[index] = element;
                      }}
                      type="button"
                      aria-label={
                        caption
                          ? `Xem ảnh ${index + 1}: ${caption}`
                          : `Xem ảnh ${index + 1}`
                      }
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => goToIndex(index)}
                      className={[
                        "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border bg-white/10 p-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 sm:h-20 sm:w-28",
                        isActive
                          ? "border-yellow-300 shadow-md shadow-yellow-300/20"
                          : "border-white/15 opacity-70 hover:border-yellow-200 hover:opacity-100",
                      ].join(" ")}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || caption}
                        fill
                        sizes="112px"
                        className="object-contain p-1"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </ArticleImageLightboxContext.Provider>
  );
}
