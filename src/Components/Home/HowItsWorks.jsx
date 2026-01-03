const HowItWorks = () => {
    const steps = [
        "Select A Service",
        "Book A Date & Time",
        "We Get It Done",
    ];

    return (
        <section className="py-20 bg-base-200 mb-20">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-12">How It Works</h2>

                <ul className="steps steps-vertical md:steps-horizontal">
                    {steps.map((step, i) => (
                        <li key={i} className="step step-primary">
                            {step}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default HowItWorks;
