// Function to populate a select element with valid dates from the sightings data
function populateDateSelection() {
    var uniqueDates = new Array();
    let sDateOptions = `<option selected value="All">All</option>`
    for (const sighting of data) {
        if (!uniqueDates.includes(sighting.datetime)) {
            uniqueDates.push(sighting.datetime);
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
    let filterDatetime = document.getElementById("dateSelector").value;
    let tableData = Array();
    if (filterDatetime == "All")
        tableData = data;
    else
        tableData = data.filter(sighting => sighting.datetime == filterDatetime);
    document.getElementById("sightings").innerHTML = objectList2TableRows(tableData);
    document.getElementById("sightingCount").innerHTML = String(tableData.length) + " Sightings"
}

populateDateSelection();
filterTable();
