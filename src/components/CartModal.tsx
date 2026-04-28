'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { COLOMBIA_DEPARTMENTS, validateAddress, formatCOP } from '@/lib/colombia';

export default function CartModal() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice } = useCart();
  const [step, setStep] = useState<'cart' | 'shipping'>('cart');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState<'servientrega' | 'interrapidisimo'>('interrapidisimo');
  const [shippingInfo, setShippingInfo] = useState<{ servientrega: { price: number; days: string }; interrapidisimo: { price: number; days: string } } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep('cart');
      setSelectedDepartment('');
      setSelectedCity('');
      setAddress('');
      setAddressError('');
      setShippingInfo(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedDeptData = COLOMBIA_DEPARTMENTS.find(d => d.id === selectedDepartment);

  const handleCalculateShipping = () => {
    if (!selectedDepartment) {
      alert('Por favor selecciona un departamento');
      return;
    }
    if (!selectedCity) {
      alert('Por favor selecciona una ciudad');
      return;
    }
    if (!address.trim()) {
      setAddressError('Por favor ingresa tu dirección');
      return;
    }
    if (!validateAddress(address)) {
      setAddressError('Formato de dirección inválido. Usa: Cra, Calle, Av, Transversal, Diagonal');
      return;
    }

    const dept = COLOMBIA_DEPARTMENTS.find(d => d.id === selectedDepartment);
    if (dept) {
      setShippingInfo({
        servientrega: { price: dept.shipping.servientrega, days: dept.shipping.days },
        interrapidisimo: { price: dept.shipping.interrapidisimo, days: dept.shipping.days },
      });
    }
  };

  const handleWhatsApp = () => {
    if (!shippingInfo) return;
    
    const carrierName = selectedCarrier === 'servientrega' ? 'Servientrega' : 'Interrapidisimo';
    const carrierData = shippingInfo[selectedCarrier];
    const shippingCost = carrierData.price;
    const total = totalPrice + shippingCost;
    
    const message = `🛒 Nuevo Pedido - La Casa De La Pesca Villavicencio

*Productos:*
${items.map(item => `• ${item.name} x${item.quantity} - ${formatCOP(item.price * item.quantity)}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━
📦 Envío
📍 Dirección: ${address}
🏙️ Ciudad: ${selectedCity}, ${selectedDeptData?.name}
🚚 Transportadora: ${carrierName}
⏱️ Entrega: ${carrierData.days}
━━━━━━━━━━━━━━━━━━━━

💰 Productos: ${formatCOP(totalPrice)}
📬 Envío: ${formatCOP(shippingCost)}
━━━━━━━━━━━━━━━━━━━━
✨ TOTAL: ${formatCOP(total)}

¡Hola! Quiero hacer este pedido. 📱`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/573225908400?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

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
          maxWidth: '480px',
          background: '#ffffff',
          height: '100%',
          overflow: 'auto',
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
            {step === 'cart' ? 'Carrito de Compras' : 'Datos de Envío'}
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
          ) : step === 'cart' ? (
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
                  onClick={() => setStep('shipping')}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#0d2b45',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Calcular Envío
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1c1c18' }}>
                  Departamento *
                </label>
                <select
                  value={selectedDepartment}
                  onChange={e => { setSelectedDepartment(e.target.value); setSelectedCity(''); }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid #c3c6ce',
                    fontSize: '14px',
                  }}
                >
                  <option value="">Selecciona un departamento</option>
                  {COLOMBIA_DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {selectedDeptData && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1c1c18' }}>
                    Ciudad *
                  </label>
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '4px',
                      border: '1px solid #c3c6ce',
                      fontSize: '14px',
                    }}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {selectedDeptData.cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1c1c18' }}>
                  Dirección *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => { setAddress(e.target.value); setAddressError(''); }}
                  placeholder="Cra 12 #34-56"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: `1px solid ${addressError ? '#ba1a1a' : '#c3c6ce'}`,
                    fontSize: '14px',
                  }}
                />
                {addressError && <p style={{ color: '#ba1a1a', fontSize: '12px', marginTop: '4px' }}>{addressError}</p>}
              </div>

              {!shippingInfo && (
                <button
                  onClick={handleCalculateShipping}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#52652a',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '20px',
                  }}
                >
                  Calcular Costo de Envío
                </button>
              )}

              {shippingInfo && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#1c1c18' }}>
                    Selecciona Transportadora
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: selectedCarrier === 'servientrega' ? '#d4eca2' : '#f1eee7',
                    borderRadius: '8px',
                    border: `2px solid ${selectedCarrier === 'servientrega' ? '#52652a' : 'transparent'}`,
                    cursor: 'pointer',
                    marginBottom: '8px',
                  }}>
                    <input
                      type="radio"
                      name="carrier"
                      value="servientrega"
                      checked={selectedCarrier === 'servientrega'}
                      onChange={() => setSelectedCarrier('servientrega')}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#0d2b45' }}>Servientrega</div>
                      <div style={{ fontSize: '12px', color: '#43474d' }}>{shippingInfo.servientrega.days}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#0d2b45' }}>
                      {formatCOP(shippingInfo.servientrega.price)}
                    </div>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: selectedCarrier === 'interrapidisimo' ? '#d4eca2' : '#f1eee7',
                    borderRadius: '8px',
                    border: `2px solid ${selectedCarrier === 'interrapidisimo' ? '#52652a' : 'transparent'}`,
                    cursor: 'pointer',
                    marginBottom: '16px',
                  }}>
                    <input
                      type="radio"
                      name="carrier"
                      value="interrapidisimo"
                      checked={selectedCarrier === 'interrapidisimo'}
                      onChange={() => setSelectedCarrier('interrapidisimo')}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#0d2b45' }}>Interrapidisimo</div>
                      <div style={{ fontSize: '12px', color: '#43474d' }}>{shippingInfo.interrapidisimo.days}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#0d2b45' }}>
                      {formatCOP(shippingInfo.interrapidisimo.price)}
                    </div>
                  </label>
                  
                  <div style={{ background: '#f1eee7', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Productos:</span>
                      <span style={{ fontWeight: 600 }}>{formatCOP(totalPrice)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Envío:</span>
                      <span style={{ fontWeight: 600 }}>{formatCOP(shippingInfo[selectedCarrier].price)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #c3c6ce', paddingTop: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '16px' }}>TOTAL:</span>
                      <span style={{ fontWeight: 700, fontSize: '18px', color: '#52652a' }}>
                        {formatCOP(totalPrice + shippingInfo[selectedCarrier].price)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsApp}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#25D366',
                      color: '#ffffff',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '16px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Comprar por WhatsApp
                  </button>
                </div>
              )}

              <button
                onClick={() => setStep('cart')}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  color: '#43474d',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '14px',
                  border: '1px solid #c3c6ce',
                  cursor: 'pointer',
                }}
              >
                Volver al Carrito
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}