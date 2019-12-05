

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const options = document.querySelector('#languages')
let init = false;

if (!init) {
    const optionValue = options.value
    if (messageOne) messageOne.textContent = 'Loading...'
    if (messageTwo) messageTwo.textContent = ''
    fetch(`/weather?address=Berlin&lang=${optionValue}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                init = true;
            }
        })
    })
}


if (weatherForm) {
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = search.value
        const optionValue = options.value
        search.innerHTML = ''

        if (messageOne) messageOne.textContent = 'Loading...'
        if (messageTwo) messageTwo.textContent = ''
        fetch(`/weather?address=${location}&lang=${optionValue}`).then((response) => {
            response.json().then((data) => {
                console.log(data);
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
}