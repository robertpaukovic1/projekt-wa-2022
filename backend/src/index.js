import express from 'express'
import cors from 'cors'
import obavijesti from './obavijesti'
import FAQ from './FAQ'
import glasovanje from './glasovanje'
import prijava from './prijava_kandidata';

const app = express();

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
    res.status(201);
    res.send(req.body);
});

//PUT metoda 

app.put('/obavijesti/:id', (req, res) => { //izmjena postojeće obavijesti 
    res.json({
        id: req.params.id,
        tekst: req.body.tekst
    });
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
    res.status(201);
    res.send(req.body);
})


// Glasovanje  


//GET metoda   

app.get('/glasovanje', (req, res) => {  //dohvaćanje svih glasača  
    res.status(200);
    res.json(glasovanje);
});

app.get('/glasovanje/03', (req, res) => {  //dohvaćanje trećeg glasača
    res.status(200);
    res.json(glasovanje.glasaci[3]);
})

app.get('/glasovanje/04', (req, res) => {
    res.status(200);
    res.json(glasovanje.glasaci[4].ime);
})

app.get('/glasovanje/04a', (req, res) => {
    res.status(200);
    res.json(glasovanje.glasaci[4].prezime);
})

//POST metoda  

app.post('/glasovanje', (req, res) => {  //uvođenje novog glasača 
    res.status(200);
    res.json(req.body);
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

    if (req.header('x-auth-token') !== 'mvidov@uniri.hr') {
        return res.status(401).send('Not authorised');
    }

    res.send('Logged in');

});

app.post('/glasovanje-password', (req, res) => { //provjera prijave glasača, njegova lozinka

    if (!req.header('x-auth-token')) {
        return res.status(400).send('No token');
    }

    if (req.header('x-auth-token') !== 'vidov61') {
        return res.status(401).send('Not authorised');
    }

    res.send('Logged in');

});


//PUT metoda  

app.put('/glasovanje/:OIB/prezime', (req, res) => { //izmjena prezimena postojećeg glasača
    res.json({
        OIB: req.params.OIB,
        prezime: req.body.prezime
    });
})

app.put('/glasovanje/:OIB/grad', (req, res) => { //izmjena grada prebivališta postojećeg glasača
    res.json({
        OIB: req.params.OIB,
        grad_prebivalista: req.body.grad_prebivalista
    });
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

app.get('/prijava/01', (req, res) => {  //dohvaćanje prvog kandidata
    res.status(200);
    res.json(prijava.kandidati[0]);
})

app.get('/prijava/04', (req, res) => { // dohvaćanje četvrtog kandidata
    res.status(200);
    res.json(prijava.kandidati[3]);
})

app.get('/prijava/ustanova02', (req, res) => { //dohvaćanje ustanove u kojoj radi drugi kandidat
    res.status(200);
    res.json(prijava.kandidati[1].ustanova);
})


app.get('/prijava/status03', (req, res) => { //dohvaćanje statusa trećeg kandidata
    res.status(200);
    res.json(prijava.kandidati[2].status_kandidata);
})

app.get('/prijava/srednja', (req, res) => { //dohvaćanje završene srednje škole trećeg kandidata
    res.status(200);
    res.json(prijava.kandidati[2].srednja_skola);
})

app.get('/prijava/fakultet', (req, res) => { //dohvaćanje završenog faulteta četvrtog kandidata
    res.status(200);
    res.json(prijava.kandidati[3].fakultet);
})


//POST metoda  

app.post('/prijava', (req, res) => {  //uvođenje novog kandidata
    res.status(200);
    res.json(req.body);
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

app.put('/prijava/:OIB/grad_prebivalista', (req, res) => { //izmjena grada prebivališta postojećeg kandidata
    res.json({
        OIB: req.params.OIB,
        grad_prebivalista: req.body.grad_prebivalista
    });
})


//DELETE metoda   

app.delete('/glasovanje/:OIB', (req, res) => {   //brisanje postojećeg glasača

    res.json({ msg: `Poruka ${req.params.OIB} je obrisana` });

})




































app.listen(port, () => console.log(`Slusam na portu ${port}`))