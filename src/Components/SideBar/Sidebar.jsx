import React from 'react';
import "./Sidebar.css";
// Import images
import AcledLogo from '../../images/Components/Sidebar/acled-logo.png'

class Sidebar extends React.Component {
  render() {
    const { data, startDate, endDate, changeFilter, applyNewFilters } = this.props;
    const eventTotal = data.length;
    return (
      <div id="sidebar">
        <a href="https://acleddata.com/#/dashboard">
          <img id="sidebar-acled-logo" src={AcledLogo} alt="Link to ACLED Homepage" />
        </a>
        <div id="sidebar-filters-container">
          <p>{eventTotal} Total Events</p>
          {/* Start Date */}
          <div className="filters-section">
            <label>Start Date</label><br />
            <input type="date" id="start" name="start-date"
              value={startDate}
              onChange={e => changeFilter(e.target.value, 'startDate')}
              min="2000-01-01" max="2020-05-16"></input>
          </div>
          {/* End Date */}
          <div className="filters-section">
            <label>End Date</label><br />
            <input type="date" id="start" name="start-date"
              value={endDate}
              onChange={e => changeFilter(e.target.value, 'endDate')}
              min="2000-01-01" max="2020-05-16"></input>
          </div>
          <button onClick={() => applyNewFilters()}>Apply Filters</button>
        </div>
      </div>
    )
  }
}

export default Sidebar;