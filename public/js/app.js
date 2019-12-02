//Client side javascript
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const messageThree = document.querySelector('#messageThree')
const userLocation = document.querySelector('#button2')

userLocation.addEventListener("click", (e)=>{
    messageOne.textContent = 'LOADING...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(setPosition);
        } else {
          messageOne.textContent = "Geolocation is not supported by this browser."
          messageTwo.textContent = ''
          messageThree.textContent = ''
        }
      }
      var latitude = 0
      var longitude = 0

      function setPosition(position){
          latitude = position.coords.latitude
          longitude = position.coords.longitude
      }
      
    fetch('/weather2?lat=' + latitude + '&long=' + longitude).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = 'The temperature is ' + data.forecast.temperature + ' and the chances of rain are ' + data.forecast.precipitation_probability
                messageTwo.textContent = ''
                messageThree = ''
            }
        })
    })

})

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    messageOne.textContent = 'LOADING...'
    messageTwo.textContent = ''

    const location = search.value


    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = 'Your location is ' + data.location
                messageTwo.textContent = 'The temperature is ' + data.forecast.temperature + ' and the chances of rain are ' + data.forecast.precipitation_probability
                messageThree.textContent = ''
            }
        })
    })
})