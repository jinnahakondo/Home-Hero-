import { FaCheckCircle, FaClock, FaTags } from "react-icons/fa";

const OurValues = () => {
  const values = [
    {
      title: "Verified Professionals",
      desc: "All service providers are carefully verified and reviewed.",
      icon: <FaCheckCircle />,
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden fees. Clear and upfront pricing you can trust.",
      icon: <FaTags />,
    },
    {
      title: "On-Time Service",
      desc: "We respect your time and ensure timely service delivery.",
      icon: <FaClock />,
    },
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-bold mb-4">
          Our Core Values
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto mb-12">
          We are committed to providing reliable, transparent, and high-quality
          services for every customer.
        </p>

        {/* Values */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item, i) => (
            <div
              key={i}
              className="bg-base-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl text-primary mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-base-content/70 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
