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
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        border: '3px solid #52652a',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: '#d4eca2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#52652a" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <p style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#0d2b45',
              marginBottom: '4px',
            }}>
              ¡Agregado al carrito!
            </p>
            <p style={{
              fontSize: '16px',
              color: '#43474d',
            }}>
              {lastItem.name}
            </p>
          </div>
        </div>
        <p style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#52652a',
          marginBottom: '20px',
        }}>
          {formatCOP(lastItem.price)}
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              setIsOpen(true);
              setShow(false);
            }}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: '#0d2b45',
              color: '#ffffff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Ir al Carrito
          </button>
          <button
            onClick={() => setShow(false)}
            style={{
              padding: '14px 20px',
              background: '#f1eee7',
              color: '#43474d',
              borderRadius: '8px',
              fontSize: '16px',
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
  );
}