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

export function debouncing(func, timeout = 1000) {
    console.log('debouncing')
    let timer 
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export default validation