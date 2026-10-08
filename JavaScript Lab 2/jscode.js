// Exercise 1

document.getElementById("interestButton").addEventListener("click", function () {

    let interests = document.getElementById("interests").value;

    if (!interests.includes(",")) {
        document.getElementById("interestOutput").innerHTML =
            "Please enter a comma separated list.";
    } else {
        document.getElementById("interestOutput").innerHTML =
            "Your interests: " + interests;
    }

});


// Exercise 2

let benchmarkSelect = document.getElementById("benchmark");

fetch("https://geocoding.geo.census.gov/geocoder/benchmarks")
    .then(response => response.json())
    .then(data => {

        data.benchmarks.forEach(function (benchmark) {

            let option = document.createElement("option");

            option.value = benchmark.id;
            option.text = benchmark.benchmarkName;

            benchmarkSelect.appendChild(option);

        });

    });


document.getElementById("submitAddress").addEventListener("click", function () {

    let address = document.getElementById("address").value;
    let benchmark = document.getElementById("benchmark").value;

    let url =
        "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress" +
        "?address=" + encodeURIComponent(address) +
        "&benchmark=" + benchmark +
        "&format=json";

    fetch(url)
        .then(response => response.json())
        .then(data => {

            let match = data.result.addressMatches[0];

            let matchedAddress = match.matchedAddress;
            let longitude = match.coordinates.x;
            let latitude = match.coordinates.y;

            document.getElementById("locationOutput").innerHTML =
                "Matched Address: " + matchedAddress +
                "<br>Latitude: " + latitude +
                "<br>Longitude: " + longitude;

            let apiKey = "AIzaSyAyvWMWA82-To-mOGv_oacqD0osXq-Rqfo";

            document.getElementById("map").src =
                "https://www.google.com/maps/embed/v1/place" +
                "?key=" + apiKey +
                "&q=" + encodeURIComponent(matchedAddress) +
                "&center=" + latitude + "," + longitude;

        });

});