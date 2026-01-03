import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="bg-primary py-20 text-center text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Need a Reliable Home Service Today?
        </h2>
        <p className="mb-8 opacity-90">
          Book trusted professionals in just a few clicks
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a href="tel: +8801403703441" className="btn btn-white">
            Call Now
          </a>
          <Link to={'/services'} className="btn btn-outline btn-white">
            Book Service
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
