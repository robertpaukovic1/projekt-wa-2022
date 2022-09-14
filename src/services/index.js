import axios from 'axios'

let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
})

let obavijesti = {
    getAll() {
        return Service.get('/obavijesti')
    }
}

let FAQ = {
    getAll() {
        return Service.get('/FAQ')
    }
}

let glasovanje = {
    getAll() {
        return Service.get('/glasovanje')
    }
}

let prijava = {

    getAll() {
        return Service.get('/prijava')
    }

}


export { Service, obavijesti, FAQ, glasovanje, prijava }