import Product from '../models/ProductModel.js';

// @desc    Fetch all stored items in the catalog
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `System failed to read asset catalog: ${error.message}` });
  }
};

// @desc    Inject a new medical specification entry into the manifest
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  const { name, category, type, description, packaging } = req.body;

  try {
    const product = new Product({ name, category, type, description, packaging });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: `Invalid asset profile structure: ${error.message}` });
  }
};

// @desc    Purge a target compound from the live index matching an explicit Object ID
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product profile node successfully unlinked from system manifest.' });
    } else {
      res.status(404).json({ message: 'Target profile node index location out of bounds.' });
    }
  } catch (error) {
    res.status(500).json({ message: `System failed to execute deletion script: ${error.message}` });
  }
};