
let app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        document.getElementById('getlocation').addEventListener("click", app.getLocation);
    },
    getLocation: function () {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    fetchData:async function  (URL) {
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
        document.getElementById('location').innerHTML = 'Your Location : ' + (data.name);
        document.getElementById('temprature').innerHTML = 'Temprature : ' + (data.main.temp-273);
        document.getElementById('weather').innerHTML = 'Weather : ' + (data.weather[0].main);
    },
    setTemperature: function (latitude, longitude) {
        const API_KEY = 'fbe890b70456b87c430d2ec95b61fc79';
        const URL = 'https://api.openweathermap.org/data/2.5/weather?appid=' + API_KEY + '&lat=' + latitude + '&lon=' + longitude;  
        this.fetchData(URL);      
    },
    onSuccess: function (position) {
        app.setTemperature(position.coords.latitude, position.coords.longitude);
    },
    onError: function (error) {
        alert(JSON.stringify(error));
        console.log('code:' + error.code + 'message: ' + error.message);
    }
};
app.initialize();