
let app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        document.getElementById('getweather').addEventListener("click", app.getLocation);
    },
    getLocation: function () {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    onSuccess: function (position) {
        app.setTemperature(position.coords.latitude, position.coords.longitude);
    },
    onError: function (error) {
        alert(JSON.stringify(error));
        console.log('code:' + error.code + 'message: ' + error.message);
    },
    setTemperature: function (latitude, longitude) {
        const API_KEY = 'fbe890b70456b87c430d2ec95b61fc79';
        const URL = 'https://api.openweathermap.org/data/2.5/weather?appid=' + API_KEY + '&lat=' + latitude + '&lon=' + longitude;
        app.fetchData(URL);
    },
    fetchData: async function (URL) {
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
        app.setHtml(data);
    },
    setHtml(data){
        document.getElementById('location').innerHTML = 'Your Location: ' + (data.name);
        document.getElementById('temprature').innerHTML = 'Temprature: ' + (data.main.temp - 273).toFixed(1);
        document.getElementById('weather').innerHTML = 'Weather: ' + (data.weather[0].main);
        app.setBackground(data.weather[0].main);
    },
    setBackground(weather) {
        switch (weather) {
            case "Rain":
                app.setRainyDay();
                break;
            case "Clouds":
                app.setCloudDay();
                break;
        }
    },
    setRainyDay() {
        document.body.style.background = "url('https://marshallslocuminn.com/wp-content/uploads/2015/09/creative-rain_01.jpg')";
        document.body.style.color = "#FFFFFF";
    },
    setCloudDay() {
        document.body.style.background = "url('https://d43fweuh3sg51.cloudfront.net/media/assets/buac17-vid-cloudsweather-poster_UGzoJnD.png')";
        document.body.style.color = "#FFFFFF";
    }
};
app.initialize();