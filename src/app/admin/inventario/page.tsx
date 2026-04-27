'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

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

export default function InventarioPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const res = await fetch('/api/session');
    const { authenticated } = await res.json();
    if (!authenticated) {
      router.push('/admin');
      return;
    }
    setIsAdmin(true);
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    router.push(`/admin/productos/${product.id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/admin/dashboard" style={{
              padding: '8px 16px',
              color: '#0d2b45',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              ← Volver al Panel
            </Link>
            <Link href="/admin/productos/nuevo" style={{
              padding: '8px 16px',
              background: '#52652a',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              + Nuevo Producto
            </Link>
          </div>
        </div>
      </header>
      
      <main style={{ flex: 1, background: '#f1eee7' }}>
        <section style={{
          background: '#ffffff',
          padding: '48px 0 32px',
          marginBottom: '32px',
          borderBottom: '1px solid #c3c6ce',
        }}>
          <div className="container">
            <h1 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '40px',
              fontWeight: 700,
              color: '#0d2b45',
              marginBottom: '8px',
            }}>
              INVENTARIO
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#43474d',
            }}>
              Gestiona tus productos - Editar y Eliminar
            </p>
          </div>
        </section>

        <section className="container" style={{ paddingBottom: '64px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '64px' }}>
              <p>Cargando productos...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px' }}>
              <h2 style={{ marginBottom: '16px' }}>No hay productos</h2>
              <p style={{ color: '#43474d', marginBottom: '24px' }}>Crea tu primer producto.</p>
              <Link href="/admin/productos/nuevo" className="btn-primary">
                Crear Producto
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer showAdminLink />
    </div>
  );
}