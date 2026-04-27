'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
  images: ProductImage[];
}

function NuevoProductoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(!!editId);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (editId && isAdmin) {
      fetchProduct();
    }
  }, [editId, isAdmin]);

  const checkAuth = async () => {
    const res = await fetch('/api/session');
    const { authenticated } = await res.json();
    if (!authenticated) {
      router.push('/admin');
      return;
    }
    setIsAdmin(true);
  };

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products?id=${editId}`);
      const product: Product = await res.json();
      if (product) {
        setName(product.name);
        setDescription(product.description || '');
        setPrice(product.price.toString());
        setCategory(product.category || '');
        setImages(product.images?.map(img => img.image_url) || []);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() && isValidImageUrl(newImageUrl.trim())) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    } else {
      alert('Por favor ingresa una URL de imagen válida');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const isValidImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null || url.includes('unsplash') || url.includes('vercel') || url.includes('googleusercontent');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !price.trim()) {
      alert('El nombre y precio son requeridos');
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name: name.trim(),
        description: description.trim(),
        price: parseInt(price),
        category: category.trim(),
        images,
      };

      let res;
      if (editId) {
        res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editId, ...productData }),
        });
      } else {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      }

      if (res.ok) {
        router.push('/admin/inventario');
      } else {
        const data = await res.json();
        alert(data.error || 'Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f1eee7',
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1eee7' }}>
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #c3c6ce',
        padding: '16px 0',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link href="/admin/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#0d2b45',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '18px',
              fontWeight: 700,
              color: '#0d2b45',
            }}>
              LA CASA DE PESCA - ADMIN
            </span>
          </Link>

          <Link href="/admin/inventario" style={{
            padding: '8px 16px',
            color: '#0d2b45',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            ← Volver al Inventario
          </Link>
        </div>
      </header>

      <main className="container" style={{ padding: '48px 24px' }}>
        <h1 style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: '32px',
          fontWeight: 700,
          color: '#0d2b45',
          marginBottom: '32px',
        }}>
          {editId ? 'Editar Producto' : 'Añadir Nuevo Producto'}
        </h1>

        <form onSubmit={handleSubmit} style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          border: '1px solid #c3c6ce',
          maxWidth: '600px',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#1c1c18',
            }}>
              Nombre del Producto *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input-field"
              placeholder="Ej: Caña de Pescar Shimano"
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#1c1c18',
            }}>
              Descripción
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="input-field"
              placeholder="Describe el producto..."
              rows={4}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '8px',
                color: '#1c1c18',
              }}>
                Precio (COP) *
              </label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="input-field"
                placeholder="250000"
                min="0"
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '8px',
                color: '#1c1c18',
              }}>
                Categoría
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="input-field"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Cañas">Cañas</option>
                <option value="Reeles">Reeles</option>
                <option value=" señuelos">Señuelos</option>
                <option value="Anzuelos">Anzuelos</option>
                <option value="Lineas">Líneas</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Cajas">Cajas y Bolsos</option>
                <option value="Chalecos">Chalecos</option>
                <option value="otros">Otros</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#1c1c18',
            }}>
              Imágenes del Producto
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input
                type="url"
                value={newImageUrl}
                onChange={e => setNewImageUrl(e.target.value)}
                className="input-field"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <button
                type="button"
                onClick={handleAddImage}
                style={{
                  padding: '12px 16px',
                  background: '#0d2b45',
                  color: '#ffffff',
                  borderRadius: '4px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                Agregar
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#43474d', marginBottom: '12px' }}>
              Ingresa URLs de imágenes (unsplash, vercel, etc.)
            </p>

            {images.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '12px',
              }}>
                {images.map((img, idx) => (
                  <div key={idx} style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #c3c6ce',
                  }}>
                    <img
                      src={img}
                      alt={`Imagen ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '24px',
                        height: '24px',
                        background: '#ba1a1a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '16px',
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Link
              href="/admin/inventario"
              style={{
                padding: '12px 24px',
                background: '#43474d',
                color: '#ffffff',
                borderRadius: '4px',
                fontWeight: 600,
              }}
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Guardando...' : editId ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function NuevoProductoPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f1eee7',
      }}>
        <p>Cargando...</p>
      </div>
    }>
      <NuevoProductoContent />
    </Suspense>
  );
}