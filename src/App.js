import './App.css';
import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { ourSortData,prettyPrintStat } from './util';
import LineGraph from './LineGraph';
function App() {
  const [countryInfo, setCountryInfo] = useState({})
  const [countries, setCountries] = useState([])
  const [mapZoom, setMapZoom] = useState(3)
  const [mapcountries, setMapCountries] = useState([])
  const [mapCenter, setMapCenter] = useState([28.6361, 69.1864])
  const [tableData, setTableData] = useState([])
  const [country, setCountry] = useState('Worldwide')
  const [casesType, setCasesType] = useState('cases')
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesdData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, //// Name Of Country Like INDIA,BANGLADASH,
              value: country.countryInfo.iso3  /// first 3 word... if we use iso2,, then IN, PK.. like This. short name of countries like,, India To IND,,,PAKISTAN TO PaK.
            }
          ));
          const sortData = ourSortData(data)
          setTableData(sortData)
          setMapCountries(data)
          setCountries(countries)
        });
    };
    getCountriesdData()
  }, [])

  const onChangeConutry = async (e) => {
    const selectedCountry = e.target.value;
    const url =
      selectedCountry === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log({lat: data.countryInfo.lat})
        setCountry(selectedCountry);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  return (
    <div className="App">
      <div className='App__Left'>
        <div className='App__header'>
          <h2> COVID-19 TRACKER</h2>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              onChange={onChangeConutry}
              value={country}
            >
              <MenuItem value='Worldwide'><em>Worldwide</em></MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='App__stats'>
          <InfoBox isRed active={casesType==='cases'}whenClick={e=>setCasesType('cases')}   title='Coronavirus Cases' cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} />
          <InfoBox active={casesType==='recovered'} whenClick={e=>setCasesType('recovered')}  title='Recovered' cases={prettyPrintStat(countryInfo.todayRecovered)} total={countryInfo.recovered} />
          <InfoBox  isRed active={casesType==='deaths'} whenClick={e=>setCasesType('deaths')}  title='Deaths' cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths} />
        </div>
        <Map
        casesType={casesType} 
        countries={mapcountries}
        zoom={mapZoom} 
        center={mapCenter} />
      </div>
      <div >
        <Card className='App__Right'>
          <CardContent>
            <h3> Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3> Worldwide New {casesType}</h3>
            {/* Graph */}
            <LineGraph  casesType={casesType}/>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

export default App;
