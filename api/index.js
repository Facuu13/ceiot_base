console.log("Iniciando API...");

const express = require("express");
const bodyParser = require("body-parser");
const {MongoClient} = require("mongodb");
const PgMem = require("pg-mem");

const db = PgMem.newDb();

const render = require("./render.js");
// Measurements database setup and access
// se agrego el timestamp para visualizar en la pagina web
let database = null;
const collectionName = "measurements";

async function startDatabase() {
    console.log("Conectándose a MongoDB...");
    const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";	
    const connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    database = connection.db();
    console.log("Conexión establecida.");
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

async function insertMeasurement(message) {
    console.log("Insertando una nueva medición en la base de datos...");
    const timestamp = new Date();
    const measurement = { id: message.id, t: message.t, h: message.h, timestamp: timestamp };
    const { insertedId } = await database.collection(collectionName).insertOne(measurement);
    return insertedId;
}

async function getMeasurements() {
    return await database.collection(collectionName).find({}).toArray();	
}

// API Server

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('spa/static'));

const PORT = 8080;

app.delete('/device/:id', function (req, res) {
    console.log("Recibida solicitud DELETE");
    //Primero verificamos que exista el ID_device
    const device = db.public.one("SELECT device_id FROM devices WHERE device_id = '" + req.params.id + "'");
    //Sino existe devolvemos un mensaje de error
    if (!device) {
        console.log("El dispositivo no existe.")
        return res.status(404).send("El dispositivo no existe.");
    }
    
    //Si existe el ID en la tabla, eliminamos el device
    db.public.none("DELETE FROM devices WHERE device_id = '" + req.params.id + "'");
    console.log("Se elimino el device: '" + req.params.id + "'")
    res.send("Se elimino el device correctamente");
});

app.post('/measurement', function (req, res) {
    console.log("Recibida solicitud POST en /measurement");
-       console.log("device id    : " + req.body.id + " key         : " + req.body.key + " temperature : " + req.body.t + " humidity    : " + req.body.h);	
    const {insertedId} = insertMeasurement({id:req.body.id, t:req.body.t, h:req.body.h});
	res.send("received measurement into " +  insertedId);
});

app.post('/device', function (req, res) {
    const timestamp = new Date(); // Genera una marca de tiempo única
    console.log("Recibida solicitud POST en /device");
	console.log("device id    : " + req.body.id + " name        : " + req.body.n + " key         : " + req.body.k + " temperature         : " + req.body.t);

    db.public.none("INSERT INTO devices VALUES ('"+req.body.id+ "', '"+req.body.n+"', '"+req.body.k+"', '"+req.body.t+"', '" + timestamp.toISOString() + "')");
	res.send("received new device");
});

app.get('/web/device', function (req, res) {
    console.log("Recibida solicitud GET en /web/device");
    var devices = db.public.many("SELECT device_id, name, key, temperature, timestamp FROM devices").map(function (device) {
        console.log(device);
        return '<tr><td><a href=/web/device/' + device.device_id + '>' + device.device_id + "</a>" +
            "</td><td>" + device.name + "</td><td>" + device.key + "</td><td>" + device.temperature + "</td><td>" + device.timestamp + "</td></tr>";
    });
    res.send("<html>" +
            "<head><title>Sensores</title></head>" +
            "<body>" +
                "<table border=\"1\">" +
                    "<tr><th>id</th><th>name</th><th>key</th><th>temperature(°C)</th><th>timestamp</th></tr>" + 
                    devices +
                "</table>" +
            "</body>" +
        "</html>");
});


app.get('/web/device/:id', function (req, res) {
    console.log("Recibida solicitud GET en /web/device/" + req.params.id);
    var template = "<html>" +
                    "<head><title>Sensor {{name}}</title></head>" +
                    "<body>" +
                "<h1>{{ name }}</h1>" +
            "id  : {{ id }}<br/>" +
            "Key : {{ key }}<br/>" +
            "Temperature(°C) : {{ temperature }}" + // Agregamos el campo temperature
            "<br/>Timestamp: {{ timestamp }}" + // Agregamos el campo de timestamp 
                "</body>" +
        "</html>";

    var device = db.public.many("SELECT device_id, name, key, temperature, timestamp FROM devices WHERE device_id = '" + req.params.id + "'");
    console.log(device);
    res.send(render(template, { id: device[0].device_id, key: device[0].key, name: device[0].name, temperature: device[0].temperature, timestamp: device[0].timestamp }));
});	


app.get('/term/device/:id', function (req, res) {
    console.log("Recibida solicitud GET en /term/device/" + req.params.id);
    var red = "\x1b[31m"; // Color rojo
    var green = "\x1b[32m"; // Color verde
    var yellow = "\x1b[33m"; // Color amarillo
    var blue = "\x1b[34m"; // Color azul
    var violet = "\x1b[35m"; // Color violeta 
    var reset = "\x1b[0m"; // Restablecer el color

    var template = "Device name " + red + "{{name}}" + reset + "\n" +
                   "       id   " + green + "{{ id }}" + reset + "\n" +
                   "       key  " + blue + "{{ key }}" + reset + "\n" +
                   "       temperature(°C)  " + yellow + "{{ temperature }}" + reset + "\n" +
                   "       timestamp: " + violet + "{{ timestamp }}" + reset + "\n"; // Asignamos un color diferente al campo de timestamp

    var device = db.public.many("SELECT * FROM devices WHERE device_id = '" + req.params.id + "'");
    console.log(device);
    res.send(render(template, { id: device[0].device_id, key: device[0].key, name: device[0].name, temperature: device[0].temperature ,timestamp: device[0].timestamp }));
});




app.get('/measurement', async (req,res) => {
    res.send(await getMeasurements());
});

app.get('/device', function(req,res) {
    res.send( db.public.many("SELECT * FROM devices") );
});

startDatabase().then(async() => {

    const addAdminEndpoint = require("./admin.js");
    addAdminEndpoint(app, render);

    await insertMeasurement({id:'00', t:'18', h:'78'});
    await insertMeasurement({id:'00', t:'19', h:'77'});
    await insertMeasurement({id:'00', t:'17', h:'77'});
    await insertMeasurement({id:'01', t:'17', h:'77'});
    console.log("mongo measurement database Up");

    db.public.none("CREATE TABLE devices (device_id VARCHAR, name VARCHAR, key VARCHAR, temperature INT, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    console.log("Se creo la tabla 'devices' en la base de datos.");
    db.public.none("INSERT INTO devices VALUES ('00', 'Fake Device 00', '123456', 13)");
    db.public.none("INSERT INTO devices VALUES ('01', 'Fake Device 01', '234567', 25)");
    console.log("Se insertaron los primeros datos de dispositivos.");
    db.public.none("CREATE TABLE users (user_id VARCHAR, name VARCHAR, key VARCHAR)");
    console.log("Se creo la tabla 'users' en la base de datos.");
    db.public.none("INSERT INTO users VALUES ('1','Ana','admin123')");
    db.public.none("INSERT INTO users VALUES ('2','Beto','user123')");
    console.log("Se insertaron los primeros datos de usuarios.");

    console.log("sql device database up");

    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
});
