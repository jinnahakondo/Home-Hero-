const AboutCTA = () => {
  return (
    <section className="py-24 bg-primary text-primary-content">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Have Questions or Need Help?
        </h2>

        <p className="mb-8 text-primary-content max-w-2xl mx-auto">
          Our team is here to assist you. Reach out to us anytime and get the
          support you need to book services with confidence.
        </p>

        <div className="flex justify-center gap-4">
          <a href="/contact" className="btn  px-8">
            Contact Us
          </a>
          <a href="/services" className="btn btn-outline px-8">
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
