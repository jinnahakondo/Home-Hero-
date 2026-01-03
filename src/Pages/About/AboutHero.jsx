const AboutHero = () => {
  return (
    <section className="pt-40 pb-24 bg-base-100 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          About Our Platform
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Trusted Home Services,
          <span className="text-primary"> Delivered with Care</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base-content/70 text-lg">
          We connect you with verified professionals who provide reliable,
          high-quality home services—on time and with transparent pricing.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
