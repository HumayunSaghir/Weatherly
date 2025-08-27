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
let feelsLikeField = document.querySelector('.feelsLikeField')
let form = document.querySelector('form')
let main = document.querySelector('.main')
let mainBody = document.querySelector('.mainBody')
let mainLogo = document.querySelector('.mainLogo')

// Now make url configurations
let cityName = undefined
let urlMain = "https://api.openweathermap.org/data/2.5/weather?appid=babda1f35623ab73dc6bd92f1d0adbd7&units=metric&q="
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
        // Update your data.
        data = dataInJson
    
        // show the weather display
        mainBody.style.display = 'flex'

        // Update variables
        cityNameField.innerText = data.name
        
        // Temperature field in fixed digit and in degree celsius.
        let tempValue = data.main.temp
        tempValue = Math.round(tempValue)
        tempField.innerText = `${tempValue}°C`
        
        // Update weather logo on the basis of weather condition
        descriptionField.innerText = data.weather[0].description
        console.log(descriptionField.innerText)
        if(descriptionField.innerText == "overcast clouds"){
            mainLogo.setAttribute('src', './assets/cloud.png')
        }
        else if(descriptionField.innerText == "clear sky"){
            mainLogo.setAttribute('src', './assets/sunny.png')
        }
        else if(descriptionField.innerText == "light rain"){
            mainLogo.setAttribute('src', './assets/lightrain.png')
        }

        // Update other variables
        feelsLikeField.innerText = `Feels Like: ${data.main.feels_like}°C`
        humidityField.innerText = `Humidity: ${data.main.humidity}%`
        visibilityField.innerText = `Visibility: ${data.visibility}m`

        // Properly show sunset and sunrise in their fields
        let sunrise = new Date(data.sys.sunrise * 1000)
        sunriseField.innerText = `Sunrise:${sunrise.toLocaleTimeString()}`
        let sunset = new Date(data.sys.sunset * 1000)
        sunsetField.innerText = `Sunset:${sunset.toLocaleTimeString()}`

        // Update other variables
        pressureField.innerText = `Pressure:${data.main.pressure} hPa`
    })
    .catch((error)=>{
        console.log("Operation Failed!")
    })
    .finally(function(){
        // Reset url to its orignal template
        url = urlMain
    })
    
})