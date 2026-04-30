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
      bottom: 'clamp(12px, 4vw, 24px)',
      right: 'clamp(12px, 4vw, 24px)',
      left: 'clamp(12px, 4vw, 24px)',
      zIndex: 1001,
      animation: 'slideUp 0.3s ease- out',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: 'clamp(16px, 4vw, 24px)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        border: '3px solid #52652a',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 16px)', marginBottom: 'clamp(12px, 3vw, 16px)' }}>
          <div style={{
            width: 'clamp(44px, 11vw, 56px)',
            height: 'clamp(44px, 11vw, 56px)',
            background: '#d4eca2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="clamp(22px, 5.5vw, 28px)" height="clamp(22px, 5.5vw, 28px)" viewBox="0 0 24 24" fill="none" stroke="#52652a" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontFamily: "'Epilogue', sans- serif",
              fontSize: 'clamp(15px, 4vw, 20px)',
              fontWeight: 700,
              color: '#0d2b45',
              marginBottom: '4px',
              textAlign: 'center',
            }}>
              ¡Agregado al carrito!
            </p>
            <p style={{
              fontSize: 'clamp(13px, 3.5vw, 16px)',
              color: '#43474d',
              wordBreak: 'break-word',
              textAlign: 'center',
              overflowWrap: 'break-word',
            }}>
              {lastItem.name}
            </p>
          </div>
        </div>
        <p style={{
          fontSize: 'clamp(15px, 4vw, 18px)',
          fontWeight: 700,
          color: '#52652a',
          marginBottom: 'clamp(14px, 4vw, 20px)',
          textAlign: 'center',
        }}>
          {formatCOP(lastItem.price)}
        </p>
        <div style={{ display: 'flex', gap: 'clamp(8px, 2.5vw, 12px)', textAlign: 'center', justifyContent: 'center' }}>
          <button
            onClick={() => {
              setIsOpen(true);
              setShow(false);
            }}
            style={{
              flex: 1,
              padding: 'clamp(12px, 3.5vw, 14px) clamp(14px, 4vw, 20px)',
              background: '#0d2b45',
              color: '#ffffff',
              borderRadius: '8px',
              fontSize: 'clamp(13px, 3.5vw, 16px)',
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
              padding: 'clamp(12px, 3.5vw, 14px) clamp(14px, 4vw, 20px)',
              background: '#f1eee7',
              color: '#43474d',
              borderRadius: '8px',
              fontSize: 'clamp(13px, 3.5vw, 16px)',
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