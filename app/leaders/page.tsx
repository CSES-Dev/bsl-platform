'use client';

import React from 'react';
import LeaderCard2 from '@/components/ui/LeaderCard2';

const team = [
  {
    name: "Sarah Johnson",
    title: "Founder & CEO",
    bio: "Former co-founder of TechVentures. Early investor at Google and Amazon.",
    image: "woman.jpg",
  },
  {
    name: "Michael Chen",
    title: "Investment Director",
    bio: "Lead investor at Sequoia Capital. Former partner at Y Combinator.",
    image: "men.jpg",
  },
  {
    name: "Emily Rodriguez",
    title: "Head of Programs",
    bio: "Built accelerator programs at Techstars. Former founder of EdTech startup.",
    image: "woman.jpg",
  },
  {
    name: "David Park",
    title: "Technical Advisor",
    bio: "Former CTO at Stripe. Led engineering at Facebook and Airbnb.",
    image: "men.jpg",
  },
  {
    name: "Alex Thompson",
    title: "Operations Manager",
    bio: "Scaled operations at Uber. Former consultant at McKinsey.",
    image: "https://ui-avatars.com/api/?name=Alex+Thompson&size=400&background=e5e5e5&color=000&bold=true",
  },
  {
    name: "Maria Garcia",
    title: "Venture Partner",
    bio: "15 years in venture capital. Board member at multiple unicorns.",
    image: "https://ui-avatars.com/api/?name=Maria+Garcia&size=400&background=e5e5e5&color=000&bold=true",
  },
  {
    name: "Ryan Mitchell",
    title: "Community Lead",
    bio: "Built communities at Reddit. Former developer relations at GitHub.",
    image: "https://ui-avatars.com/api/?name=Ryan+Mitchell&size=400&background=e5e5e5&color=000&bold=true",
  },
  {
    name: "Sharad Aggarwal",
    title: "VC",
    bio: "Global head of AI Strategy at Google Cloud.",
    image: "https://ui-avatars.com/api/?name=Sharad+Aggarwal&size=400&background=e5e5e5&color=000&bold=true",
  },
];

export default function Leaders() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '60px 20px',
    }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '70px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '400',
            margin: '0 0 16px 0',
            letterSpacing: '-1px',
            color: '#000',
            lineHeight: '1.2',
          }}>
            We are the people who<br />make up BIG STRATEGY LABS
          </h1>
          <p style={{
            fontSize: '17px',
            color: '#444',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Our philosophy is simple: hire great people and give them the resources and support to do their best work.
          </p>
        </header>

        {/* Team Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '80px' }}>
          {team.map((member, index) => (
            <LeaderCard2
              key={member.name}
              name={member.name}
              title={member.title}
              bio={member.bio}
              image={member.image}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        {/* CTA Section */}
        <section style={{
          borderTop: '2px solid #000',
          borderBottom: '2px solid #000',
          padding: '50px 0',
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
            Ready to Build the Future?
          </h2>
          <p style={{ fontSize: '18px', margin: '0 0 28px 0', color: '#444' }}>
            Join hundreds of successful startups in our program
          </p>
          <a
            href="/apply"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              backgroundColor: '#000',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              border: '2px solid #000',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }}
          >
            Apply Now
          </a>
        </section>

        {/* Contact Section */}
        <section style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px' }}>Get in Touch</h2>
          <p style={{ fontSize: '17px', marginBottom: '20px', color: '#444' }}>Have questions? We'd love to hear from you.</p>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'hello@yourcompany.com', href: 'mailto:hello@yourcompany.com' },
              { label: 'Twitter', href: 'https://twitter.com/yourcompany' },
              { label: 'LinkedIn', href: 'https://linkedin.com/company/yourcompany' },
            ].map((link) => (
              <a key={link.label} href={link.href}
                style={{ color: '#000', textDecoration: 'none', fontSize: '17px', borderBottom: '2px solid transparent', transition: 'border-color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}