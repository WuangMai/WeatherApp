let apiKey = "a014b0e2a0ce4843bb174047212908";
let city = "Wroclaw";
let apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

async function now() {
    let data = await fetch(apiURL).then(res => res.json());
    let {location, current} = data;
    // console.log(current);
    document.querySelector(".weather__icon img")
        .setAttribute("src", current.condition.icon);

    document.querySelector(".city__name").innerText = location.name;
    document.querySelector(".temperature__value").innerText = current.temp_c;
    document.querySelector(".pressure__value").innerText = `${current.pressure_mb} hPa`;
    document.querySelector(".humidity__value").innerText = `${current.humidity}%`;
    document.querySelector(".wind-speed__value").innerText = ` ${current.wind_kph} km/h`;
}

async function forecast() {
    let data = await fetch(apiURL).then(res => res.json());
    let ul = document.querySelector(".weather__forecast");

    ul.innerHTML = "";
    data.forecast.forecastday.forEach(el => {
        const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
        let dayOfWeek = new Date(el.date);
        ul.innerHTML += (
            `<li>
                <span class="day">${days[dayOfWeek.getDay()]}</span>
                <img src="${el.day.condition.icon}"/>
                <span class="temperature">                    
                <span class="temperature__value">${el.day.maxtemp_c}</span>&deg;C
                </span>
            </li>`
        )
    });
}

now();
forecast();