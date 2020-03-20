import * as lf from 'localforage'

function insert(key, data) {
    return lf.setItem(key, data)
}

function get(key) {
    return lf.getItem(key)
}

export { insert, get }