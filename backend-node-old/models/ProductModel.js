import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true, // e.g., 'Therapeutic', 'API', 'Formulations'
    trim: true
  },
  type: {
    type: String,
    required: true, // e.g., 'Tablet', 'Injection', 'Liquid'
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  packaging: {
    type: String,
    required: true, // e.g., '10x10 Blister', '50ml Vial'
    trim: true
  }
}, {
  timestamps: true // Auto-generates createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

// This is the explicit default export the server engine is searching for
export default Product;