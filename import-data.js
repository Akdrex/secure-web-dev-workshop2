const mongoose = require('mongoose');
require('dotenv').config();
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

const { Schema } = mongoose;

const Locations = new Schema({
        filmType:  String, // String is shorthand for {type: String}
        filmProducerName: String,
        endDate:   Date,
        filmName: String,
        district: String,
        geolocation: {
            type: {
                enum: ['Point'], // 'location.type' must be 'Point'
                required: false,
            },
            coordinates: [Number],
        },
        sourceLocationId: String,
        filmDirectorName: String,
        address: String,
        startDate: Date,
        year: String
    }
)
async function pushJsontoMongoose(model) {
    for (let i of filmingLocations) {
        let thisLocation = new model({
            filmType: i.fields.type_tournage,
            filmProducerName: i.fields.nom_producteur,
            enDate: Date(i.fields.date_fin),
            filmName: i.fields.nom_tournage,
            district: i.fields.ardt_lieu,
            geolocation: {
                coordinates: [parseInt(i.fields.coord_x), parseInt(i.fields.coord_y)],
            },
            sourceLocationId: i.fields.id_lieu,
            filmDirectorName: i.fields. nom_realisateur,
            address: i.fields.adresse_lieu,
            startDate: Date(i.fields.date_debut),
            year: i.fields.annee_tournage
        });
        thisLocation.save();
    }
}
async function main(){
    await mongoose.connect(process.env.MONGO_URI);
    const model = mongoose.model('Location', Locations);
    await pushJsontoMongoose(model);
    console.log("Donefff !")
}

main();


