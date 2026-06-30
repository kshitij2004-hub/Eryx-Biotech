import SafetyReport from '../models/SafetyReportModel.js';

// @desc    Retrieve all logged drug safety reports
// @route   GET /api/safety
// @access  Private/Admin
export const getSafetyReports = async (req, res) => {
  try {
    const reports = await SafetyReport.find({}).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: `Failed to compile administrative compliance logs: ${error.message}` });
  }
};

// @desc    Log a new adverse reaction event profile
// @route   POST /api/safety
// @access  Public
export const createSafetyReport = async (req, res) => {
  const { reporterName, reporterEmail, patientIdentifier, adversityDetails } = req.body;

  try {
    const report = new SafetyReport({
      reporterName,
      reporterEmail,
      patientIdentifier,
      adversityDetails
    });

    const savedReport = await report.save();
    res.status(201).json({
      success: true,
      data: savedReport,
      message: 'Adverse event data payload filed securely with compliance node.'
    });
  } catch (error) {
    res.status(400).json({ message: `Compliance schema validation failed: ${error.message}` });
  }
};