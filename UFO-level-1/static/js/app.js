// from data.js
var tableData = data;
var filter_datetime = "";

function populate_date_dropdown() {
    var unique_dates = new Array();
    console.log("In populate_date_dropdown.")
    let sDateOptions = `<option selected value="All">All</option>`
    for (const sighting of data) {
        if (!unique_dates.includes(sighting.datetime)) {
            unique_dates.push(sighting.datetime);
            sDateOptions += `<option value="${sighting.datetime}">${sighting.datetime}</option>`
        }   
    }
    document.getElementById("date-selector").innerHTML = sDateOptions
}

function filter_by_date(sighting) {
    return sighting.datetime == filter_datetime;
}

function data_to_html() {
    let body = "";
    for (let i = 0; i < tableData.length; i++) {
        body += "<tr>";
        for (let j in tableData[i]) {
            body += "<td>" + tableData[i][j] + "</td>";
        }
        body += "</tr>";
    }
    document.getElementById("sightings").innerHTML = body;
}

function filter_table() {
    console.log("In filter_table");
    filter_datetime = document.getElementById("date-selector").value;
    if (filter_datetime == "All")
        tableData = data;
    else
        tableData = data.filter(filter_by_date);
    data_to_html();
    display_count()
}

function display_count() {
    document.getElementById("sighting-count").innerHTML = String(tableData.length) + " Sightings"
}

populate_date_dropdown()
data_to_html()
display_count()
