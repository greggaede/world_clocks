// Clock copied from https://codepen.io/kylewetton/pen/QJbOjw
const setTime = (clock, left, hand) => {
    clock.querySelector(`.clock__${hand}`).style.animationDelay = `${left * -1}s`
}

const getSecondsToday = (time) => {
    const newDate = new Date(time)
    const today = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
    const diff = newDate - today

    return Math.round(diff / 1000)
}

const initClocks = () => {
    const clockElems = document.querySelectorAll('.clock')

    clockElems.forEach((clock) => {
        const currentSec = getSecondsToday(clock.dataset.time)

        const seconds = (currentSec / 60) % 1
        const minutes = (currentSec / 3600) % 1
        const hours = (currentSec / 43200) % 1

        setTime(clock, 60 * seconds, "second")
        setTime(clock, 3600 * minutes, "minute")
        setTime(clock, 43200 * hours, "hour")

        // If there is more than one clock,
        // add click event for checking differences between clocks
        if (clockElems.length > 1) {
            clock.onclick = () => {
                clockElems.forEach((_clock) => {
                    let timeDifference = ''

                    if (_clock !== clock) {
                        const currentClockDate = new Date(_clock.dataset.time)
                        const activeClockDate = new Date(clock.dataset.time)
                        const dateDiffSeconds = Math.round((currentClockDate - activeClockDate) / 3600000)

                        timeDifference = `Time difference: ${dateDiffSeconds} hour(s)`
                    }

                    _clock.previousElementSibling.querySelector('.clocks__timediff').innerHTML = timeDifference
                })
            }
        }
    })
}

const getClockMarkup = (timezone, time) => {
    return `
        <h1 class="clocks__headline"><span>${timezone.split('_').join(' ').replace('/', '/&#8203;')}</span><span class="clocks__timediff"></span></h1>
        <div class="clock" data-timezone="${timezone}" data-time="${time}">
            <div class="clock__second"></div>
            <div class="clock__minute"></div>
            <div class="clock__hour"></div>
            <div class="clock__axis"></div>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
            <section class="clock__indicator"></section>
        </div>
    `
}
