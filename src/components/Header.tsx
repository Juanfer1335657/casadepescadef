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
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    }}> <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(12px, 3vw, 16px)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'clamp(10px, 2.5vw, 16px)',
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px, 3vw, 20px)',
          textDecoration: 'none',
          flex: 1,
          minWidth: 0,
        }}>
          <div style={{
            position: 'relative',
            width: 'clamp(56px, 14vw, 70px)',
            height: 'clamp(56px, 14vw, 70px)',
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
              fontSize: 'clamp(13px, 3.5vw, 20px)',
              fontWeight: 700,
              color: '#0d2b45',
              lineHeight: 1.2,
            }}> <span style={{ display: 'block' }}>LA CASA DE LA PESCA</span>
              <span style={{ display: 'block', fontSize: 'clamp(11px, 3vw, 16px)' }}>DEL LLANO</span>
            </h1>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 2.5vw, 16px)' }}>
          {showAdminLink && ( <Link href="/admin" style={{
              width: 'clamp(36px, 9vw, 48px)',
              height: 'clamp(36px, 9vw, 48px)',
              background: '#52652a',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: 'clamp(10px, 2.5vw, 13px)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              Admin
            </Link>
          )}
          <button onClick={() => setIsOpen(true)} style={{
            width: 'clamp(36px, 9vw, 48px)',
            height: 'clamp(36px, 9vw, 48px)',
            background: 'none',
            border: '1px solid #c3c6ce',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
            aria-label="Ver carrito"
          >
            <svg width="clamp(20px, 5vw, 26px)" height="clamp(20px, 5vw, 26px)" viewBox="0 0 24 24" fill="none" stroke="#0d2b45" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && ( <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#52652a',
              color: '#ffffff',
              borderRadius: '50%',
              width: 'clamp(16px, 4vw, 20px)',
              height: 'clamp(16px, 4vw, 20px)',
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