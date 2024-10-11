import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CountryDetails from '../../components/CountryDetails';
import PopulationChart from '../../components/PopulationChart';
import axios from 'axios';

interface BorderCountry {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: string[] | null;
  }
  
  interface PopulationData {
    year: number;
    value: number;
  }
  
  interface CountryInfo {
    borderCountries: BorderCountry[];
    populationData: PopulationData[];
    flagUrl: string;
  }

const CountryPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (code) {
        try {
          const response = await axios.get(`http://localhost:3001/api/countries/${code}`);
          setCountryInfo(response.data);
        } catch (err: any) {
          setError(err.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCountryInfo();
  }, [code]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!countryInfo) return null;

  return (
    <div className="container">
      <CountryDetails countryInfo={countryInfo} countryCode={code as string} setLoading={setLoading}/>
      <PopulationChart populationData={countryInfo.populationData} />
    </div>
  );
};

export default CountryPage;