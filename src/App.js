import React from 'react';
import './App.css';
// Import components
import Map from './Components/Map/Map';
import EventsLegend from './Components/EventsLegend/EventsLegend';
import Sidebar from './Components/SideBar/Sidebar';
import Graph from './Components/Graph/Graph'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataReady: false,
      startDate: "2020-01-01",
      endDate: "2020-05-01",
      eventType: [],
      region: [],
      iso: [],
      fatalities: 10,
      interaction: []
    }
  }
  componentDidMount() {
    // Call ACLED API for data
    this.constructAcledUrl();
  }

  formatUrlParams = (url, stateProp, urlProp) => {
    if (stateProp.length > 0) {
      stateProp.forEach((entry, index) => {
        if (index === 0) {
          url = url + `&${urlProp}=` + entry
        } else {
          url = url + `:OR:${urlProp}=` + entry
        }
      });
    }
    return url;

  }

  constructAcledUrl = () => {
    const { startDate, endDate, eventType, region, iso, interaction } = this.state;
    let url = `https://api.acleddata.com/acled/read?terms=accept&event_date=${startDate}|${endDate}&event_date_where=BETWEEN&limit=20000`
    // Apply Event Type
    url = this.formatUrlParams(url, eventType, 'event_type')
    // Apply Region Type
    url = this.formatUrlParams(url, region, 'region')
    // Apply Iso
    url = this.formatUrlParams(url, iso, 'iso')
    // Apply Interactions
    url = this.formatUrlParams(url, interaction, 'interaction')
    // Get Acled data from url
    this.getAcledData(url)
  }


  getAcledData = url => {
    const { startDate, endDate, fatalities } = this.state;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Filter Data by date
        let filteredData = data.data.filter(event => event.event_date >= startDate && event.event_date <= endDate)
        // Filter by fatalities
        filteredData = filteredData.filter(event => event.fatalities >= fatalities);
        if (filteredData.length >= 20000) {
          return alert("Too many results")
        }
        console.log(filteredData)
        this.setState({ data: filteredData.reverse(), dataReady: true })
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
  render() {
    const { data, dataReady, startDate, endDate } = this.state;
    return (
      <div className="App">
        {dataReady ? (
          <React.Fragment>
            <Map data={data} />
            <Graph data={data} startDate={startDate} endDate={endDate} />
          </React.Fragment>)
          : null}
        <EventsLegend />
        <Sidebar />

      </div>
    )
  }
}

export default App;
