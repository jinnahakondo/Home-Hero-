import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="bg-linear-to-r from-primary to-secondary py-20 text-center text-white dark:bg-none dark:bg-neutral/30">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Need a Reliable Home Service Today?
        </h2>
        <p className="mb-8 text-white/90">
          Book trusted professionals in just a few clicks
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="tel:+8801403703441"
            className="btn bg-white text-primary hover:bg-white/90 border-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
          >
            Call Now
          </a>
          <Link
            to={"/services"}
            className="btn btn-outline border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-200"
          >
            Book Service
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
