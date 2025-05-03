const CountryInfo = ({ country }) => {
    if (country) {
        const languages = Object.entries(country.languages).map(([key, value]) => {
            return <li key={country.area + "_" + key}> {value} </li>
        })
        return (
            <div>
                <h2> {country.name.common} </h2>
                <div>
                    Capital: {country.capital}
                    <br />
                    Area: {country.area}
                </div>
                <h3>Languages</h3>
                <div>
                    <ul>
                        {languages}
                    </ul>
                </div>
                <img src={country.flags.png} alt={country.flag.alt}></img>
            </div>
        )
    }
}

export default CountryInfo