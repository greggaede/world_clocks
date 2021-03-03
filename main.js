const form = document.querySelector('.city_input')
const datalist = form.querySelector('#cities')
const spinner = document.querySelector('.spinner')
const clocks = document.querySelector('.clocks')
const allClocks = []

if (spinner) {
    spinner.classList.add('visible')
}

// Get list of options
fetch(`http://worldtimeapi.org/api/timezone`)
    .then((response) => {
        if (spinner) {
            spinner.classList.remove('visible')
        }

        if (response.status === 200) {
            return response.json()
        } else {
            console.error(`The requested URL responded with a status of ${response.status}`)
            return false
        }
    })
    .then((data) => {
        const datalistMarkup = []

        data.forEach((timezone) => {
            const timezoneLabel = timezone.split('_').join(' ')

            datalistMarkup.push(`
                <option data-value="${timezone}" value="${timezoneLabel}"></option>
            `)
        })

        datalist.innerHTML = datalistMarkup.join('')
    })

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const input = form.querySelector('.city_input__input')

    // TODO: Validate for incorrect input

    if (spinner) {
        spinner.classList.add('visible')
    }

    fetch(`http://worldtimeapi.org/api/timezone/${input.value.split(' ').join('_')}`)
        .then((response) => {
            if (spinner) {
                spinner.classList.remove('visible')
            }

            if (response.status === 200) {
                return response.json()
            } else {
                console.error(`The requested URL responded with a status of ${response.status}`)
                return false
            }
        })
        .then((data) => {
            const timestamp = Date.now()
            const userOffset = new Date(timestamp).getTimezoneOffset()*60
            const localTimestamp = timestamp + (data.raw_offset + data.dst_offset + userOffset)*1000
            const localDateObject = new Date(localTimestamp)

            if (allClocks.length >= 5) {
                allClocks.shift()
            }

            allClocks.push(getClockMarkup(data.timezone, localDateObject))

            clocks.innerHTML = allClocks.join('')

            initClocks()
        })
})