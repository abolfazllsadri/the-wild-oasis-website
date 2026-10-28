import { getCountries } from "@/lib/data-service";
import type { Country } from "@/lib/types";

type SelectCountryProps = {
  id: string;
  name: string;
  className: string;
  defaultCountry: string;
};

export default async function SelectCountry({
  id,
  name,
  className,
  defaultCountry,
}: SelectCountryProps) {
  const {
    data: { objects: countries },
  } = await getCountries();

  const flag =
    countries.find(
      (country: Country) => country.names.common === defaultCountry,
    )?.flag.url_png ?? "";

  return (
    <select
      id={id}
      name={name}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>

      {countries.map((country: Country) => (
        <option
          key={country.names.common}
          value={`${country.names.common}%${country.flag.url_png}`}
        >
          {country.names.common}
        </option>
      ))}
    </select>
  );
}
