import React from "react";

const features = [
  {
    title: "Category-first reading",
    description:
      "Jump between business, sports, entertainment, science, and more without digging through a noisy mixed feed.",
  },
  {
    title: "Quick scanning, deeper follow-through",
    description:
      "Each story is reduced to a clean card with the source, timestamp, summary, and a direct path to the full article.",
  },
  {
    title: "Graceful fallback experience",
    description:
      "If the live news service is unavailable, DailyNews can still render sample headlines so the interface never feels broken.",
  },
];

function About() {
  return (
    <section className="container about-page">
      <div className="about-hero">
        <p className="page-kicker">About DailyNews</p>
        <h1>Clean categories. Faster scanning. Less noise.</h1>
        <p className="about-hero__copy">
          DailyNews is built for readers who want the important headlines quickly, without an overloaded layout or endless clutter.
          It keeps stories organized, responsive, and easy to browse across every device size.
        </p>
      </div>

      <div className="row g-4 about-grid">
        {features.map((feature, index) => (
          <div className="col-md-6 col-xl-4" key={feature.title}>
            <article className="about-card h-100">
              <span className="about-card__index">0{index + 1}</span>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          </div>
        ))}
      </div>

      <div className="about-note">
        <strong>Built for everyday reading.</strong>
        <p>Use the navigation to move between sections and keep up with the latest headlines in the areas you care about most.</p>
      </div>
    </section>
  );
}

export default About;
