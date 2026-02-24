import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";

export default function AboutUs() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">BIG STRATEGY LABS</h1>
        <p className="text-gray-700 leading-relaxed mt-3">
          Empowering the next generation of startups.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We believe in the power of innovation and the entrepreneurs who drive it forward.
            Our mission is to identify, support, and accelerate startups that are building the future.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're at the idea stage or scaling rapidly, we provide the resources,
            mentorship, and network you need to succeed.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {[
              { title: "Funding", desc: "Competitive investment for promising startups" },
              { title: "Mentorship", desc: "Guidance from industry experts and successful founders" },
              { title: "Network", desc: "Access to investors, partners, and fellow entrepreneurs" },
              { title: "Resources", desc: "Tools, workspace, and support to help you grow" },
            ].map((item) => (
              <div key={item.title} className="border border-black p-6">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <div className="border-l-2 border-black pl-8 space-y-8">
            {[
              { step: "01", title: "Apply", desc: "Submit your startup application through our platform" },
              { step: "02", title: "Review", desc: "Our team evaluates your application and potential" },
              { step: "03", title: "Interview", desc: "Selected founders meet with our team to discuss their vision" },
              { step: "04", title: "Launch", desc: "Accepted startups join our program and begin their journey" },
            ].map((item) => (
              <div key={item.step}>
                <h3 className="text-lg font-semibold">{item.step} — {item.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 border-y-2 border-black py-12 text-center">
          <h2 className="text-2xl font-semibold mb-3">Ready to Build the Future?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Join hundreds of successful startups in our program.
          </p>
          <a
            href="/apply"
            className="inline-block px-10 py-4 bg-black text-white font-semibold hover:bg-white hover:text-black border-2 border-black transition-colors"
          >
            Apply Now
          </a>
        </section>

        <section className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed mb-6">Have questions? We'd love to hear from you.</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a href="mailto:hello@yourcompany.com" className="text-black underline-offset-4 hover:underline">
              hello@yourcompany.com
            </a>
            <a href="https://twitter.com/yourcompany" className="text-black underline-offset-4 hover:underline">
              Twitter
            </a>
            <a href="https://linkedin.com/company/yourcompany" className="text-black underline-offset-4 hover:underline">
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}