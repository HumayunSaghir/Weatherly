// Target you elements
let inputField = document.querySelector('.inputField')
let submitButton = document.querySelector('.submitButton')
let cityNameField = document.querySelector('.cityNameField')
let tempField = document.querySelector('.tempField')
let descriptionField = document.querySelector('.descriptionField')
let humidityField = document.querySelector('.humidityField')
let visibilityField = document.querySelector('.visibilityField')
let sunriseField = document.querySelector('.sunriseField')
let sunsetField = document.querySelector('.sunsetField')
let pressureField = document.querySelector('.pressureField')
let form = document.querySelector('form')


// Now make url configurations
let cityName = undefined
let url = "https://api.openweathermap.org/data/2.5/weather?appid=babda1f35623ab73dc6bd92f1d0adbd7&units=metric&q="
let data = undefined
// Halt form behaviour
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    // Get the value from input
    cityName = inputField.value

    // link it with your url
    url = url + cityName
    
    // Now fetch the data from APi
    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((dataInJson)=>{
        console.log("data found!!!")
        data = dataInJson
        console.log(data)
    
        // Update your variables
        cityNameField.innerText = data.name
    
    })
    .catch((error)=>{
        console.log("Operation Failed!")
    })
    
})