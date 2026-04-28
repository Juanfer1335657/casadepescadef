import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getSession } from '@/lib/auth-server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const products = await sql`
        SELECT 
          p.id, p.name, p.description, p.price, p.category, p.units, p.created_at, p.updated_at,
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', i.id,
                'product_id', i.product_id,
                'image_url', i.image_url,
                'is_primary', i.is_primary,
                'created_at', i.created_at
              )
            ) FILTER (WHERE i.id IS NOT NULL),
            '[]'
          ) as images
        FROM products p
        LEFT JOIN product_images i ON p.id = i.product_id
        WHERE p.id = ${id}
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `;
      return NextResponse.json(products[0] || null);
    }

    const products = await sql`
      SELECT 
        p.id, p.name, p.description, p.price, p.category, p.units, p.created_at, p.updated_at,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', i.id,
              'product_id', i.product_id,
              'image_url', i.image_url,
              'is_primary', i.is_primary,
              'created_at', i.created_at
            )
          ) FILTER (WHERE i.id IS NOT NULL),
          '[]'
        ) as images
      FROM products p
      LEFT JOIN product_images i ON p.id = i.product_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;

    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener productos', details: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { name, description, price, category, units, images } = await request.json();

    if (!name || !price) {
      return NextResponse.json({ error: 'Nombre y precio son requeridos' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO products (name, description, price, category, units)
      VALUES (${name}, ${description || null}, ${price}, ${category || null}, ${units || 1})
      RETURNING id
    `;

    const productId = result[0].id;

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await sql`
          INSERT INTO product_images (product_id, image_url, is_primary)
          VALUES (${productId}, ${images[i]}, ${i === 0})
        `;
      }
    }

    return NextResponse.json({ success: true, id: productId });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id, name, description, price, category, units, images } = await request.json();

    if (!id || !name || !price) {
      return NextResponse.json({ error: 'ID, nombre y precio son requeridos' }, { status: 400 });
    }

    await sql`
      UPDATE products 
      SET name = ${name}, description = ${description || null}, price = ${price}, category = ${category || null}, units = ${units || 1}, updated_at = NOW()
      WHERE id = ${id}
    `;

    if (images && images.length > 0) {
      await sql`DELETE FROM product_images WHERE product_id = ${id}`;
      
      for (let i = 0; i < images.length; i++) {
        await sql`
          INSERT INTO product_images (product_id, image_url, is_primary)
          VALUES (${id}, ${images[i]}, ${i === 0})
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await sql`DELETE FROM products WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}