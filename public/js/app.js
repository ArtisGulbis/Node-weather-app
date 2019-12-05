const HTML = {
    weatherForm: document.querySelector('#form'),
    button: document.querySelector('#button'),
    search: document.querySelector('#search'),
    temp: document.querySelector('#temp'),
    sum: document.querySelector('#sum'),
    rain: document.querySelector('#rain'),
    local: document.querySelector('#local'),
    options: document.querySelector('#languages'),
    loading: document.querySelector('#loading'),
}

const clearScreen = () => {
    HTML.temp.textContent = ''
    HTML.sum.textContent = ''
    HTML.rain.textContent = ''
    HTML.local.textContent = ''
}

let init = false;

if (!init) {
    const optionValue = HTML.options.value
    if (HTML.loading) HTML.loading.textContent = 'Loading...'
    fetch(`/weather?address=Berlin&lang=${optionValue}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                HTML.loading.textContent = data.error
            } else {
                HTML.local.textContent = `Location: ${data.location}`
                HTML.temp.textContent = `Temperature: ${data.temperature} °C`
                HTML.sum.textContent = `Summary: ${data.summary}`
                HTML.rain.textContent = `Chance for rain ${data.precipProbability} %`
                HTML.loading.textContent = ''
                init = true;
            }
        })
    })
}


if (HTML.weatherForm) {

    HTML.weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearScreen()
        const location = HTML.search.value
        const optionValue = HTML.options.value
        if (HTML.loading) HTML.loading.textContent = 'Loading...'
        fetch(`/weather?address=${location}&lang=${optionValue}`).then((response) => {
            response.json().then((data) => {
                HTML.search.value = ''
                if (data.error) {
                    HTML.loading.textContent = data.error
                } else {
                    HTML.local.textContent = `Location: ${data.location}`
                    HTML.temp.textContent = `Temperature: ${data.temperature} °C`
                    HTML.sum.textContent = `Summary: ${data.summary}`
                    HTML.rain.textContent = `Chance for rain ${data.precipProbability} %`
                    HTML.loading.textContent = ''
                }
            })
        })
    })
}

