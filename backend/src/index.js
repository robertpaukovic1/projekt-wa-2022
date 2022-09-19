import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import cors from 'cors'
import obavijesti from './obavijesti'
import FAQ from './FAQ'
import glasovanje from './glasovanje'
import prijava from './prijava_kandidata';

const app = express();

dotenv.config();

const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors())

//Za demonstraciju ispravnosti

app.get('/', (req, res) => {
    res.send("Pozdrav iz web preglednika!")
    console.log("Pozdrav iz konzole!")
})

//Obavijesti  

//GET metoda

app.get('/obavijesti', (req, res) => {  //dohvaćanje svih obavijesti 
    res.status(200);
    res.send(obavijesti)
})

app.get('/obavijesti/01', (req, res) => { //dohvaćanje samo jedne obavijesti  
    res.status(200);
    res.send(obavijesti.novo[0]);
});

app.get('/obavijesti/02', (req, res) => { //dohvaćanje teksta jedne obavijesti
    res.status(200);
    res.send(obavijesti.novo[2].tekst);
});

app.get('/naziv', (req, res) => {  //dohvaćanje naslova i uvodnog teksta
    res.status(200);
    res.send(obavijesti.naziv);
});

app.get('/naziv/naslov', (req, res) => {  //dohvaćanje samo naslova
    res.status(200);
    res.send(obavijesti.naziv.naslov);
});

app.get('/naziv/tekst', (req, res) => {  //dohvaćanje teksta
    res.status(200);
    res.send(obavijesti.naziv.tekst);
});

//POST metoda  

app.post('/obavijesti', (req, res) => { //upis i objava nove obavijesti 

    let poruka = req.body;
    obavijesti.novo.push(poruka)
    res.json("OK")

})

//PUT metoda 

app.put('/obavijesti/:id', (req, res) => { //izmjena postojeće obavijesti 
    res.json({
        id: req.params.id,
        tekst: req.body.tekst
    });
    res.json("OK")
})

//DELETE metoda   

app.delete('/obavijesti/:id', (req, res) => {   //brisanje postojeće obavijesti 

    res.json({ msg: `Poruka ${req.params.id} je obrisana` });

})


// Česta pitanja   

//GET metoda   

app.get('/FAQ', (req, res) => {  //Dohvaćanje svih čestih pitanja 
    res.status(200);
    res.json(FAQ)
});

app.get('/FAQ/01', (req, res) => {  //Dohvaćanje prvog pitanja
    res.status(200);
    res.json(FAQ.questions[0])
});

app.get('/FAQ/02', (req, res) => {  //Dohvaćanje drugog pitanja
    res.status(200);
    res.json(FAQ.questions[1])
});

app.get('/FAQ/03', (req, res) => {  //Dohvaćanje trećeg pitanja
    res.status(200);
    res.json(FAQ.questions[2])
});

app.get('/FAQ/question', (req, res) => {  //Dohvaćanje samo pitanja iz trećeg elementa
    res.status(200);
    res.json(FAQ.questions[3].question)
});

app.get('/FAQ/question01', (req, res) => {  //Dohvaćanje pitanja iz trećeg elementa
    res.status(200);
    res.json(FAQ.questions[3].question)
});


app.get('/FAQ/question02', (req, res) => {  //Dohvaćanje odgovora iz četvrtog elementa
    res.status(200);
    res.json(FAQ.questions[4].answer)
});

//POST metoda  

app.post('/FAQ', (req, res) => { //Objava novog učestalog pitanja 
    let pitanje = req.body;
    FAQ.questions.push(pitanje)
    res.json("OK")


})


// Glasovanje  


//GET metoda   

app.get('/glasovanje', (req, res) => {  //dohvaćanje svih glasača  
    res.status(200);
    res.json(glasovanje);
})

app.get('/glasovanje/03', (req, res) => {  //dohvaćanje trećeg glasača
    res.status(200);
    res.json(glasovanje.glasaci[3]);
})

app.get('/glasovanje/04', (req, res) => { //dohvaćanje imena četvrtog glasača
    res.status(200);
    res.json(glasovanje.glasaci[4].ime);
})

app.get('/glasovanje/04a', (req, res) => { //dohvaćanje prezimena četvrtog glasača
    res.status(200);
    res.json(glasovanje.glasaci[4].prezime);
})

app.get('/glasovanje-status', (req, res) => {
    res.status(200);
    res.json(glasovanje.glasaci[4].status_korisnika)
})


app.get('/glasovanje/pretraga', (req, res) => {

    let ime = req.query.ime

    let prezime = req.query.prezime

    let glas = glasovanje.glasaci;

    if (ime) {
        glas = glas.filter(e => {
            return e.ime.indexOf(ime) >= 0
        });
    }

    if (prezime) {
        glas = glas.filter(e => {
            return e.prezime.indexOf(prezime) >= 0
        });
    }

    res.status(200);
    res.json(glas);

})

//POST metoda  

app.post('/glasovanje', (req, res) => {  //uvođenje novog glasača 

    let korisnik = req.body;
    glasovanje.glasaci.push(korisnik)
    res.send("OK")

});

app.post('/glasovanje-ime', (req, res) => { //navođenje imena jednog glasača 

    if (!req.body.ime) {
        return res.status(400).send('Potrebno je navesti ime');
    }
    res.status(201).send(`Hvala ${req.body.ime}`);
});


app.post('/glasovanje-prezime', (req, res) => { //navođenje prezimena jednog glasača

    if (!req.body.prezime) {
        return res.status(400).send('Potrebno je navesti prezime');
    }
    res.status(201).send(`Hvala ${req.body.prezime}`);
});

app.post('/glasovanje-email', (req, res) => { //provjera prijave glasača, njegov email

    if (!req.header('x-auth-token')) {
        return res.status(400).send('No token');
    }

    if (req.header('x-auth-token') !== 'vkardum@uniri.hr') {
        return res.status(401).send('Not authorised');
    }

    res.send('Logged in');

});

app.post('/glasovanje-password', (req, res) => { //provjera prijave glasača, njegova lozinka

    if (!req.header('x-auth-token')) {
        return res.status(400).send('No token');
    }

    if (req.header('x-auth-token') !== 'kardum61') {
        return res.status(401).send('Not authorised');
    }

    res.send('Logged in');

});


//PUT metoda  

app.put('/glasovanje/:OIB', (req, res) => { //izmjena podataka postojećeg glasača
    res.json({
        OIB: req.params.OIB,
        ime: req.body.ime,
        prezime: req.body.prezime,
        grad_prebivalista: req.body.grad_prebivalista,
        status_korisnika: req.body.status_korisnika,
        ustanova: req.body.ustanova
    });

    res.status(201);
})

//DELETE metoda  

app.delete('/glasovanje/:OIB', (req, res) => {   //brisanje postojećeg glasača

    res.json({ msg: `Poruka ${req.params.OIB} je obrisana` });

})


//Prijava  

//GET metoda   


app.get('/prijava', (req, res) => {  //dohvaćanje svih kandidata

    res.status(200);
    res.json(prijava);

});

app.get('/prijava/:OIB', (req, res) => {
    res.status(200)
    res.json(prijava)
})


app.get('/prijava-pretraga', (req, res) => {

    let ime = req.query.ime

    let prezime = req.query.prezime

    let prijave = prijava.kandidati

    if (ime) {
        prijave = prijave.filter(e => {
            return e.ime.indexOf(ime) >= 0
        })
    }

    if (prezime) {
        prijave = prijave.filter(e => {
            return e.prezime.indexOf(prezime) >= 0
        })
    }

    res.status(200)
    res.json(prijave)

})

app.get('/prijava-01', (req, res) => {
    res.status(200);
    res.json(prijava.kandidati[0])
})

app.get('/prijava-01a', (req, res) => {
    res.status(200);
    res.json(prijava.kandidati[2].grad_prebivališta)
})

app.get('/prijava-03', (req, res) => {
    res.status(200);
    res.json(prijava.kandidati[2])
})

app.get('/prijava-03a', (req, res) => {
    res.status(200);
    res.json(prijava.kandidati[2].fakultet)
})

app.get('/prijava-02', (req, res) => {
    res.status(200);
    res.json(prijava.kandidati[1])
})

app.get('/prijava-02a', (req, res) => {
    res.status(200);
    res.json(prijava.kandidati[1].srednja_skola)
})


//POST metoda  

app.post('/prijava', (req, res) => {  //uvođenje novog kandidata

    let novi = req.body;

    prijava.kandidati.push(novi)

    res.json("OK")

});


app.post('/prijava-ime', (req, res) => { //navođenje imena jednog kandidata 

    if (!req.body.ime) {
        return res.status(400).send('Potrebno je navesti ime');
    }
    res.status(201).send(`Hvala ${req.body.ime}`);
});


app.post('/prijava-prezime', (req, res) => { //navođenje prezimena jednog kandidata

    if (!req.body.prezime) {
        return res.status(400).send('Potrebno je navesti prezime');
    }
    res.status(201).send(`Hvala ${req.body.prezime}`);
});

app.post('/prijava-grad_prebivalista', (req, res) => { //navođenje grada prebivališta kandidata

    if (!req.body.grad_prebivalista) {
        return res.status(400).send('Potrebno je navesti grad prebivališta');
    }
    res.status(201).send(`Hvala za grad ${req.body.grad_prebivalista}`);
});


app.post('/prijava-email', (req, res) => { //provjera prijave kandidata, njegov email

    if (!req.header('x-auth-token')) {
        return res.status(400).send('No token');
    }

    if (req.header('x-auth-token') !== 'vkardum@uniri.hr') {
        return res.status(401).send('Not authorised');
    }

    res.send('Logged in');

});

app.post('/prijava-password', (req, res) => { //provjera prijave kandidata, njegova lozinka

    if (!req.header('x-auth-token')) {
        return res.status(400).send('No token');
    }

    if (req.header('x-auth-token') !== 'test1212') {
        return res.status(401).send('Not authorised');
    }

    res.send('Logged in');

});

//PUT metoda   

app.put('/prijava/:OIB/prezime', (req, res) => { //izmjena prezimena postojećeg kandidata
    res.json({
        OIB: req.params.OIB,
        prezime: req.body.prezime
    });
})

app.put('/prijava/:OIB', (req, res) => { //izmjena podataka postojećeg kandidata
    res.json({
        OIB: req.params.OIB,
        ime: req.body.ime,
        prezime: req.body.prezime,
        grad_prebivalista: req.body.grad_prebivalista,
        srednja_skola: req.body.srednja_skola,
        status_kandidata: req.body.status_kandidata,
        fakultet: req.body.fakultet,
        ustanova: req.body.ustanova
    });

    res.status(201);
})


//DELETE metoda   

app.delete('/prijava/:OIB', (req, res) => {   //brisanje postojećeg glasača

    res.json({ msg: `Poruka ${req.params.OIB} je obrisana` });

})


//JWT autentifikacija kandidata  

const posts = [

    {
        username: "IgorBubalo",
        status: "zaposlenik",
        title: "kandidat 1"
    },

    {
        username: "AlenkaJM",
        status: "dekanica",
        title: "kandidat 2"

    },
    {
        username: "Vkardum",
        status: 'profesor',
        title: "kandidat 3"
    },

    {
        username: "Mlovric",
        status: 'zaposlenik',
        title: "kandidat 4"
    }


]

app.get('/posts', authToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))

})


app.post('/login', (req, res) => {

    const username = req.body.username

    const user = {
        name: username


    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({
        accessToken: accessToken,

    })
})

function authToken(req, res, next) {

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}




//Ruta za slušanje zahtjeva

app.listen(port, () => console.log(`Slusam na portu ${port}`))