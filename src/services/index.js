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


let obavijest = {
    getAll() {
        return Service.get('/obavijesti/01')
    }
}

let FAQ = {
    getAll() {
        return Service.get('/FAQ')
    }
}

let pitanje01 = {
    getAll() {
        return Service.get('/FAQ/01')
    }
}

let pitanje02 = {
    getAll() {
        return Service.get('/FAQ/02')
    }
}

let glasovanje = {
    getAll() {
        return Service.get('/glasovanje')
    }
}


let glasovanje03 = {
    getAll() {
        return Service.get('/glasovanje/03')
    }
}

let prijava01 = {
    getAll() {
        return Service.get('/prijava-01')
    }
}

let prijava = {

    getAll() {
        return Service.get('/prijava')
    }

}


export { Service, obavijesti, obavijest, FAQ, pitanje01, pitanje02, glasovanje, glasovanje03, prijava, prijava01 }