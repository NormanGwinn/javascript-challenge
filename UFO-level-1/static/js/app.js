// Function to populate a select element with valid dates from the sightings data
function populateDateSelection() {
    var unique_dates = new Array();
    let sDateOptions = `<option selected value="All">All</option>`
    for (const sighting of data) {
        if (!unique_dates.includes(sighting.datetime)) {
            unique_dates.push(sighting.datetime);
            sDateOptions += `<option value="${sighting.datetime}">${sighting.datetime}</option>`
        }   
    }
    document.getElementById("dateSelector").innerHTML = sDateOptions
}

// Utility function to generate HTML Table Rows from a list of objects, with direction from Travis Horn (travishorn.com)
function objectList2TableRows(objectList) {
    let cols = Object.keys(objectList[0]);
    return objectList.map(row => "<tr>" + cols.map(colName => '<td>' + row[colName] + '</td>').join("") + "</tr>").join("");
}

// Function to display sightings, based on the Date Filter
function filterTable() {
    let filter_datetime = document.getElementById("dateSelector").value;
    let tableData = Array();
    if (filter_datetime == "All")
        tableData = data;
    else
        tableData = data.filter(sighting => sighting.datetime == filter_datetime);
    document.getElementById("sightings").innerHTML = objectList2TableRows(tableData);
    document.getElementById("sightingCount").innerHTML = String(tableData.length) + " Sightings"
}

populateDateSelection();
filterTable();
