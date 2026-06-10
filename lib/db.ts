/**
 * Cloudflare D1 Database Helper
 * Handles lazy initialization and secure order management.
 */

export interface DBOrder {
  id: string;
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  shipping_address: string;
  order_notes: string;
  total_amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  created_at: string;
}

export interface DBOrderItem {
  id?: number;
  order_id: string;
  product_slug: string;
  product_name: string;
  variant: string;
  price: number;
  qty: number;
}

// Helper to get D1 database from Cloudflare bindings
export function getD1(): any {
  // Safe extraction representing next-on-pages, opennext, and standard Pages/Workers bindings
  const db = 
    process.env.DB || 
    (globalThis as any).DB || 
    (globalThis as any).__NEXT_CLOUDFLARE_BINDINGS__?.DB;

  if (!db) {
    throw new Error(
      'Cloudflare D1 Database binding "DB" was not found. ' +
      'Please configure a D1 database with binding name "DB" in your Cloudflare dashboard.'
    );
  }
  return db;
}

// Self-healing: Initialize the SQLite tables in D1 if they do not exist
export async function bootstrapDatabase(db: any) {
  try {
    await db.batch([
      db.prepare(`
        CREATE TABLE IF NOT EXISTS orders (
          id TEXT PRIMARY KEY,
          order_number TEXT UNIQUE,
          first_name TEXT,
          last_name TEXT,
          email TEXT,
          phone TEXT,
          shipping_address TEXT,
          order_notes TEXT,
          total_amount REAL,
          status TEXT DEFAULT 'Pending',
          created_at TEXT
        );
      `),
      db.prepare(`
        CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id TEXT,
          product_slug TEXT,
          product_name TEXT,
          variant TEXT,
          price REAL,
          qty INTEGER,
          FOREIGN KEY(order_id) REFERENCES orders(id)
        );
      `)
    ]);
  } catch (error) {
    console.error('Database bootstrap failed:', error);
    throw error;
  }
}

/**
 * Persists an order and its items securely within D1.
 */
export async function saveOrderToD1(order: DBOrder, items: DBOrderItem[]) {
  const db = getD1();
  await bootstrapDatabase(db);

  try {
    // 1. Prepare insertion of the order header
    const insertOrderStmt = db.prepare(`
      INSERT INTO orders (id, order_number, first_name, last_name, email, phone, shipping_address, order_notes, total_amount, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `).bind(
      order.id,
      order.order_number,
      order.first_name,
      order.last_name,
      order.email,
      order.phone,
      order.shipping_address,
      order.order_notes || '',
      order.total_amount,
      order.status,
      order.created_at
    );

    // 2. Prepare order items queries
    const itemStatements = items.map(item => {
      return db.prepare(`
        INSERT INTO order_items (order_id, product_slug, product_name, variant, price, qty)
        VALUES (?, ?, ?, ?, ?, ?);
      `).bind(
        order.id,
        item.product_slug,
        item.product_name,
        item.variant,
        item.price,
        item.qty
      );
    });

    // 3. Batch execute order header + all items (atomic transaction behavior)
    await db.batch([insertOrderStmt, ...itemStatements]);
  } catch (error) {
    console.error(`Failed to save order ${order.order_number} to D1:`, error);
    throw error;
  }
}

/**
 * Searches, filters, and fetches orders from D1.
 */
export async function fetchOrdersFromD1(searchQuery?: string, statusFilter?: string) {
  const db = getD1();
  await bootstrapDatabase(db);

  try {
    let sql = 'SELECT * FROM orders';
    const params: any[] = [];

    const conditions: string[] = [];

    if (statusFilter && statusFilter !== 'all') {
      conditions.push('status = ?');
      params.push(statusFilter);
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const wild = `%${searchQuery.trim().toLowerCase()}%`;
      conditions.push('(LOWER(order_number) LIKE ? OR LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(phone) LIKE ?)');
      params.push(wild, wild, wild, wild, wild);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    const { results } = await db.prepare(sql).bind(...params).all();
    const orders = results as DBOrder[];

    // Fetch items grouped per order if orders present
    if (orders.length > 0) {
      const orderIds = orders.map(o => o.id);
      // D1 doesn't always support arrays in IN easily, so let's fetch items for each or query them cleanly.
      // Fetching all items since we represent a store is clean, but querying in parallel is extremely fast on D1.
      const enrichedOrders = await Promise.all(
        orders.map(async (order) => {
          const { results: itemsResults } = await db.prepare(`
            SELECT * FROM order_items WHERE order_id = ?;
          `).bind(order.id).all();
          return {
            ...order,
            items: itemsResults as DBOrderItem[],
          };
        })
      );
      return enrichedOrders;
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch orders from D1:', error);
    return [];
  }
}

/**
 * Updates status of an existing order.
 */
export async function updateOrderStatusInD1(orderId: string, status: string) {
  const db = getD1();
  await bootstrapDatabase(db);

  try {
    await db.prepare(`
      UPDATE orders SET status = ? WHERE id = ?;
    `).bind(status, orderId).run();
    return true;
  } catch (error) {
    console.error(`Failed to update status for order ${orderId}:`, error);
    throw error;
  }
}
