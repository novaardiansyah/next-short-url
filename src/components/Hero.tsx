export default function Hero() {
  return (
    <section id="home">
      {/* Hero Content */}
      <div className="h-[60vh] sm:h-[80vh] flex items-center justify-center text-center flex-col px-4 sm:px-36 relative z-10">
        <h1 className="sm:text-[48px] text-[30px] font-bold mb-5">Turn clicks into connections</h1>
        <p className="sm:text-[22px] text-[18px]">
          With our advanced URL shortener and QR codes, you can create smarter pathways to your content. <br className="hidden sm:block" />
          Track, optimize, and engage—effortlessly.
        </p>
      </div>
    </section>
  );
}
