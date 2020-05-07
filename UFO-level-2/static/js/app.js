// Class with chainable function(s)
class Sightings {
    constructor() {
        this.sightingArray = data;
    }

    // Chainable Filter Method
    filterBy(property) {
        let filterValue = document.getElementById(property + "Selector").value;
        this.sightingArray = this.sightingArray.filter(sighting => filterValue == "All" || sighting[property] == filterValue);
        return this;
    }

    // Method to generate HTML Table Rows from a list of objects, with direction from Travis Horn (travishorn.com)
    getTableBodyHtml() {
        let html = ""
        if (this.sightingArray.length > 0) {
            let cols = Object.keys(this.sightingArray[0]);
            html = this.sightingArray.map(row => "<tr>" + cols.map(colName => '<td>' + row[colName] + '</td>').join("") + "</tr>").join("");
        }
        return html;
    }

    // Method to display sightings count
    getSightingsCount() {
        return String(this.sightingArray.length) + " " + ((this.sightingArray.length > 1) ? "Sightings" : "Sighting");
    }
}

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

function filterSightings() {
    sightings = new Sightings();
    sightings.filterBy("datetime")
             .filterBy("city")
             .filterBy("state")
             .filterBy("country")
             .filterBy("shape");
    document.getElementById("sightings").innerHTML = sightings.getTableBodyHtml();
    document.getElementById("sightingCount").innerHTML = sightings.getSightingsCount();
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

// Need to integrate d3 event preventDefault().
// Consider using d3 to loop over selectors.