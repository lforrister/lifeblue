export function debouncing(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export function formatDateString(date, options) {
    let formatted = date.replace(/-/g, '/')
    let newDate = new Date(formatted).toLocaleString('en-US', options)
    return newDate
}

export function formatDateHyphen(date) {
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = date.getFullYear()

    if (month < 10) {
        month = '0' + month.toString()
    }

    if (day < 10) {
        day = 0 + day.toString()
    }

    let formatted = `${year}-${month}-${day}`
    return formatted
}

export function validation(type, input) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let regex

    switch (type) {
        case 'email':
            regex = emailRegex
            break
        case 'phone':
            regex = phoneRegex
            break
    }

    if (regex) {
        if (input.match(regex)) {
            return true
        } else {
            return false
        }
    }

    return
}

export default { debouncing, formatDateHyphen, formatDateString, validation }
