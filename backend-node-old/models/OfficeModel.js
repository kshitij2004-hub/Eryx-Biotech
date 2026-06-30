import mongoose from 'mongoose';

const officeSchema = new mongoose.Schema({
  facilityKey: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  legalName: {
    type: String,
    required: true,
    trim: true
  },
  extraIdentifier: {
    type: String,
    trim: true,
    default: '' // Can store local legal markers like Corporate Identity Numbers
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true,
    default: ''
  },
  region: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Auto-manages createdAt and updatedAt records
});

const Office = mongoose.model('Office', officeSchema);

// The exact export statement the application engine is waiting for:
export default Office;