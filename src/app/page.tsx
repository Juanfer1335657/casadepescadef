'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import PurchaseModal from '@/components/PurchaseModal';

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        console.error('Error fetching products:', res.status);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header showAdminLink />
      
      <main style={{ flex: 1 }}>
        <section style={{
          background: '#f1eee7',
          padding: 'clamp(24px, 5vw, 48px) 0 clamp(16px, 3vw, 32px)',
          marginBottom: 'clamp(16px, 3vw, 32px)',
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 16px',
            width: '100%',
          }}>
            <h1 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: 'clamp(28px, 6vw, 40px)',
              fontWeight: 700,
              color: '#0d2b45',
              marginBottom: '8px',
            }}>
              CATÁLOGO
            </h1>
            <p style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: '#43474d',
            }}>
              Los mejores artículos de pesca para tu próxima aventura
            </p>
          </div>
        </section>

        <section style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px 48px',
          width: '100%',
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <p>Cargando productos...</p>
            </div>
          ) : products.length === 0 || !products ? (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <h2 style={{ marginBottom: '16px' }}>No hay productos disponibles</h2>
              <p style={{ color: '#43474d' }}>Pronto tendremos nuevos artículos de pesca.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: 'clamp(12px, 2vw, 24px)',
            }}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenModal={handleOpenModal}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer showAdminLink />

      <PurchaseModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}