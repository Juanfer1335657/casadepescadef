'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  units: number;
  images: ProductImage[];
}

interface ImageModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ product, isOpen, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images || [];
  const displayImage = images[currentIndex]?.image_url || 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=1200';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.95)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 2001,
        }}
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
            }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              zIndex: 2001,
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(prev => (prev + 1) % images.length);
            }}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              zIndex: 2001,
            }}
          >
            ›
          </button>
        </>
      )}

      <div
        style={{
          position: 'relative',
          width: '90vw',
          height: '80vh',
          maxWidth: '900px',
        }}
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
      }}>
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: idx === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 600,
        textAlign: 'center',
      }}>
        {product.name} ({currentIndex + 1} / {images.length})
      </div>
    </div>
  );
}