import Image from "next/image";

type ArticleHeroProps = {
  introParagraphs: string[];
};

export function ArticleHero({ introParagraphs }: ArticleHeroProps) {
  return (
    <section
      id="loi-mo-dau"
      className="relative isolate flex min-h-[calc(100dvh-56px)] items-center overflow-hidden bg-red-950 px-4 py-14 text-white sm:px-6 lg:min-h-[calc(100dvh-64px)] lg:px-8 lg:py-16"
    >
      <Image
        src="/images/hero/hero-1.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(69,10,10,0.9),rgba(127,29,29,0.76)_52%,rgba(69,10,10,0.66))]" />
      <div className="absolute inset-0 opacity-20 [background-image:url('/images/trong-dong.svg')] [background-position:right_center] [background-repeat:no-repeat] [background-size:min(92vw,920px)]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-stretch">
        <div className="max-w-3xl bg-red-950/55 px-5 py-6 shadow-2xl shadow-red-950/30 backdrop-blur-sm sm:px-7 lg:ml-auto">
          {/* <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm font-bold text-yellow-100"
          >
            <Link href="/" className="transition hover:text-white">
              Trang chủ
            </Link>
            <span aria-hidden="true" className="text-yellow-300">
              /
            </span>
            <span>Chuyên đề 80 năm ANND</span>
          </nav> */}

          <h1 className="mt-8 font-serif text-4xl font-black italic leading-tight text-yellow-200 md:text-5xl">
            Lời mở đầu
          </h1>
          <div className="mt-5 space-y-4 text-base font-semibold leading-8 text-red-50 md:text-[17px]">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[4419/6250] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md lg:mx-0 lg:h-full lg:max-w-none lg:aspect-auto">
          <Image
            src="/images/chuyen-de-80-nam-annd/cover-img.png"
            alt="Bìa chuyên đề 80 năm An ninh nhân dân"
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 448px, calc(100vw - 32px)"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
