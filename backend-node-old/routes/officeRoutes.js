import express from 'express';
import mongoose from 'mongoose';
import { getOffices, updateOffice } from '../controllers/officeController.js';
import protectAdminAction from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/offices -> Public route to display office details on your contact page grid
router.route('/').get(getOffices);

// PUT /api/offices/:facilityKey -> Protected admin route to update text values from your dashboard
router.route('/:facilityKey').put(protectAdminAction, updateOffice);
// 🗑️ DELETE Product Controller
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 🛡️ Safety Check: Is this actually a valid MongoDB ObjectId?
    // This stops the server from crashing when it receives a standard string from your fallback data
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid database ID format. Ghost document blocked." });
    }

    // Replace 'Product' with whatever your Mongoose model is named at the top of the file
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found in database." });
    }

    res.status(200).json({ message: "Asset successfully purged." });
  } catch (error) {
    console.error("Deletion error:", error);
    res.status(500).json({ message: "Server failed to process deletion request." });
  }
};

// The exact export statement Node is looking for:
export default router;