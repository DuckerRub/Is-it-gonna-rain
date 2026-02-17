const apiKey = '3G8BBA254R7VWQGNAYBY8ZMQU';

console.log(apiKey);

const url = 'https://api.giphy.com/v1/gifs/translate?api_key=xCZ25Ja3qe7fqxht4zYzUv6RxqvCG278&s='

async function getGif() {
    try {
        const response = await fetch(url + input.value);
        const image = await response.json()
        img.src = image.data.images.original.url;
    } catch (error) {
        img.src = 'https://media4.giphy.com/media/v1.Y2lkPTI5YzlhZmZmNW11bGp1NDYxdGZsOGk1d2YydmV1MjdmY2w5Z2QzNWVpYjB4eHdkdiZlcD12MV9naWZzX3RyYW5zbGF0ZSZjdD1z/ZCksvzEfEMFPy9NhqW/giphy.gif' 
    }
}

button.addEventListener("click", () => {
    getGif()
})

// FIRST STEP: DESIGN YOUR APP ON FIGJAM