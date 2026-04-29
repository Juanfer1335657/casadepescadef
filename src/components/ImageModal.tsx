'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      window.history.pushState({ modal: true }, '', window.location.href);
      const handlePopState = () => {
        onClose();
      };
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [product]);

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vh, 60px) clamp(10px, 5vw, 40px)',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 'clamp(10px, 3vw, 20px)',
          right: 'clamp(10px, 3vw, 20px)',
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          width: 'clamp(32px, 8vw, 40px)',
          height: 'clamp(32px, 8vw, 40px)',
          borderRadius: '50%',
          fontSize: 'clamp(16px, 4vw, 22px)',
          cursor: 'pointer',
          zIndex: 2001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
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
              left: 'clamp(4px, 2vw, 20px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(32px, 8vw, 44px)',
              height: 'clamp(32px, 8vw, 44px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 4vw, 22px)',
              zIndex: 2001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              right: 'clamp(4px, 2vw, 20px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(32px, 8vw, 44px)',
              height: 'clamp(32px, 8vw, 44px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 4vw, 22px)',
              zIndex: 2001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ›
          </button>
        </>
      )}

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxHeight: 'clamp(50vh, 70vw, 75vh)',
          maxWidth: 'clamp(250px, 90vw, 800px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(6px, 2vw, 10px)',
        marginTop: 'clamp(12px, 3vw, 20px)',
        flexWrap: 'wrap',
      }}>
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? 'clamp(16px, 4vw, 20px)' : 'clamp(8px, 2vw, 10px)',
              height: 'clamp(8px, 2vw, 10px)',
              borderRadius: 'clamp(4px, 1vw, 5px)',
              background: idx === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      <div style={{
        color: '#ffffff',
        fontSize: 'clamp(11px, 2.5vw, 14px)',
        fontWeight: 600,
        textAlign: 'center',
        marginTop: 'clamp(8px, 2vw, 12px)',
      }}>
        {product.name}
      </div>
      
      {images.length > 1 && (
        <div style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: 'clamp(10px, 2vw, 12px)',
          marginTop: '4px',
        }}>
          {currentIndex + 1} de {images.length}
        </div>
      )}
    </div>
  );
}