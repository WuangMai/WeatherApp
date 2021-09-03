let apiKey = "a014b0e2a0ce4843bb174047212908";
let city = "auto:ip";
let apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

async function now() {
    let data = await fetch(apiURL).then(res => res.json());
    let {location, current} = data;

    let img = current.condition.text.toLowerCase().replace(" ", "-");
    let now = new Date().getHours();
    document.querySelector(".weather__icon img")
        .setAttribute("src", `assets/icons/${img}${now > 6 && now < 18 ? "-day" : "-night"}.svg`);

    document.querySelector(".city__name").innerText = location.name;
    document.querySelector(".temperature__value").innerText = current.temp_c;
    document.querySelector(".pressure__value").innerText = `${current.pressure_mb} hPa`;
    document.querySelector(".humidity__value").innerText = `${current.humidity}%`;
    document.querySelector(".wind-speed__value").innerText = ` ${current.wind_kph} km/h`;
}

async function forecast(){
    let data = await fetch(apiURL).then(res => res.json());
    let {forecast} = data;
    let ul = document.querySelector(".weather__forecast");
    let newLi = document.createElement("li");

    let spanDay = document.createElement("span");
    spanDay.classList.add("day");
    let date = forecast.forecastday[0].date;
    let weekday = new Date(date);
    spanDay.innerText = weekday.toLocaleDateString("pl-PL",{weekday: 'long'});



    let img = document.createElement("img");
    let spanTemp = document.createElement("span");


    spanTemp.classList.add("temperature");
    spanTemp.classList.add("temperature__value");

    newLi.appendChild(spanDay).appendChild(img).appendChild(spanTemp);
    ul.appendChild(newLi);


    console.log(forecast);
}

now();
forecast();