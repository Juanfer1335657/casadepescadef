-- =============================================
-- Schema para La Casa De La Pesca del Llano
-- Neon PostgreSQL
-- =============================================

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(100),
  units INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de imágenes de productos
CREATE TABLE IF NOT EXISTS product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar producto de ejemplo
INSERT INTO products (name, description, price, category, units)
VALUES ('Caña de Pescar Shimano', 'Caña de pescar profesional de fibra de carbono', 250000, 'Cañas', 5);

INSERT INTO product_images (product_id, image_url, is_primary)
VALUES (1, 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400', true);

INSERT INTO products (name, description, price, category, units)
VALUES ('Carrete Shimano Stradic', 'Carrete de alta velocidad para pesca deportiva', 180000, 'Reeles', 3);

INSERT INTO product_images (product_id, image_url, is_primary)
VALUES (2, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', true);

INSERT INTO products (name, description, price, category, units)
VALUES ('Anzuelo Triple #5', 'Anzuelos resistentes de acero inoxidable', 15000, 'Accesorios', 10);

INSERT INTO product_images (product_id, image_url, is_primary)
VALUES (3, 'https://images.unsplash.com/photo-1534054526808-71d6de519d7e?w=400', true);