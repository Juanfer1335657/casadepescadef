'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { COLOMBIA_DEPARTMENTS, validateAddress, formatCOP } from '@/lib/colombia';

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

interface PurchaseModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

export default function PurchaseModal({ product, isOpen, onClose, whatsappNumber = '573225908400' }: PurchaseModalProps) {
  const [step, setStep] = useState<'product' | 'shipping'>('product');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shippingInfo, setShippingInfo] = useState<{ servientrega: { price: number; days: string }; interrapidisimo: { price: number; days: string } } | null>(null);
  const [selectedCarrier, setSelectedCarrier] = useState<'servientrega' | 'interrapidisimo'>('interrapidisimo');

  useEffect(() => {
    if (isOpen) {
      setStep('product');
      setSelectedDepartment('');
      setSelectedCity('');
      setAddress('');
      setAddressError('');
      setShippingInfo(null);
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const images = product.images || [];
  const displayImage = images[currentImageIndex]?.image_url || 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400';
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
    setStep('shipping');
  };

  const handleWhatsApp = () => {
    if (!shippingInfo) return;
    
    const carrierName = selectedCarrier === 'servientrega' ? 'Servientrega' : 'Interrapidisimo';
    const carrierData = shippingInfo?.[selectedCarrier];
    
    const message = `🛒 Nuevo Pedido - La Casa De La Pesca del Llano

*Producto:*
• ${product.name} - ${formatCOP(product.price)}
• Unidades: ${product.units}

━━━━━━━━━━━━━━━━━━━━
📦 Detalles de Envío
📍 Dirección: ${address}
🏙️ Ciudad: ${selectedCity}, ${selectedDeptData?.name}
🚚 Transportadora: ${carrierName}
⏱️ Tiempo: ${carrierData.days}
━━━━━━━━━━━━━━━━━━━━

💰 Producto: ${formatCOP(product.price)}
📬 Envío: ${formatCOP(carrierData.price)}
━━━━━━━━━━━━━━━━━━━━
✨ TOTAL: ${formatCOP(product.price + carrierData.price)}

¡Hola! Quiero hacer este pedido. 📱`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'clamp(8px, 4vw, 20px)',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: 'clamp(12px, 4vw, 16px)',
          maxWidth: '700px',
          width: '100%',
          maxHeight: 'clamp(85vh, 90vw, 90vh)',
          overflow: 'auto',
          animation: 'slideUp 0.3s ease-out',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'clamp(8px, 2vw, 16px)',
            right: 'clamp(8px, 2vw, 16px)',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            width: 'clamp(32px, 8vw, 36px)',
            height: 'clamp(32px, 8vw, 36px)',
            borderRadius: '50%',
            fontSize: 'clamp(16px, 4vw, 20px)',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ padding: 'clamp(16px, 5vw, 32px)' }}>
          <h2 style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: '24px',
            fontWeight: 700,
            color: '#0d2b45',
            marginBottom: '24px',
          }}>
            {step === 'product' ? 'Confirmar Compra' : 'Resumen del Pedido'}
          </h2>

          {step === 'product' ? (
            <>
              <div className="purchase-grid">
                <div>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#f1eee7',
                    marginBottom: '16px',
                  }}>
                    <Image
                      src={displayImage}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                          style={{
                            position: 'absolute',
                            left: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.9)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '18px',
                          }}
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                          style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.9)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '18px',
                          }}
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>
                  
                  {images.length > 1 && (
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                    }}>
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: idx === currentImageIndex ? '#0d2b45' : '#c3c6ce',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#0d2b45',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}>
                    {product.name}
                  </h3>

                  {product.category && (
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#52652a',
                      background: '#d4eca2',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      display: 'inline-block',
                      marginBottom: '12px',
                    }}>
                      {product.category}
                    </span>
                  )}

                  {product.description && (
                    <p style={{
                      fontSize: 'clamp(13px, 3.5vw, 14px)',
                      color: '#43474d',
                      marginBottom: '16px',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}>
                      {product.description}
                    </p>
                  )}

                  <div style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#0d2b45',
                    marginBottom: '8px',
                  }}>
                    {formatCOP(product.price)}
                  </div>

                  {product.units > 0 && (
                    <p style={{
                      fontSize: '14px',
                      color: product.units <= 2 ? '#ba1a1a' : '#52652a',
                      fontWeight: 600,
                      marginBottom: '24px',
                    }}>
                      {product.units} {product.units === 1 ? 'unidad' : 'unidades'} disponible{product.units > 1 ? 's' : ''}
                    </p>
                  )}

                  <div style={{ marginTop: '24px', padding: '20px', background: '#f1eee7', borderRadius: '12px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0d2b45',
                      marginBottom: '16px',
                    }}>
                      📦 Datos de Envío
                    </h4>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Departamento *
                      </label>
                      <select
                        value={selectedDepartment}
                        onChange={e => { setSelectedDepartment(e.target.value); setSelectedCity(''); }}
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #c3c6ce', fontSize: '14px' }}
                      >
                        <option value="">Selecciona</option>
                        {COLOMBIA_DEPARTMENTS.map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>

                    {selectedDeptData && (
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                          Ciudad *
                        </label>
                        <select
                          value={selectedCity}
                          onChange={e => setSelectedCity(e.target.value)}
                          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #c3c6ce', fontSize: '14px' }}
                        >
                          <option value="">Selecciona</option>
                          {selectedDeptData.cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Dirección *
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={e => { setAddress(e.target.value); setAddressError(''); }}
                        placeholder="Cra 12 #34-56"
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', border: `1px solid ${addressError ? '#ba1a1a' : '#c3c6ce'}`, fontSize: '14px' }}
                      />
                      {addressError && <p style={{ color: '#ba1a1a', fontSize: '12px', marginTop: '4px' }}>{addressError}</p>}
                    </div>

                    <button
                      onClick={handleCalculateShipping}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#0d2b45',
                        color: '#ffffff',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '15px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Calcular Envío
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: '24px', padding: '20px', background: '#f1eee7', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0d2b45', marginBottom: '12px' }}>
                  Selecciona Transportadora
                </h4>
                
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px',
                  background: selectedCarrier === 'servientrega' ? '#d4eca2' : '#ffffff',
                  borderRadius: '8px',
                  border: `2px solid ${selectedCarrier === 'servientrega' ? '#52652a' : '#c3c6ce'}`,
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}>
                  <input type="radio" name="carrier" checked={selectedCarrier === 'servientrega'} onChange={() => setSelectedCarrier('servientrega')} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#0d2b45' }}>Servientrega</div>
                    <div style={{ fontSize: '12px', color: '#43474d' }}>{shippingInfo?.servientrega.days}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#0d2b45', fontSize: '16px' }}>
                    {formatCOP(shippingInfo?.servientrega.price || 0)}
                  </div>
                </label>
                
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px',
                  background: selectedCarrier === 'interrapidisimo' ? '#d4eca2' : '#ffffff',
                  borderRadius: '8px',
                  border: `2px solid ${selectedCarrier === 'interrapidisimo' ? '#52652a' : '#c3c6ce'}`,
                  cursor: 'pointer',
                  marginBottom: '20px',
                }}>
                  <input type="radio" name="carrier" checked={selectedCarrier === 'interrapidisimo'} onChange={() => setSelectedCarrier('interrapidisimo')} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#0d2b45' }}>Interrapidisimo</div>
                    <div style={{ fontSize: '12px', color: '#43474d' }}>{shippingInfo?.interrapidisimo.days}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#0d2b45', fontSize: '16px' }}>
                    {formatCOP(shippingInfo?.interrapidisimo.price || 0)}
                  </div>
                </label>

                <div style={{ background: '#ffffff', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#43474d' }}>Producto:</span>
                    <span style={{ fontWeight: 600 }}>{formatCOP(product.price)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#43474d' }}>Envío:</span>
                    <span style={{ fontWeight: 600 }}>{formatCOP(shippingInfo?.[selectedCarrier]?.price || 0)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #c3c6ce', paddingTop: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '16px' }}>TOTAL:</span>
                    <span style={{ fontWeight: 700, fontSize: '18px', color: '#52652a' }}>
                      {formatCOP(product.price + (shippingInfo?.[selectedCarrier]?.price || 0))}
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
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Comprar por WhatsApp
                </button>
              </div>

              <button
                onClick={() => setStep('product')}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  color: '#43474d',
                  borderRadius: '6px',
                  fontWeight: 600,
                  border: '1px solid #c3c6ce',
                  cursor: 'pointer',
                }}
              >
                ← Volver
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}