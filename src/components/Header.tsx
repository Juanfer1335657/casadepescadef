'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  showAdminLink?: boolean;
}

export default function Header({ showAdminLink = false }: HeaderProps) {
  const { setIsOpen, totalItems } = useCart();
  
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #c3c6ce',
      padding: 'clamp(8px, 2vw, 12px) 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(12px, 3vw, 16px)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 2vw, 10px)',
          textDecoration: 'none',
          flex: 1,
          minWidth: 0,
        }}>
          <div style={{
            width: 'clamp(32px, 8vw, 36px)',
            height: 'clamp(32px, 8vw, 36px)',
            background: '#0d2b45',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: 'clamp(12px, 3vw, 18px)',
              fontWeight: 700,
              color: '#0d2b45',
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              LA CASA DE LA PESCA DEL LLANO
            </h1>
            <p style={{
              fontSize: '10px',
              color: '#43474d',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'none',
            }}>
              Artículos de Pesca
            </p>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {showAdminLink && (
            <Link href="/admin" style={{
              padding: '8px 14px',
              background: '#52652a',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              Admin
            </Link>
          )}
          
          <button 
            onClick={() => setIsOpen(true)}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
            }}
            aria-label="Ver carrito"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d2b45" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: '#52652a',
                color: '#ffffff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}