const HTML = {
    weatherForm: document.querySelector('#form'),
    search: document.querySelector('#search'),
    languages: document.querySelector('#languages'),
    button: document.querySelector('#button'),
    loading: document.querySelector('#loading'),
    time: document.querySelector('#time'),
    summary: document.querySelector('#summary'),
    moonPhase: document.querySelector('#moonPhase'),
    moonDescription: document.querySelector('#moonDescription'),
    tempMin: document.querySelector('#temperatureMin'),
    tempMax: document.querySelector('#temperatureMax'),
    currentTemp: document.querySelector('#temperature'),
}

const clearScreen = () => {
    HTML.time.textContent = '';
    HTML.summary.textContent = '';
    HTML.moonPhase.textContent = '';
    HTML.moonDescription.textContent = '';
    HTML.tempMin.textContent = '';
    HTML.tempMax.textContent = '';
    HTML.currentTemp.textContent = '';
}

function Unix_timestamp(t) {
    var dt = new Date(t * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
}

function formatMoon() {

}

function replaceContent(data) {
    HTML.time.textContent = `Time: ${Unix_timestamp(data.time)} ${data.timezone}`;
    HTML.summary.textContent = `Summary: ${data.summary}`;
    HTML.moonPhase.textContent = `Moon Phase: ${data.moonPhase}`;
    HTML.moonDescription.textContent = '(0->new moon, 0.25-> first quarter, 0,5 -> half full ...)';
    HTML.currentTemp.textContent = `Current Temperature: ${data.temperature}°C`;
    HTML.tempMin.textContent = `Min Temperature: ${data.temperatureLow}°C`;
    HTML.tempMax.textContent = `Max Temperature: ${data.temperatureHigh}°C`;
    HTML.loading.textContent = ''
}

let init = false;

//FIRST TIME YOU RUN THE PAGE!!!!
if (!init) {
    clearScreen();
    const optionValue = HTML.languages.value
    if (HTML.loading) HTML.loading.textContent = 'Loading...'
    fetch(`/weather?address=Berlin&lang=${optionValue}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                HTML.loading.textContent = data.error
            } else {
                replaceContent(data);
                init = true;
            }
        })
    })
}




//THE ACTUAL FETCH REQUEST
if (HTML.weatherForm) {

    HTML.weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearScreen();
        const location = HTML.search.value
        const optionValue = HTML.languages.value
        if (HTML.loading) HTML.loading.textContent = 'Loading...'
        fetch(`/weather?address=${location}&lang=${optionValue}`).then((response) => {
            response.json().then((data) => {
                HTML.search.value = ''
                if (data.error) {
                    HTML.loading.textContent = data.error
                } else {
                    replaceContent(data);
                }
            })
        })
    })
}

