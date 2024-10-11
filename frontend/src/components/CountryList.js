import Link from 'next/link';

export default function CountryList({ countries }) {
  return (
    <ul className="country-list">
      {countries.map(country => (
        <li key={country.countryCode}>
          <Link href={`/country/${country.countryCode}`}>
            <a>{country.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}