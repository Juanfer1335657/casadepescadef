'use client';

import Link from 'next/link';
import Image from 'next/image';
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
        gap: 'clamp(8px, 2vw, 16px)',
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px, 2vw, 12px)',
          textDecoration: 'none',
          flex: 1,
          minWidth: 0,
        }}>
          <div style={{
            position: 'relative',
            width: 'clamp(40px, 10vw, 50px)',
            height: 'clamp(40px, 10vw, 50px)',
            flexShrink: 0,
          }}>
            <Image
              src="/logo-definitivo.png"
              alt="La Casa De La Pesca del Llano"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: 'clamp(11px, 2.5vw, 16px)',
              fontWeight: 700,
              color: '#0d2b45',
              lineHeight: 1.2,
            }}>
              <span style={{ display: 'block' }}>LA CASA DE LA PESCA</span>
              <span style={{ display: 'block', fontSize: 'clamp(9px, 2vw, 13px)' }}>DEL LLANO</span>
            </h1>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)' }}>
          {showAdminLink && (
            <Link href="/admin" style={{
              padding: 'clamp(6px, 1.5vw, 10px) clamp(10px, 2.5vw, 14px)',
              background: '#52652a',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: 'clamp(10px, 2vw, 12px)',
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
              padding: 'clamp(6px, 1.5vw, 10px)',
              cursor: 'pointer',
            }}
            aria-label="Ver carrito"
          >
            <svg width="clamp(20px, 5vw, 24px)" height="clamp(20px, 5vw, 24px)" viewBox="0 0 24 24" fill="none" stroke="#0d2b45" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                background: '#52652a',
                color: '#ffffff',
                borderRadius: '50%',
                width: 'clamp(16px, 4vw, 18px)',
                height: 'clamp(16px, 4vw, 18px)',
                fontSize: 'clamp(9px, 2vw, 11px)',
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