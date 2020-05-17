import React from 'react';
import './EventsLegend.css';

var eventTypes = [
  { type: "Battles", color: "#FFD945" },
  { type: "Violence Against Civilians", color: "#5E91B2" },
  { type: "Explosions/Remote Violence", color: "#D27575" },
  { type: "Riots", color: "#CB7934" },
  { type: "Protests", color: "#345062" },
  { type: "Strategic Developments", color: '#6E8A64' },
  { type: "Multiple Event Types", color: "#7C7C7C" }

]

const EventsLegend = () => {
  return (
    <div id="events-legend">
      <h2 id="event-legend-title">ACLED Events Legend</h2>
      {
        eventTypes.map((event, index) => {
          return (
            <div key={index} className='events-legend-row'>
              <div className="events-legend-circle" style={{ backgroundColor: event.color }}></div>
              <p className="events-legend-title">{event.type}</p>
            </div>
          )
        })
      }

    </div>
  )
}

export default EventsLegend;