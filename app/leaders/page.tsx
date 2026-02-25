import React from 'react';
import PublicLayout from '@/components/layout/PublicLayout';

export default function AboutUs() {
  const team = [
    {
      name: "Sarah Johnson",
      title: "Founder & CEO",
      bio: "Former co-founder of TechVentures. Early investor at Google and Amazon.",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&size=400&background=e5e5e5&color=000&bold=true"
    },
    {
      name: "Michael Chen",
      title: "Investment Director",
      bio: "Lead investor at Sequoia Capital. Former partner at Y Combinator.",
      image: "https://ui-avatars.com/api/?name=Michael+Chen&size=400&background=e5e5e5&color=000&bold=true"
    },
    {
      name: "Emily Rodriguez",
      title: "Head of Programs",
      bio: "Built accelerator programs at Techstars. Former founder of EdTech startup.",
      image: "https://ui-avatars.com/api/?name=Emily+Rodriguez&size=400&background=e5e5e5&color=000&bold=true"
    },
    {
      name: "David Park",
      title: "Technical Advisor",
      bio: "Former CTO at Stripe. Led engineering at Facebook and Airbnb.",
      image: "https://ui-avatars.com/api/?name=David+Park&size=400&background=e5e5e5&color=000&bold=true"
    },
    {
      name: "Alex Thompson",
      title: "Operations Manager",
      bio: "Scaled operations at Uber. Former consultant at McKinsey.",
      image: "https://ui-avatars.com/api/?name=Alex+Thompson&size=400&background=e5e5e5&color=000&bold=true"
    },
    {
      name: "Maria Garcia",
      title: "Venture Partner",
      bio: "15 years in venture capital. Board member at multiple unicorns.",
      image: "https://ui-avatars.com/api/?name=Maria+Garcia&size=400&background=e5e5e5&color=000&bold=true"
    },
    {
      name: "Ryan Mitchell",
      title: "Community Lead",
      bio: "Built communities at Reddit. Former developer relations at GitHub.",
      image: "https://ui-avatars.com/api/?name=Ryan+Mitchell&size=400&background=e5e5e5&color=000&bold=true"
    },
    {
      name: "Sharad Aggarwal",
      title: "VC",
      bio: "Global head of AI Strategy at Google Cloud",
      image: "https://ui-avatars.com/api/?name=Sharad+Aggarwal&size=400&background=e5e5e5&color=000&bold=true"
    }
  ];

  return (
    <PublicLayout>
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '60px 20px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header Section */}
        <header style={{
          textAlign: 'center',
          marginBottom: '70px',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '400',
            margin: '0 0 20px 0',
            letterSpacing: '-1px',
            color: '#000000',
            lineHeight: '1.2',
          }}>
            We are the people who<br />make up BIG STRATEGY LABS
          </h1>
          <p style={{
            fontSize: '18px',
            margin: '0',
            color: '#000000',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6',
          }}>
            Our philosophy is simple: hire great people and give them<br />
            the resources and support to do their best work.
          </p>
        </header>

        {/* Team Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '30px',
        }}>
          {team.map((member) => (
            <div
              key={member.name}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {/* Image */}
              <div style={{
                width: '100%',
                height: '280px',
                backgroundColor: '#e5e5e5',
                overflow: 'hidden',
              }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Content */}
              <div style={{
                padding: '24px',
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  margin: '0 0 4px 0',
                  color: '#000000',
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  margin: '0 0 12px 0',
                  color: '#000000',
                }}>
                  {member.title}
                </p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0',
                  color: '#666666',
                }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
          {/* CTA Section */}
        <section style={{
          borderTop: '2px solid #000000',
          borderBottom: '2px solid #000000',
          padding: '50px 0',
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            margin: '0 0 20px 0',
            letterSpacing: '-1px',
          }}>
            Ready to Build the Future?
          </h2>
          <p style={{
            fontSize: '20px',
            margin: '0 0 30px 0',
            opacity: '0.8',
          }}>
            Join hundreds of successful startups in our program
          </p>
          <a
            href="/apply"
            style={{
              display: 'inline-block',
              padding: '18px 50px',
              backgroundColor: '#000000',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              border: '2px solid #000000',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            Apply Now
          </a>
        </section>

        {/* Contact Section */}
        <section style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '25px',
            letterSpacing: '-0.5px',
          }}>
            Get in Touch
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '25px',
            opacity: '0.8',
          }}>
            Have questions? We'd love to hear from you.
          </p>
          <div style={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <a
              href="mailto:hello@yourcompany.com"
              style={{
                color: '#000000',
                textDecoration: 'none',
                fontSize: '18px',
                borderBottom: '2px solid transparent',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              hello@yourcompany.com
            </a>
            <a
              href="https://twitter.com/yourcompany"
              style={{
                color: '#000000',
                textDecoration: 'none',
                fontSize: '18px',
                borderBottom: '2px solid transparent',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/company/yourcompany"
              style={{
                color: '#000000',
                textDecoration: 'none',
                fontSize: '18px',
                borderBottom: '2px solid transparent',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              LinkedIn
            </a>
          </div>
        </section>
        </div>
      </div>
    </div>
    </PublicLayout>
    
  );
}
