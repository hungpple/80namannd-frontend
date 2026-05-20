"use client";

import Image from "next/image";
import type { ArticleImageBlock } from "@/data/chuyenDe80NamAnnd";
import { useArticleImageLightbox } from "@/components/article/ArticleImageLightbox";

type ArticleImageProps = {
  block: ArticleImageBlock;
  compact?: boolean;
  lightboxIndex?: number;
};

export function ArticleImage({
  block,
  compact = false,
  lightboxIndex,
}: ArticleImageProps) {
  const lightbox = useArticleImageLightbox();
  const canOpenLightbox = lightbox !== null && lightboxIndex !== undefined;
  const captionText = block.caption?.trim();
  const accessibleLabel = captionText || block.alt?.trim();

  function handleOpenLightbox() {
    if (!lightbox || lightboxIndex === undefined) {
      return;
    }

    lightbox.open(lightboxIndex);
  }

  if (compact) {
    return (
      <figure className="min-w-0">
        {canOpenLightbox ? (
          <button
            type="button"
            aria-label={
              accessibleLabel
                ? `Xem ảnh phóng to: ${accessibleLabel}`
                : "Xem ảnh phóng to"
            }
            onClick={handleOpenLightbox}
            className="group relative flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border border-red-100 bg-white p-2 shadow-md shadow-red-950/10 transition hover:border-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
          >
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes="(min-width: 1280px) 280px, (min-width: 768px) 42vw, 100vw"
              className="max-h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
            />
            <ZoomHint />
          </button>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-red-100 bg-white p-2 shadow-md shadow-red-950/10">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes="(min-width: 1280px) 280px, (min-width: 768px) 42vw, 100vw"
              className="max-h-full w-full object-contain"
            />
          </div>
        )}
        {block.caption ? (
          <figcaption className="mt-2 text-center text-xs leading-5 text-zinc-600">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="mx-auto my-10 max-w-[720px]">
      {canOpenLightbox ? (
        <button
          type="button"
          aria-label={
            accessibleLabel
              ? `Xem ảnh phóng to: ${accessibleLabel}`
              : "Xem ảnh phóng to"
          }
          onClick={handleOpenLightbox}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-red-100 bg-white p-2 shadow-lg shadow-red-950/10 transition hover:border-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
        >
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(min-width: 1280px) 720px, (min-width: 768px) 72vw, 100vw"
            className="mx-auto h-auto max-h-[620px] w-auto max-w-full object-contain transition duration-300 group-hover:scale-[1.01]"
          />
          <ZoomHint />
        </button>
      ) : (
        <div className="overflow-hidden rounded-lg border border-red-100 bg-white p-2 shadow-lg shadow-red-950/10">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(min-width: 1280px) 720px, (min-width: 768px) 72vw, 100vw"
            className="mx-auto h-auto max-h-[620px] w-auto max-w-full object-contain"
          />
        </div>
      )}
      {block.caption ? (
        <figcaption className="mx-auto mt-3 max-w-3xl text-center text-sm leading-6 text-zinc-600">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ZoomHint() {
  return (
    <span className="pointer-events-none absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-950/90 text-yellow-200 opacity-0 shadow-lg shadow-black/20 transition group-hover:opacity-100 group-focus-visible:opacity-100">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      >
        <path d="M10.5 18a7.5 7.5 0 1 1 5.3-2.2L21 21" />
        <path d="M10.5 7.5v6M7.5 10.5h6" />
      </svg>
    </span>
  );
}
