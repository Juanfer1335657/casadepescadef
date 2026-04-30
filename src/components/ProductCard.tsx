'use client';

import Image from 'next/image';
import { useState } from 'react';
import { formatCOP } from '@/lib/colombia';
import { useCart } from '@/context/CartContext';

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

interface ProductCardProps {
  product: Product;
  onOpenModal?: (product: Product) => void;
  onViewImage?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
}

export default function ProductCard({ product, onOpenModal, onViewImage, onEdit, onDelete, isAdmin = false }: ProductCardProps) {
  const { addItem } = useCart();
  const images = product.images || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const displayImage = images[currentImageIndex]?.image_url || images[0]?.image_url || 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: displayImage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '1',
          background: '#f1eee7',
          cursor: 'pointer',
        }}
        onClick={() => onViewImage ? onViewImage(product) : onOpenModal?.(product)}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid #c3c6ce',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                fontSize: '18px',
                fontWeight: 700,
                color: '#0d2b45',
              }}
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid #c3c6ce',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                fontSize: '18px',
                fontWeight: 700,
                color: '#0d2b45',
              }}
            >
              ›
            </button>
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
            }}>
              {images.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: idx === currentImageIndex ? '#0d2b45' : 'rgba(255,255,255,0.6)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: 'clamp(10px, 2vw, 16px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {product.category && (
          <span style={{
            fontSize: 'clamp(9px, 1.5vw, 11px)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#52652a',
            background: '#d4eca2',
            padding: 'clamp(3px, 1vw, 4px) clamp(6px, 1.5vw, 8px)',
            borderRadius: '4px',
            alignSelf: 'flex-start',
            marginBottom: '8px',
          }}>
            {product.category}
          </span>
        )}

        <h3 style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: 'clamp(13px, 2vw, 16px)',
          fontWeight: 700,
          color: '#1c1c18',
          marginBottom: '8px',
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>

        {product.description && (
          <p style={{
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            color: '#43474d',
            marginBottom: '12px',
            flex: 1,
            whiteSpace: 'pre-wrap',
          }}>
            {product.description}
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}>
            <span style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: 'clamp(16px, 3vw, 22px)',
              fontWeight: 700,
              color: '#0d2b45',
            }}>
              {formatCOP(product.price)}
            </span>
          </div>
          
          {product.units > 0 && (
            <div style={{
              fontSize: '12px',
              color: product.units <= 2 ? '#ba1a1a' : '#52652a',
              fontWeight: 600,
              marginBottom: '12px',
            }}>
              {product.units} {product.units === 1 ? 'unidad' : 'unidades'} en stock
            </div>
          )}

          {isAdmin ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onEdit?.(product)}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#0d2b45',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                Editar
              </button>
              <button
                onClick={() => onDelete?.(product.id)}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#ba1a1a',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                Eliminar
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              {onOpenModal && (
                <button
                  onClick={() => onOpenModal(product)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#f1eee7',
                    color: '#0d2b45',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: '1px solid #c3c6ce',
                  }}
                >
                  Ver más
                </button>
              )}
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: added ? '#52652a' : '#0d2b45',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {added ? '¡Agregado!' : 'Agregar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}