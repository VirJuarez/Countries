import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import "../app/globals.css";

interface Country {
  countryCode: string;
  name: string;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="container">
      <h1>Available Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/country/${country.countryCode}-${country.name}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}