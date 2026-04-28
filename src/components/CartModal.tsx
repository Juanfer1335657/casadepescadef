'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatCOP } from '@/lib/colombia';

export default function CartModal() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#ffffff',
          height: '100%',
          overflow: 'auto',
          animation: 'slideIn 0.3s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #c3c6ce',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: '24px',
            fontWeight: 700,
            color: '#0d2b45',
            margin: 0,
          }}>
            Carrito de Compras
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#43474d',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ color: '#43474d', marginBottom: '16px' }}>Tu carrito está vacío</p>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '12px 24px',
                  background: '#0d2b45',
                  color: '#ffffff',
                  borderRadius: '4px',
                  fontWeight: 600,
                }}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    background: '#f1eee7',
                    borderRadius: '8px',
                  }}>
                    <div style={{ width: '80px', height: '80px', position: 'relative', flexShrink: 0 }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontFamily: "'Epilogue', sans-serif",
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0d2b45',
                        marginBottom: '4px',
                      }}>
                        {item.name}
                      </h4>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#52652a', marginBottom: '8px' }}>
                        {formatCOP(item.price)}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            border: '1px solid #c3c6ce',
                            background: '#ffffff',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            border: '1px solid #c3c6ce',
                            background: '#ffffff',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{
                            marginLeft: 'auto',
                            background: 'none',
                            border: 'none',
                            color: '#ba1a1a',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '1px solid #c3c6ce',
                paddingTop: '24px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#43474d' }}>Subtotal:</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#0d2b45' }}>
                    {formatCOP(totalPrice)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const message = `🛒 Pedido - La Casa de Pesca\n\n${items.map(item => `• ${item.name} x${item.quantity} - ${formatCOP(item.price * item.quantity)}`).join('\n')}\n\n✨ TOTAL: ${formatCOP(totalPrice)}\n\n¡Hola! Quiero hacer este pedido.`;
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/573015851969?text=${encodedMessage}`, '_blank');
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#25D366',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Comprar por WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}