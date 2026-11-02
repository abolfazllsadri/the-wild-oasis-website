import countries from "i18n-iso-countries";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export const countryList = Object.keys(countries.getAlpha2Codes())
  .map((code) => ({ code, name: regionNames.of(code) ?? code }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const getFlagUrl = (code: string) =>
  `https://flagcdn.com/${code.toLowerCase()}.svg`;

export const getCountryByCode = (code: string) =>
  countryList.find((country) => country.code === code);

export const getCountryByName = (name: string) =>
  countryList.find((country) => country.name === name);
