// const url = 'https://api.giphy.com/v1/gifs/translate?api_key=xCZ25Ja3qe7fqxht4zYzUv6RxqvCG278&s='
const apiKey = '3G8BBA254R7VWQGNAYBY8ZMQU';
const weatherUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const queryParams = `?unitGroup=metric&key=${apiKey}&contentType=json`

const getWeather = async function (location, date) {
    try {
        const query = weatherUrl + location + "/" + date + queryParams;
        const response = await fetch(query);
        const responseJson = await response.json();
        console.log("the query is " + query)
        console.log(responseJson)
        return responseJson;
    } catch (error) {
         console.log(error)
    }
}

const DOMController = (function () {
    const locationInput = document.getElementById("location-input");
    const dateInput = document.getElementById("date");
    dateInput.valueAsDate = new Date();
    const button = document.querySelector("button")
    const responseDom = document.getElementById("response-main") // This is not used in the new implementation.
    const responseDescriptionText = document.getElementById("response-description-text");
    const responseTemperatureText = document.getElementById("response-temperature-text");
    const responseLoading = document.getElementById("response-loading");


    const getSearchValues = function () {
        const location = locationInput.value;
        const date = dateInput.value;
        return {location, date}
    }

    const clearResults = function () {
        if (responseDescriptionText) responseDescriptionText.textContent = "";
        if (responseTemperatureText) responseTemperatureText.textContent = "";
    }

    const showLoading = function () {
        if (responseLoading) responseLoading.style.display = "block";
    }

    const hideLoading = function () {
        if (responseLoading) responseLoading.style.display = "none";
    }

    const updateUI = function (data) {
        if (!data || !data.days || data.days.length === 0) {
            if (responseDescriptionText) responseDescriptionText.textContent = "No weather data available.";
            if (responseTemperatureText) responseTemperatureText.textContent = "";
            return;
        }

        const conditions = data.days[0].description;
        const tempMin = data.days[0].tempmin;
        const tempMax = data.days[0].tempmax;
        const precipProb = data.days[0].precipprob; // Probability of precipitation
        const precip = data.days[0].precip; // Total precipitation amount

        let rainAnswer = "";
        if (precip > 0 || precipProb > 70) {
            rainAnswer = "Yes. ";
        } else if (precipProb > 20) {
            rainAnswer = "Probably Yes. ";
        } else if (precipProb === 0) {
            rainAnswer = "No. ";
        } else {
            rainAnswer = "Probably No. ";
        }

        if (responseDescriptionText) {
            responseDescriptionText.textContent = rainAnswer + conditions;
        }
        if (responseTemperatureText) {
            responseTemperatureText.textContent = `Temperature: ${tempMin}°C - ${tempMax}°C`;
        }
    }

    return {button, updateUI, getSearchValues, clearResults, showLoading, hideLoading};



})();

const eventHandler = (function () {
    const checkWeather = function () {
        const searchValues = DOMController.getSearchValues();
        DOMController.clearResults();
        DOMController.showLoading();

        getWeather(searchValues.location, searchValues.date)
            .then(response => DOMController.updateUI(response))
            .finally(() => {
                DOMController.hideLoading();
            });
    }

    return {checkWeather}
})();

(function () { 
    document.addEventListener('DOMContentLoaded', () => {
        const button = document.querySelector("button");
        if (button) { 
            button.addEventListener("click", eventHandler.checkWeather);
        } else {
            console.error("Button not found! Cannot attach click listener.");
        }
    });
})();