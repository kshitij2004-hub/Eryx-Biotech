import mongoose from 'mongoose';

const safetyReportSchema = new mongoose.Schema({
  reporterName: { type: String, required: true, trim: true },
  reporterEmail: { type: String, required: true, trim: true },
  patientIdentifier: { type: String, required: true, trim: true },
  adversityDetails: { type: String, required: true, trim: true }
}, { timestamps: true });

const SafetyReport = mongoose.model('SafetyReport', safetyReportSchema);
export default SafetyReport;