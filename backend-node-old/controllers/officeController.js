import Office from '../models/OfficeModel.js';

// @desc    Get all corporate office facility profiles
// @route   GET /api/offices
// @access  Public
export const getOffices = async (req, res) => {
  try {
    const offices = await Office.find({});
    res.json(offices);
  } catch (error) {
    res.status(500).json({ message: `Failed to sync operational facilities: ${error.message}` });
  }
};

// @desc    Update a specific office location block live
// @route   PUT /api/offices/:facilityKey
// @access  Private/Admin
export const updateOffice = async (req, res) => {
  const { title, legalName, extraIdentifier, addressLine1, addressLine2, region } = req.body;

  try {
    const office = await Office.findOne({ facilityKey: req.params.facilityKey });

    if (office) {
      office.title = title || office.title;
      office.legalName = legalName || office.legalName;
      office.extraIdentifier = extraIdentifier !== undefined ? extraIdentifier : office.extraIdentifier;
      office.addressLine1 = addressLine1 || office.addressLine1;
      office.addressLine2 = addressLine2 !== undefined ? addressLine2 : office.addressLine2;
      office.region = region || office.region;

      const updatedOffice = await office.save();
      res.json(updatedOffice);
    } else {
      res.status(404).json({ message: 'Target location infrastructure node not matched.' });
    }
  } catch (error) {
    res.status(400).json({ message: `Failed to update location profile string: ${error.message}` });
  }
};