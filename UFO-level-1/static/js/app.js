// from data.js
var tableData = data;
var filter_datetime = "";

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
    filter_datetime = document.getElementById("datetime").value;
    tableData = data.filter(filter_by_date);
    console.log(`The filter date is ${filter_datetime}.`);
    console.log(`The length of all sightings is ${data.length}.`);
    console.log(`The length of filtered sightings is ${tableData.length}.`);
    data_to_html();
}

data_to_html()
