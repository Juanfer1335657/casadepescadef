'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { formatCOP } from '@/lib/colombia';

export default function CartNotification() {
  const { items, setIsOpen } = useCart();
  const [show, setShow] = useState(false);
  const [lastItem, setLastItem] = useState<{ name: string; price: number } | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      const lastItemAdded = items[items.length - 1];
      setLastItem({ name: lastItemAdded.name, price: lastItemAdded.price });
      setShow(true);
      
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [items.length]);

  if (!show || !lastItem) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1001,
      animation: 'slideUp 0.3s ease-out',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        border: '2px solid #52652a',
        maxWidth: '320px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#d4eca2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52652a" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#0d2b45',
              marginBottom: '4px',
            }}>
              ¡Producto agregado!
            </p>
            <p style={{
              fontSize: '13px',
              color: '#43474d',
              marginBottom: '12px',
            }}>
              {lastItem.name} - {formatCOP(lastItem.price)}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setShow(false);
                }}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  background: '#0d2b45',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Ver Carrito
              </button>
              <button
                onClick={() => setShow(false)}
                style={{
                  padding: '10px 12px',
                  background: '#f1eee7',
                  color: '#43474d',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}