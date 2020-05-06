// Function to populate a select element with unique "property" values from the sightings data
function populateSelection(property, bSort=true) {
    let uniqueProperties = new Array();
    for (const sighting of data) {
        if (!uniqueProperties.includes(sighting[property])) {
            uniqueProperties.push(sighting[property]);
        }   
    }
    if (bSort) uniqueProperties.sort();
    let sOptions = `<option selected value="All">All</option>`
    uniqueProperties.forEach(item => sOptions += `<option value="${item}">${item}</option>`)
    document.getElementById(property + "Selector").innerHTML = sOptions
}

// Utility function to generate HTML Table Rows from a list of objects, with direction from Travis Horn (travishorn.com)
function objectList2TableRows(objectList) {
    let html = ""
    if (objectList.length > 0) {
        let cols = Object.keys(objectList[0]);
        html = objectList.map(row => "<tr>" + cols.map(colName => '<td>' + row[colName] + '</td>').join("") + "</tr>").join("");
    }
    return html;
}

// Function to display sightings, based on the Date Filter
function filterSighting(property) {
    let filterValue = document.getElementById(property + "Selector").value;
    return (filterValue == "All" || sighting[property] == filterValue);
}

function filterSightings() {
    datetimeFilter = document.getElementById("datetimeSelector").value
    cityFilter = document.getElementById("citySelector").value
    stateFilter = document.getElementById("stateSelector").value
    countryFilter = document.getElementById("countrySelector").value
    shapeFilter = document.getElementById("shapeSelector").value
    let tableData = data.filter(sighting => datetimeFilter == "All" || sighting['datetime'] == datetimeFilter)
                        .filter(sighting => cityFilter == "All" || sighting['city'] == cityFilter)
                        .filter(sighting => stateFilter == "All" || sighting['state'] == stateFilter)                        
                        .filter(sighting => countryFilter == "All" || sighting['country'] == countryFilter)
                        .filter(sighting => shapeFilter == "All" || sighting['shape'] == shapeFilter);
    document.getElementById("sightings").innerHTML = objectList2TableRows(tableData);
    document.getElementById("sightingCount").innerHTML = String(tableData.length) + " " + ((tableData.length > 1) ? "Sightings" : "Sighting");
}

function resetFilters() {
    document.getElementById("datetimeSelector").value = "All"
    document.getElementById("citySelector").value = "All"
    document.getElementById("stateSelector").value = "All"
    document.getElementById("countrySelector").value = "All"
    document.getElementById("shapeSelector").value = "All"
    filterSightings()
}

//populateDateSelection();
populateSelection("datetime", false);
populateSelection("city");
populateSelection("state");
populateSelection("country");
populateSelection("shape");
filterSightings();
