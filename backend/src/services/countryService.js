const apiClient = require('../utils/apiClient');

const getAvailableCountries = async () => {
  try {
    const response = await apiClient.get('https://date.nager.at/api/v3/AvailableCountries');
    return response.data;
  } catch (error) {
    console.error('Error fetching available countries:', error);
    throw new Error('Failed to fetch available countries');
  }
};

const getCountryInfo = async (code) => {
  let [countryCode, name] = code.split('-');
  try {
    const [borderCountries, populationData, flagData] = await Promise.all([
      getBorderCountries(countryCode),
      getPopulationData(name),
      getFlagUrl(name),
    ]);

    return {
      borderCountries,
      populationData,
    flagUrl: flagData.data.flag,
    };
  } catch (error) {
    console.error('Error fetching country info:', error);
    throw new Error('Failed to fetch country info');
  }
};

const getBorderCountries = async (countryCode) => {
  const response = await apiClient.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
  return response.data.borders;
};

const getPopulationData = async (name) => {
  const response = await apiClient.post('https://countriesnow.space/api/v0.1/countries/population', { country: name });
  return response.data.data.populationCounts;
};

const getFlagUrl = async (name) => {
  const codes = await apiClient.post('https://countriesnow.space/api/v0.1/countries/iso', { country: name });
  const iso2 = codes.data.data.Iso2
  const response = await apiClient.post('https://countriesnow.space/api/v0.1/countries/flag/images', { iso2: iso2 });
  return response.data;
};

module.exports = {
  getAvailableCountries,
  getCountryInfo,
};