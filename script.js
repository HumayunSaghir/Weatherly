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
let errorInputs = document.querySelector('.errorInputs')
let cityNotFound = document.querySelector('.cityNotFound')

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

        if(response.status == "200"){
            return response.json()
        }

        else if(response.status == "400"){
            mainBody.style.display = 'none'
            cityNotFound.style.display = 'flex'
            errorInputs.innerText = "Invalid Request!"
            return undefined
        }

        else if(response.status == "403"){
            mainBody.style.display = 'none'
            cityNotFound.style.display = 'flex'
            errorInputs.innerText = "Service Not Available. Try Again Later!"
            return undefined
        }

        else if(response.status == "404"){
            mainBody.style.display = 'none'
            cityNotFound.style.display = 'flex'
            errorInputs.innerText = "Not City Found!"
            return undefined
        }

        else if(response.status == "408"){
            mainBody.style.display = 'none'
            cityNotFound.style.display = 'flex'
            errorInputs.innerText = "Request Timeout. Try Again"
            return undefined
        }

        else if(response.status == "503"){
            mainBody.style.display = 'none'
            cityNotFound.style.display = 'flex'
            errorInputs.innerText = "Service Not Available. Try Again Later!"
            return undefined
        }

        else if(response.status == "401"){
            mainBody.style.display = 'none'
            cityNotFound.style.display = 'flex'
            errorInputs.innerText = "API limit exceeded. Try Again Later!"
            return undefined
        }

        else if(response.status == "429"){
            mainBody.style.display = 'none'
            cityNotFound.style.display = 'flex'
            errorInputs.innerText = "Too Many Requests. Try Again Later!"
            return undefined
        }

    })

    .then((dataInJson)=>{

        // in this case i am not able to find data.
        if(dataInJson !== undefined && dataInJson !== null){
            // Update your data.
            data = dataInJson
    
            // show the weather display
            mainBody.style.display = 'flex'

            // Hide the error field
            cityNotFound.style.display = 'none'


            // Update variables
            cityNameField.innerText = data.name
        
            // Temperature field in fixed digit and in degree celsius.
            let tempValue = data.main.temp
            tempValue = Math.round(tempValue)
            tempField.innerText = `${tempValue}°C`
        
            // Update weather logo on the basis of weather condition
            descriptionField.innerText = data.weather[0].description
            
            
            if(descriptionField.innerText === "overcast clouds"){
                mainLogo.setAttribute('src', './assets/cloud.png')
                main.style.backgroundImage = "url('./assets/rainyBackground.png')"
            }

            else if(descriptionField.innerText === "clear sky"){
                main.style.backgroundImage = "url('./assets/clearSky.png')"
                mainLogo.setAttribute('src', './assets/sunny.png')
            } 

            else if(descriptionField.innerText === "light rain"){
                mainLogo.setAttribute('src', './assets/lightrain.png')
                main.style.backgroundImage = "url('./assets/thunder.png')"
            }

            else if(descriptionField.innerText === "scattered clouds"){
                main.style.backgroundImage = "url('./assets/sepClouds.png')"
            }

            else if(descriptionField.innerText === "broken clouds"){
                main.style.backgroundImage = "url('./assets/brokenClouds.png')"
            }

            else if(descriptionField.innerText === "few clouds"){
                main.style.backgroundImage = "url('./assets/fewClouds.png')"
            }

            else{
                main.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiIjSLw9LPY-GEYrMZ_CyBYvX9ZVrH8QowgQ&s')"
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
        }
    })

    .catch((error)=>{
        console.log("Operation Failed!")
    })

    .finally(function(){
        // Reset url to its orignal template
        url = urlMain
        inputField.value = ""
    })
    
})