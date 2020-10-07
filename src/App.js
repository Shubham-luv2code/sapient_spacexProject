import React, { useState, useEffect } from 'react';
import './App.css';

export default function App(props) {
  let [unfilteredData, setUnfilteredData] = useState([]);
  let [launchYears] = useState([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]);
  let [launchOptions] = useState(['True', 'False']);
  let [landOptions] = useState(['True', 'False']);
  let [newUrl, setNewUrl] = useState('https://api.spacexdata.com/v3/launches?limit=100');
  let [dataUrl, setDataUrl] = useState('https://api.spacexdata.com/v3/launches?limit=100');
  const [hasMounted, setHasMounted] = React.useState(false);

  useEffect(() => {

    props.history.push('/' + newUrl.substring(newUrl.indexOf('v3')))
    fetch(newUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        setUnfilteredData(data);
        setHasMounted(true);
      })
      .catch(err => { throw err })

  }, [newUrl, dataUrl]);

  const filterHandler = (e, ind) => {
    e.preventDefault();
    var appendUrl, appendDataUrl, substrUrl = '';

    var elementObj = {}
    if (e.target.id === `yearBtn_${ind}`) {
      elementObj = document.getElementById(`yearBtn_${ind}`)
      elementObj.className = elementObj.className.includes('active') ? elementObj.className.replace(" active", "") : elementObj.className + " active"
      appendUrl = `&launch_year=${Number(e.target.textContent)}`
      appendDataUrl = `&launch_year=${Number(e.target.textContent)}X`
      if (!newUrl.includes('launch_year')) {
        setNewUrl(newUrl + appendUrl)
        setDataUrl(dataUrl + appendDataUrl)

      } else {
        substrUrl = dataUrl.substring(dataUrl.indexOf('launch_year=') - 1, dataUrl.indexOf('X'))
        setNewUrl(newUrl.replace(substrUrl, appendUrl))
        setDataUrl(dataUrl.replace(substrUrl, appendDataUrl))
      }
    }
    else if (e.target.id === `launchBtn_${ind}`) {
      elementObj = document.getElementById(`launchBtn_${ind}`)
      elementObj.className = elementObj.className.includes('active') ? elementObj.className.replace(" active", "") : elementObj.className + " active"
      let launchVal = e.target.textContent === 'True' ? true : false
      appendUrl = `&launch_success=${launchVal}`
      appendDataUrl = `&launch_success=${launchVal}Y`
      if (!newUrl.includes('launch_success')) {

        setNewUrl(newUrl + appendUrl)
        setDataUrl(dataUrl + appendDataUrl)
      }
      else {
        substrUrl = dataUrl.substring(dataUrl.indexOf('launch_success=') - 1, dataUrl.indexOf('Y'))
        setNewUrl(newUrl.replace(substrUrl, appendUrl))
        setDataUrl(dataUrl.replace(substrUrl, appendDataUrl))
      }


    }
    else if (e.target.id === `landBtn_${ind}`) {
      elementObj = document.getElementById(`landBtn_${ind}`)
      elementObj.className = elementObj.className.includes('active') ? elementObj.className.replace(" active", "") : elementObj.className + " active"
      let landVal = e.target.textContent === 'True' ? true : false
      appendUrl = `&land_success=${landVal}`
      appendDataUrl = `&land_success=${landVal}Z`
      if (!newUrl.includes('land_success')) {

        setNewUrl(newUrl + appendUrl)
        setDataUrl(dataUrl + appendDataUrl)
      }
      else {
        substrUrl = dataUrl.substring(dataUrl.indexOf('land_success=') - 1, dataUrl.indexOf('Z'))
        setNewUrl(newUrl.replace(substrUrl, appendUrl))
        setDataUrl(dataUrl.replace(substrUrl, appendDataUrl))
      }
    }
  }
  return (
    hasMounted &&
    <div>
      <h1>SpaceX Launch Program</h1>
      <div className="row">
        <div className="parent-column">
          <div className="filter-column" >
            <div className="container">
              <h2>Filters</h2>
              <div>
                <p className="filter-header">Launch Year</p>
                <div className="button-container">
                  {

                    launchYears && launchYears.length > 0 && launchYears.map((launchYear, ind) => {
                      return (
                        <button key={`yearBtn_${ind}`} id={`yearBtn_${ind}`} className="button-column" onClick={(e) => filterHandler(e, ind)}>{launchYear}</button>
                      )
                    })

                  }</div>
              </div>
              <div>
                <p className="filter-header">Successful Launch</p>

                {
                  launchOptions && launchOptions.length > 0 && launchOptions.map((launchOpt, ind) => {
                    return (
                      <button key={`launchBtn_${ind}`} id={`launchBtn_${ind}`} className="button-column" onClick={(e) => filterHandler(e, ind)}>{launchOpt}</button>
                    )
                  })

                }
              </div><br />
              <div>
                <p className="filter-header">Successful Landing</p>

                {
                  landOptions && landOptions.length > 0 && landOptions.map((landOpt, ind) => {
                    return (
                      <button key={`landBtn_${ind}`} id={`landBtn_${ind}`} className="button-column" onClick={(e) => filterHandler(e, ind)}>{landOpt}</button>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="card-parent-column">
            {
              unfilteredData && unfilteredData.length > 0 && unfilteredData.map((unfilteredItem, ind) => {
                return (

                  <div key={`${unfilteredItem}_${ind}`} className="card-column" >
                    <img className='img-width' alt="Space Ship" src={unfilteredItem.links.mission_patch === null ? require('./rocket.jpg') : unfilteredItem.links.mission_patch} />
                    <div className="container">

                      <p className="launch-name">{unfilteredItem.mission_name} # {unfilteredItem.flight_number}</p>
                      <div><p className="thick">Mission IDs:&nbsp;</p>
                        <ul>
                          {
                            unfilteredItem.mission_id && unfilteredItem.mission_id.length > 0 && unfilteredItem.mission_id.map((missionObj, missionInd) => {
                              return (
                                <li key={`${missionObj}_${missionInd}`}>
                                  {missionObj}
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                      <div className="details"><p className="thick">Launch Year:&nbsp;</p><p>{unfilteredItem.launch_year}</p></div>
                      <div className="details"><p className="thick">Successful Launch:&nbsp;</p><p>{unfilteredItem.launch_success ? 'YES' : 'NO'}</p></div>
                      <div className="details"><p className="thick">Successful Landing:&nbsp;</p><p>{unfilteredItem.rocket.first_stage.cores[0].land_success !== null ? 'YES' : 'NO'}</p></div>
                    </div>
                  </div>

                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

//export default App;
