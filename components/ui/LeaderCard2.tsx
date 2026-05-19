import React from 'react';
import Image from 'next/image';

interface LeaderCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  reverse?: boolean;
}

export default function LeaderCard2({ name, title, bio, image }: LeaderCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#d6eef8',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div
        style={{
          width: '100%',
          height: '200px',
          position: 'relative',
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Text content */}
      <div style={{ padding: '20px 24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 4px 0', color: '#000' }}>
          {name}
        </h3>
        <p style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 10px 0', color: '#555' }}>
          {title}
        </p>
        <p style={{ fontSize: '13px', lineHeight: '1.5', margin: '0', color: '#444' }}>
          {bio}
        </p>
      </div>
    </div>
  );
}