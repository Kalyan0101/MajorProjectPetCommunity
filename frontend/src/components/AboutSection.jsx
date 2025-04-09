import React from 'react';

const AboutSection = () => {
  return (
    <section className="max-w-4xl mx-auto mt-20 mb-10 bg-white p-10 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">About Pet Community</h2>
      <p className="text-gray-700 text-lg leading-relaxed text-justify">
        Pet Community is your go-to platform where pet lovers unite! 🐶🐱🐰 Whether you’re a dog parent, a cat cuddler, or a bird enthusiast, this is your space to connect, share moments, seek advice, and build lifelong friendships centered around your furry (or feathery) companions.
      </p>
      <p className="text-gray-600 mt-4 text-base text-justify">
        We aim to create a safe, engaging, and informative environment for pet owners, vets, groomers, and trainers. With features like profile customization, pet portfolios, posts, messaging, and much more — you’re never too far from your next pet story.
      </p>
    </section>
  );
};

export default AboutSection;
