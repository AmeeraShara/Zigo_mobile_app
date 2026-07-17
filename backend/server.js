// backend/server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'zigomobile_1_19062026',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
})();

// ============================================
// API ENDPOINTS
// ============================================

// GET products by category name
app.get('/api/products/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    
    const query = `
      SELECT 
        ii.id,
        ii.code,
        ii.description,
        ii.po_description,
        ii.min_w_rate,
        ii.max_w_rate,
        ii.max_r_rate,
        ii.default_cost,
        ii.default_price,
        ii.commision,
        ii.status,
        ii.unit,
        ii.pr_sr,
        ii.supplier,
        ic.name as category_name,
        (SELECT public_url 
         FROM inventory_images 
         WHERE inventory_item_id = ii.id 
         AND is_primary = 1 
         LIMIT 1) as primary_image,
        (SELECT COUNT(*) 
         FROM inventory_images 
         WHERE inventory_item_id = ii.id) as image_count
      FROM inventory_items ii
      INNER JOIN item_category ic ON ii.category = ic.id
      WHERE ic.name LIKE ?
      AND ii.status = 1
      AND ii.pr_sr = 1
      ORDER BY ii.description ASC
    `;

    const [results] = await pool.query(query, [`%${categoryName}%`]);
    
    res.json({
      success: true,
      data: results,
      message: `Products found for ${categoryName}`
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET product by ID with all images - FIXED (no JSON_ARRAYAGG)
app.get('/api/products/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`Fetching product with ID: ${id}`);

    // First get the product details
    const productQuery = `
      SELECT 
        ii.id,
        ii.code,
        ii.description,
        ii.po_description,
        ii.min_w_rate,
        ii.max_w_rate,
        ii.max_r_rate,
        ii.default_cost,
        ii.default_price,
        ii.commision,
        ii.status,
        ii.unit,
        ii.pr_sr,
        ii.supplier,
        ic.name as category_name
      FROM inventory_items ii
      INNER JOIN item_category ic ON ii.category = ic.id
      WHERE ii.id = ?
    `;

    const [productResults] = await pool.query(productQuery, [id]);
    
    if (productResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const product = productResults[0];

    // Then get the images separately
    const imagesQuery = `
      SELECT 
        id,
        filename,
        url,
        public_url,
        is_primary,
        alt_text,
        created_at
      FROM inventory_images 
      WHERE inventory_item_id = ?
      ORDER BY is_primary DESC, created_at ASC
    `;

    const [imageResults] = await pool.query(imagesQuery, [id]);

    // Add images as a regular array
    product.images = imageResults || [];

    console.log(`Product found: ${product.code}, Images: ${product.images.length}`);

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product details',
      error: error.message
    });
  }
});

// GET search products
app.get('/api/products/search', async (req, res) => {
  try {
    const { q, category, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT 
        ii.id,
        ii.code,
        ii.description,
        ii.default_price,
        ii.unit,
        ic.name as category_name,
        (SELECT public_url 
         FROM inventory_images 
         WHERE inventory_item_id = ii.id 
         AND is_primary = 1 
         LIMIT 1) as primary_image
      FROM inventory_items ii
      INNER JOIN item_category ic ON ii.category = ic.id
      WHERE ii.status = 1
    `;
    
    const params = [];
    
    if (q) {
      query += ` AND (ii.description LIKE ? OR ii.code LIKE ?)`;
      params.push(`%${q}%`, `%${q}%`);
    }
    
    if (category) {
      query += ` AND ic.name LIKE ?`;
      params.push(`%${category}%`);
    }
    
    query += ` ORDER BY ii.description ASC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));
    
    const [results] = await pool.query(query, params);
    
    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM inventory_items ii
      INNER JOIN item_category ic ON ii.category = ic.id
      WHERE ii.status = 1
    `;
    
    const countParams = [];
    if (q) {
      countQuery += ` AND (ii.description LIKE ? OR ii.code LIKE ?)`;
      countParams.push(`%${q}%`, `%${q}%`);
    }
    if (category) {
      countQuery += ` AND ic.name LIKE ?`;
      countParams.push(`%${category}%`);
    }
    
    const [countResult] = await pool.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: results,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message
    });
  }
});

// Manual image insert endpoint
app.post('/api/products/manual-upload', async (req, res) => {
  try {
    const { productId, filename, isPrimary, altText, fileSize, mimeType } = req.body;

    if (!productId || !filename) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and filename are required'
      });
    }

    // Check if product exists
    const [productCheck] = await pool.query(
      'SELECT id FROM inventory_items WHERE id = ?',
      [productId]
    );

    if (productCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if image already exists
    const [imageCheck] = await pool.query(
      'SELECT id FROM inventory_images WHERE inventory_item_id = ? AND filename = ?',
      [productId, filename]
    );

    if (imageCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Image already exists for this product'
      });
    }

    // If this is primary, set all other images as non-primary
    if (isPrimary === 1) {
      await pool.query(
        'UPDATE inventory_images SET is_primary = 0 WHERE inventory_item_id = ?',
        [productId]
      );
    }

    // Generate URLs
    const baseUrl = `http://localhost:${process.env.PORT || 3000}`;
    const publicUrl = `${baseUrl}/uploads/products/${filename}`;
    const fileUrl = `/uploads/products/${filename}`;

    // Insert into database
    const insertQuery = `
      INSERT INTO inventory_images 
      (inventory_item_id, filename, url, public_url, is_primary, alt_text, size, mime_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(insertQuery, [
      productId,
      filename,
      fileUrl,
      publicUrl,
      isPrimary || 0,
      altText || null,
      fileSize || null,
      mimeType || 'image/jpeg'
    ]);

    res.json({
      success: true,
      message: 'Image added successfully',
      data: {
        id: result.insertId,
        filename: filename,
        url: publicUrl,
        isPrimary: isPrimary === 1
      }
    });

  } catch (error) {
    console.error('Error adding image:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding image',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads/products')}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`  GET  /api/health - Health check`);
  console.log(`  GET  /api/products/category/:categoryName - Get products by category`);
  console.log(`  GET  /api/products/product/:id - Get product details`);
  console.log(`  GET  /api/products/search - Search products`);
  console.log(`  POST /api/products/manual-upload - Manual image insert\n`);
});