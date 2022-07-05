const orderBy = (array, key, order = 'asc') => {
    array.sort((a, b) => {
        if (a[key] instanceof Date && b[key] instanceof Date) {
            return a[key].getTime() - b[key].getTime()
        }

        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return a[key] - b[key]
        }

        return new Intl.Collator().compare(a[key], b[key])
    })

    return order === 'desc' ? array.reverse() : array
}

export default orderBy
