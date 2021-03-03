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

    let optionFound = false

    // Search for input value among available option
    datalist.querySelectorAll('option').forEach((option) => {
        if (option.value === input.value || option.dataset.value === input.value) {
            optionFound = true
        }
    })

    // If input value was not found in options, display message and mark field as invalid
    if (!optionFound) {
        input.classList.add('city_input__input--invalid')
        alert('Timezone not found!')
        return false
    } else {
        input.classList.remove('city_input__input--invalid')
    }

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
            const currentClockElems = clocks.querySelectorAll('.clock')

            let matchFound = false

            // Look for matching timezones among the currently displayed clocks
            currentClockElems.forEach((clock) => {
                if (clock.dataset.timezone === data.timezone) {
                    matchFound = true
                }
            })

            // Only add a new clock if no matching timezone was found
            if (!matchFound) {
                if (allClocks.length >= 5) {
                    allClocks.shift()
                }

                allClocks.push(getClockMarkup(data.timezone, localDateObject))

                clocks.innerHTML = allClocks.join('')

                initClocks()
            } else {
                // Display message that the clock already exists
                alert('That clock already exists!')
            }

            form.reset()
        })
})