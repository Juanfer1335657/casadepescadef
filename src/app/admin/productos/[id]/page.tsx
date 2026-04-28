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
  units: number;
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
  const [units, setUnits] = useState('1');
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

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
      if (!res.ok) {
        console.error('Error fetching product:', res.status);
        setLoadingProduct(false);
        return;
      }
      const product: Product = await res.json();
      console.log('Product fetched:', product);
      if (product && product.id) {
        setName(product.name || '');
        setDescription(product.description || '');
        setPrice(product.price ? product.price.toString() : '');
        setCategory(product.category || '');
        setUnits(product.units ? product.units.toString() : '1');
        const imageUrls = product.images?.map ? product.images.map((img: ProductImage) => img.image_url) : [];
        setImages(imageUrls || []);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let uploadedCount = 0;
    
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten archivos de imagen');
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            setImages(prev => [...prev, data.url]);
            uploadedCount++;
          }
        } else {
          const errorData = await res.json();
          console.error('Upload error:', errorData);
          alert(errorData.error || 'Error al subir imagen');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error al subir imagen');
      }
    }

    if (uploadedCount > 0) {
      alert(`Se subiron ${uploadedCount} imagen(es) correctamente`);
    }

    setUploading(false);
    e.target.value = '';
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
        units: parseInt(units) || 1,
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
              LA CASA DE LA PESCA DEL LLANO - ADMIN
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

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '8px',
                color: '#1c1c18',
              }}>
                Unidades Disponibles
              </label>
              <input
                type="number"
                value={units}
                onChange={e => setUnits(e.target.value)}
                className="input-field"
                placeholder="1"
                min="0"
              />
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
              Imágenes del Producto (puedes seleccionar varias)
            </label>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: '#52652a',
                color: '#ffffff',
                borderRadius: '4px',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                {uploading ? 'Subiendo...' : 'Seleccionar imágenes'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  disabled={uploading}
                />
              </label>
              <p style={{ fontSize: '12px', color: '#43474d', marginTop: '8px' }}>
                Formatos: JPG, PNG, WebP. Puedes seleccionar varios archivos a la vez.
              </p>
            </div>

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