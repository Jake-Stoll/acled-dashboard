import React from 'react';
import "./Graph.css"
const Plotly = window.Plotly;

const eventTypes = [
  // { type: "Strategic developments", color: '#6E8A64' },
  { type: "Protests", color: "#345062" },
  { type: "Battles", color: "#FFD945" },
  { type: "Violence against civilians", color: "#5E91B2" },
  { type: "Explosions/Remote violence", color: "#D27575" },
  { type: "Multiple event types", color: "#7C7C7C" },
  { type: "Riots", color: "#CB7934" }
]

class Graph extends React.Component {
  renderGraph = () => {
    const { data } = this.props;
    if (data.length === 0) {
      return
    }
    // For each event type, go through the data and sort into the months and their total
    const graphData = []
    eventTypes.map(type => {
      const eventData = {
        x: [], // Date
        y: [], // Event total
        mode: 'lines',
        name: type.type,
        line: {
          color: type.color
        }
      };
      const timeEventObject = {
      }
      const allEventsFromType = data.filter(event => event.event_type === type.type);
      allEventsFromType.forEach(event => {
        // Change events format
        const year = event.event_date.substring(0, 4)
        const monthDay = event.event_date.substring(5, 7)
        const date = `${monthDay}-${year}`

        if (date in timeEventObject) {
          timeEventObject[date] = timeEventObject[date] + 1;
        } else {
          timeEventObject[date] = 1
        }
      });
      // Add time Event Object to eventData Object
      for (let [key, value] of Object.entries(timeEventObject)) {
        eventData.x.push(key)
        eventData.y.push(value)
      }
      return graphData.push(eventData)


    })
    var layout = {
      showlegend: false,
      yaxis: {
        title: 'Event Total',

      },
      height: 360
    };
    Plotly.newPlot('graph', graphData, layout, { displayModeBar: false });
  }
  componentDidMount() {
    this.renderGraph()
  }
  render() {
    return (
      <div id="graph-container">
        <div id="graph" style={{ width: '100%', height: '100%' }}></div>
      </div>
    )
  }
}

export default Graph;