import type {
  ArticleBlock,
  ArticleImageBlock,
} from "@/data/chuyenDe80NamAnnd";
import { ArticleBlockRenderer } from "@/components/article/ArticleBlockRenderer";
import { ArticleImageGallery } from "@/components/article/ArticleImageGallery";

type ArticleContentProps = {
  blocks: ArticleBlock[];
  imageIndexStart?: number;
};

type ArticleImageEntry = {
  block: ArticleImageBlock;
  lightboxIndex: number;
};

type GroupedBlock = ArticleBlock | ArticleImageEntry | ArticleImageEntry[];

export function ArticleContent({
  blocks,
  imageIndexStart = 0,
}: ArticleContentProps) {
  const groupedBlocks: GroupedBlock[] = [];
  let nextImageIndex = imageIndexStart;

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];

    if (block.type !== "image") {
      groupedBlocks.push(block);
      continue;
    }

    const images: ArticleImageEntry[] = [
      {
        block,
        lightboxIndex: nextImageIndex,
      },
    ];
    nextImageIndex++;

    while (blocks[index + 1]?.type === "image") {
      images.push({
        block: blocks[index + 1] as ArticleImageBlock,
        lightboxIndex: nextImageIndex,
      });
      nextImageIndex++;
      index++;
    }

    groupedBlocks.push(images.length > 1 ? images : images[0]);
  }

  return (
    <article className="min-w-0 space-y-7">
      {groupedBlocks.map((block, index) =>
        Array.isArray(block) ? (
          <ArticleImageGallery
            key={`image-gallery-${block
              .map((image) => image.block.src)
              .join("-")}`}
            images={block.map((image) => image.block)}
            lightboxIndexStart={block[0]?.lightboxIndex}
          />
        ) : "block" in block ? (
          <ArticleBlockRenderer
            key={`image-${block.block.src}`}
            block={block.block}
            lightboxIndex={block.lightboxIndex}
          />
        ) : (
          <ArticleBlockRenderer
            key={`${block.type}-${"id" in block ? block.id : index}`}
            block={block}
          />
        ),
      )}
    </article>
  );
}
