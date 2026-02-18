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
    const responseDom = document.getElementById("response-main")


    const getSearchValues = function () {
        const location = locationInput.value;
        const date = dateInput.value;
        return {location, date}
    }

    const updateUI = function (data) {
        if (!responseDom) return;
        responseDom.textContent = data.latitude;

    }

    return {button, updateUI, getSearchValues};



})();

const eventHandler = (function () {
    const checkWeather = function () {
        const searchValues = DOMController.getSearchValues();
        getWeather(searchValues.location, searchValues.date)
            .then(response => DOMController.updateUI(response))
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