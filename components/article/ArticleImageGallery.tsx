import type { ArticleImageBlock } from "@/data/chuyenDe80NamAnnd";
import { ArticleImage } from "@/components/article/ArticleImage";
import { ScrollReveal } from "@/components/article/ScrollReveal";

type ArticleImageGalleryProps = {
  images: ArticleImageBlock[];
  lightboxIndexStart?: number;
};

export function ArticleImageGallery({
  images,
  lightboxIndexStart,
}: ArticleImageGalleryProps) {
  const gridClass =
    images.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <ScrollReveal>
      <div className={["my-10 grid gap-4", gridClass].join(" ")}>
        {images.map((image, index) => (
          <ArticleImage
            key={image.src}
            block={image}
            compact
            lightboxIndex={
              lightboxIndexStart === undefined
                ? undefined
                : lightboxIndexStart + index
            }
          />
        ))}
      </div>
    </ScrollReveal>
  );
}
