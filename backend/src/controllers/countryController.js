const countryService = require('../services/countryService');

const getAvailableCountries = async (req, res) => {
  try {
    const countries = await countryService.getAvailableCountries();
    res.json(countries);
  } catch (error) {
    console.error('Error in getAvailableCountries:', error);
    res.status(500).json({ message: 'Error fetching countries', error: error.message });
  }
};

const getCountryInfo = async (req, res) => {
  try {
    const { code } = req.params;
    const countryInfo = await countryService.getCountryInfo(code);
    res.json(countryInfo);
  } catch (error) {
    console.error('Error in getCountryInfo:', error);
    res.status(500).json({ message: 'Error fetching country info', error: error.message });
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo
};