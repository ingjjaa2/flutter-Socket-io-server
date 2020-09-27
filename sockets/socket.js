const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

//Default Bands
const bands = new Bands();

bands.addBand( new Band( 'Breaking Benjamin' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Héroes del Silencio' ) );
bands.addBand( new Band( 'Metallica' ) );
/////////////////


//mensajes
io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.emit('active-bands', bands.getBands() );

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);
        //io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
        io.emit( 'nuevo-mensaje', { admin: payload } );
    });

    client.on('vote-band', (payload) => {

        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload) => {
        const newBand = new Band( payload.name );
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });


  });