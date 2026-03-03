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
    name: "Sharad Aggarwal",
    title: "VC",
    bio: "Global head of AI Strategy at Google Cloud.",
    image: "men.jpg",
  },
];

export default function AboutUs() {
  return (
    <div>
        Header
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
    An invite-only hub for innovation, leadership and strategic growth.
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
    
  );
}
