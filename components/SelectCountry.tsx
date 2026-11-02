import { countryList, getCountryByName } from "@/lib/countries";

type SelectCountryProps = {
  id: string;
  name: string;
  className: string;
  defaultCountry: string;
};

export default function SelectCountry({
  id,
  name,
  className,
  defaultCountry,
}: SelectCountryProps) {
  const defaultCode = getCountryByName(defaultCountry)?.code ?? "";

  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultCode}
      className={className}
    >
      <option value="">Select country...</option>

      {countryList.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
