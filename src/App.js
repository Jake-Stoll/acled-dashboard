import React from 'react';
import './App.css';
// Import components
import Map from './Components/Map/Map';
import EventsLegend from './Components/EventsLegend/EventsLegend';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataReady: false,
      startDate: "2020-01-01",
      endDate: "2020-05-01"
    }
  }
  componentDidMount() {
    // Call ACLED API for data
    this.getAcledData();
  }
  getAcledData = () => {
    const { startDate, endDate } = this.state;
    fetch(`https://api.acleddata.com/acled/read?terms=accept&event_date={${startDate}|${endDate}}&event_date_where=BETWEEN`)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data.data, dataReady: true })
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
  render() {
    const { data, dataReady } = this.state;
    return (
      <div className="App">
        {dataReady ? (
          <React.Fragment>
            <Map data={data} />
            <EventsLegend />
          </React.Fragment>)
          : null}


      </div>
    )
  }
}

export default App;
