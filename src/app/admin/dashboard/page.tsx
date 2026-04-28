'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Stats {
  totalProducts: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ totalProducts: 0 });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const res = await fetch('/api/session');
    const { authenticated } = await res.json();
    if (!authenticated) {
      router.push('/admin');
      return;
    }
    
    try {
      const resProducts = await fetch('/api/products');
      const products = await resProducts.json();
      setStats({ totalProducts: products.length });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth?action=logout', { method: 'POST' });
    router.push('/admin');
  };

  if (loading) {
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
          <Link href="/" style={{
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

          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#ba1a1a',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Cerrar Sesión
          </button>
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
          Panel de Administración
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #c3c6ce',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: '#d4eca2',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#52652a" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              color: '#43474d',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}>
              Total Productos
            </h3>
            <p style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: '36px',
              fontWeight: 700,
              color: '#0d2b45',
            }}>
              {stats.totalProducts}
            </p>
          </div>
        </div>

        <h2 style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: '20px',
          fontWeight: 700,
          color: '#0d2b45',
          marginBottom: '24px',
        }}>
          Gestión de Productos
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          <Link href="/admin/inventario" style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #c3c6ce',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#0d2b45',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#0d2b45',
                marginBottom: '4px',
              }}>
                Inventario
              </h3>
              <p style={{ color: '#43474d', fontSize: '14px' }}>
                Ver, editar y eliminar productos
              </p>
            </div>
          </Link>

          <Link href="/admin/productos/nuevo" style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #c3c6ce',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#52652a',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#0d2b45',
                marginBottom: '4px',
              }}>
                Añadir Producto
              </h3>
              <p style={{ color: '#43474d', fontSize: '14px' }}>
                Crear un nuevo producto
              </p>
            </div>
          </Link>

          <Link href="/" style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #c3c6ce',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#3b2500',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Epilogue', sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#0d2b45',
                marginBottom: '4px',
              }}>
                Ver Tienda
              </h3>
              <p style={{ color: '#43474d', fontSize: '14px' }}>
                Ir a la página pública
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}