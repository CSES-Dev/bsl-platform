"use client"
import React from 'react';
import PublicLayout from '@/components/layout/PublicLayout';

export default function AboutUs() {
  return (
    <PublicLayout>
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#000000',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* Header Section */}
        <header style={{
          borderBottom: '2px solid #000000',
          paddingBottom: '40px',
          marginBottom: '50px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '700',
            margin: '0 0 15px 0',
            letterSpacing: '-2px',
          }}>
            BIG STRATEGY LABS
          </h1>
          <p style={{
            fontSize: '22px',
            margin: '0',
            opacity: '0.7',
          }}>
            Empowering the next generation of startups
          </p>
        </header>

        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '25px',
            letterSpacing: '-0.5px',
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
            marginBottom: '20px',
          }}>
            We believe in the power of innovation and the entrepreneurs who drive it forward. 
            Our mission is to identify, support, and accelerate startups that are building the future.
          </p>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.8',
          }}>
            Whether you're at the idea stage or scaling rapidly, we provide the resources, 
            mentorship, and network you need to succeed.
          </p>
        </section>

        {/* What We Offer Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '30px',
            letterSpacing: '-0.5px',
          }}>
            What We Offer
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px',
          }}>
            {[
              { title: 'Funding', desc: 'Competitive investment for promising startups' },
              { title: 'Mentorship', desc: 'Guidance from industry experts and successful founders' },
              { title: 'Network', desc: 'Access to investors, partners, and fellow entrepreneurs' },
              { title: 'Resources', desc: 'Tools, workspace, and support to help you grow' }
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: '30px',
                  border: '2px solid #000000',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  margin: '0 0 10px 0',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: '0',
                  opacity: '0.85',
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '30px',
            letterSpacing: '-0.5px',
          }}>
            How It Works
          </h2>
          <div style={{ borderLeft: '3px solid #000000', paddingLeft: '35px' }}>
            {[
              { step: '01', title: 'Apply', desc: 'Submit your startup application through our platform' },
              { step: '02', title: 'Review', desc: 'Our team evaluates your application and potential' },
              { step: '03', title: 'Interview', desc: 'Selected founders meet with our team to discuss their vision' },
              { step: '04', title: 'Launch', desc: 'Accepted startups join our program and begin their journey' }
            ].map((item, index) => (
              <div key={item.step} style={{ marginBottom: index < 3 ? '40px' : '0', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-50px',
                  top: '0',
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700',
                }} />
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: '0 0 10px 0',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  margin: '0',
                  opacity: '0.8',
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

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
    </PublicLayout>
  );
}