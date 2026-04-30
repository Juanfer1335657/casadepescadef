'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import PurchaseModal from '@/components/PurchaseModal';
import ImageModal from '@/components/ImageModal';

const normalizeCategory = (cat: string | null): string => {
  if (!cat) return '';
  return cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
};

const LABELS: Record<string, string> = {
  'cañas': 'Cañas',
  'reeles': 'Reeles',
  'señuelos': 'Señuelos',
  'anzuelos': 'Anzuelos',
  'lineas': 'Líneas',
  'accesorios': 'Accesorios',
  'cajas': 'Cajas',
  'chalecos': 'Chalecos',
  'otros': 'Otros',
};

const getCategoryLabel = (cat: string): string => {
  const norm = normalizeCategory(cat);
  return LABELS[norm] || cat;
};

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewImageProduct, setViewImageProduct] = useState<Product | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

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

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort((a, b) => getCategoryLabel(a).localeCompare(getCategoryLabel(b)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') return products;
    const selectedNorm = normalizeCategory(selectedCategory);
    return products.filter(p => normalizeCategory(p.category) === selectedNorm);
  }, [products, selectedCategory]);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleViewImage = (product: Product) => {
    setViewImageProduct(product);
    setIsImageModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header showAdminLink />
      
      <main style={{ flex: 1, paddingTop: 'clamp(56px, 14vw, 70px)' }}>
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
          padding: '0 12px 16px',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            marginBottom: '16px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '4px',
          }}>
            <button
              onClick={() => setSelectedCategory('Todos')}
              style={{
                padding: 'clamp(6px, 2vw, 10px) clamp(10px, 3vw, 16px)',
                borderRadius: '20px',
                border: '1px solid',
                fontSize: 'clamp(11px, 2.5vw, 13px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selectedCategory === 'Todos' ? '#0d2b45' : '#ffffff',
                color: selectedCategory === 'Todos' ? '#ffffff' : '#0d2b45',
                borderColor: selectedCategory === 'Todos' ? '#0d2b45' : '#c3c6ce',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                minHeight: '36px',
              }}
            >
              Todos
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: 'clamp(6px, 2vw, 10px) clamp(10px, 3vw, 16px)',
                  borderRadius: '20px',
                  border: '1px solid',
                  fontSize: 'clamp(11px, 2.5vw, 13px)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: selectedCategory === cat ? '#0d2b45' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#0d2b45',
                  borderColor: selectedCategory === cat ? '#0d2b45' : '#c3c6ce',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  minHeight: '36px',
                }}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
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
          ) : filteredProducts.length === 0 || !filteredProducts ? (
            <div style={{ textAlign: 'center', padding: '48px' }}>
              <h2 style={{ marginBottom: '16px' }}>No hay productos en esta categoría</h2>
              <p style={{ color: '#43474d' }}>Pronto tendremos nuevos artículos.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: 'clamp(12px, 2vw, 24px)',
            }}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenModal={handleOpenModal}
                  onViewImage={handleViewImage}
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

      <ImageModal
        product={viewImageProduct}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
}