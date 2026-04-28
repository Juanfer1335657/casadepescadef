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
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
  const displayImage = primaryImage?.image_url || 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400';

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
    const carrierData = shippingInfo[selectedCarrier];
    
    const message = `🛒 Nuevo Pedido - La Casa De La Pesca del Llano

*Producto:*
• ${product.name} - ${formatCOP(product.price)}

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
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          animation: 'slideUp 0.3s ease-out',
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
            fontSize: '20px',
            fontWeight: 700,
            color: '#0d2b45',
          }}>
            {step === 'product' ? 'Confirmar Compra' : 'Resumen del Pedido'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#43474d',
              padding: '4px',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {step === 'product' && (
            <>
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
              }}>
                <div style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <Image
                    src={displayImage}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}>
                    {product.name}
                  </h3>
                  {product.description && (
                    <p style={{
                      fontSize: '14px',
                      color: '#43474d',
                      marginBottom: '8px',
                    }}>
                      {product.description}
                    </p>
                  )}
                  <span style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0d2b45',
                  }}>
                    {formatCOP(product.price)}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#1c1c18',
                }}>
                  Departamento *
                </label>
                <select
                  value={selectedDepartment}
                  onChange={e => {
                    setSelectedDepartment(e.target.value);
                    setSelectedCity('');
                  }}
                  className="input-field"
                  style={{ padding: '12px' }}
                >
                  <option value="">Selecciona un departamento</option>
                  {COLOMBIA_DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDeptData && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#1c1c18',
                  }}>
                    Ciudad *
                  </label>
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="input-field"
                    style={{ padding: '12px' }}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {selectedDeptData.cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#1c1c18',
                }}>
                  Dirección *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => {
                    setAddress(e.target.value);
                    setAddressError('');
                  }}
                  placeholder="Ej: Cra 15 #45-67, Apto 301"
                  className="input-field"
                  style={{ padding: '12px' }}
                />
                {addressError && (
                  <p style={{ color: '#ba1a1a', fontSize: '12px', marginTop: '4px' }}>
                    {addressError}
                  </p>
                )}
                <p style={{ color: '#43474d', fontSize: '12px', marginTop: '4px' }}>
                  Formatos válidos: Cra, Calle, Av, Transversal, Diagonal
                </p>
              </div>

              <button
                onClick={handleCalculateShipping}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Calcular Envío
              </button>
            </>
          )}

          {step === 'shipping' && shippingInfo && (
            <>
              <div style={{
                background: '#f1eee7',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
              }}>
                <h3 style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: '16px',
                  fontWeight: 700,
                  marginBottom: '16px',
                  color: '#0d2b45',
                }}>
                  Resumen del Pedido
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#43474d' }}>Producto:</span>
                    <span style={{ fontWeight: 600 }}>{product.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#43474d' }}>Precio:</span>
                    <span style={{ fontWeight: 600 }}>{formatCOP(product.price)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#43474d' }}>Envío:</span>
                    <span style={{ fontWeight: 600 }}>{formatCOP(shippingInfo?.[selectedCarrier]?.price || 0)}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    borderTop: '1px solid #c3c6ce',
                    paddingTop: '12px',
                    marginTop: '4px',
                  }}>
                    <span style={{ fontWeight: 700, color: '#0d2b45' }}>TOTAL:</span>
                    <span style={{ 
                      fontWeight: 700, 
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: '18px',
                      color: '#52652a',
                    }}>
                      {formatCOP(product.price + (shippingInfo?.[selectedCarrier]?.price || 0))}
                    </span>
                  </div>
                </div>
              </div>

              {shippingInfo && (
                <div style={{
                  background: '#f1eee7',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '24px',
                }}>
                  <h3 style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: '#0d2b45',
                  }}>
                    Selecciona Transportadora
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      background: selectedCarrier === 'servientrega' ? '#d4eca2' : '#ffffff',
                      borderRadius: '8px',
                      border: '2px solid',
                      borderColor: selectedCarrier === 'servientrega' ? '#52652a' : '#c3c6ce',
                      cursor: 'pointer',
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
                      background: selectedCarrier === 'interrapidisimo' ? '#d4eca2' : '#ffffff',
                      borderRadius: '8px',
                      border: '2px solid',
                      borderColor: selectedCarrier === 'interrapidisimo' ? '#52652a' : '#c3c6ce',
                      cursor: 'pointer',
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
                  </div>
                </div>
              )}

              <div style={{
                background: '#f1eee7',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
              }}>
                <h3 style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: '#0d2b45',
                }}>
                  Información de Envío
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <p><strong>📍 Dirección:</strong> {address}</p>
                  <p><strong>🏙️ Ciudad:</strong> {selectedCity}, {selectedDeptData?.name}</p>
                  <p><strong>🚚 Transportadora:</strong> {selectedCarrier === 'servientrega' ? 'Servientrega' : 'Interrapidisimo'}</p>
                  <p><strong>⏱️ Tiempo de entrega:</strong> {shippingInfo?.[selectedCarrier]?.days}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep('product')}
                  className="btn-primary"
                  style={{ 
                    flex: 1,
                    background: '#43474d',
                  }}
                >
                  Volver
                </button>
                <button
                  onClick={handleWhatsApp}
                  style={{
                    flex: 1,
                    background: '#25D366',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}