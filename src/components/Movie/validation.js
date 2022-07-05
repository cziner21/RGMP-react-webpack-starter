export const validateTitle = (value) => {
    let error
    if (!value || value.length < 0) {
        error = 'Required'
    }
    return error
}

export const validatePosterPath = (value) => {
    let error
    if (!value) {
        error = 'Required'
    }

    if (!isValidURL(value)) {
        error = 'Invalid URL'
    }

    return error
}

export const validateOverview = (value) => {
    let error
    if (!value) {
        error = 'Required'
    }

    return error
}

export const validateRuntime = (value) => {
    let error

    if (isNaN(value)) {
        error = 'Not a number'
    }

    if (!value) {
        error = 'Required'
    }

    if (value && value < 0) {
        error = 'Value must be at least 0'
    }

    return error
}

export const validateGenres = (value) => {
    let error
    if (value === null || value.length === 0) {
        error = 'Required'
    }

    return error
}

const isValidURL = (url) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        url
    )
}
