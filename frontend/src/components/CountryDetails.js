import Image from 'next/image';
import Link from 'next/link';

const CountryDetails = ({ countryInfo, countryCode, setLoading }) => {
  if (!countryInfo) return null;

  return (
<div className="">
      {/* Botón para volver a la página principal */}
      <Link href="/" className="inline-block mb-4 text-sm text-blue-500 hover:underline">
        Home
      </Link>
      
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h1 className="text-3xl sm:text-5xl font-bold">{countryCode}</h1>
        <div className="w-20 h-auto sm:w-32 border border-black rounded">
          <Image
            src={countryInfo.flagUrl} 
            alt={`Flag of ${countryCode}`} 
            width={300} 
            height={200} 
            className="rounded"
          />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">Border Countries</h2>
      <ul>
        {countryInfo.borderCountries.map(country => (
          <li key={country.commonName}>
            <Link 
              href={`/country/${country.countryCode}-${country.commonName}`}
              onClick={() => setLoading(true)} 
              className="text-blue-600 hover:underline"
            >
              {country.commonName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryDetails;