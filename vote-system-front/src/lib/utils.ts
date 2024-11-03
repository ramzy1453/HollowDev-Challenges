export async function fetchCountry() {
	const res = await fetch('https://restcountries.com/v3.1/all');

	const data = await res.json();

	// eslint-disable-next-line
	const countries = data.map((country: any) => {
		return country.name.common;
	});

	const randomIdx = Math.floor(Math.random() * countries.length);

	return countries[randomIdx];
}
