import React from 'react';
import Image from 'next/image';

interface LeaderCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  reverse?: boolean;
}

export default function LeaderCard2({ name, title, bio, image, reverse = false }: LeaderCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        alignItems: 'center',
        backgroundColor: '#d6eef8',
        borderRadius: '16px',
        overflow: 'visible',
        position: 'relative',
        minHeight: '180px',
      }}
    >
      {/* Image — overflows card top/bottom */}
      <div
        style={{
          flexShrink: 0,
          width: '200px',
          height: '230px',
          position: 'relative',
          zIndex: 1,
          marginTop: '-24px',
          marginBottom: '-24px',
          marginLeft: reverse ? '20px' : '-10px',
          marginRight: reverse ? '-10px' : '20px',
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{
            objectFit: 'cover',
            borderRadius: '14px',
          }}
        />
      </div>

      {/* Text content */}
      <div style={{ flex: 1, padding: '28px 32px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px 0', color: '#000' }}>
          {name}
        </h3>
        <p style={{ fontSize: '15px', fontWeight: '400', margin: '0 0 12px 0', color: '#333' }}>
          {title}
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0', color: '#333' }}>
          {bio}
        </p>
      </div>
    </div>
  );
}