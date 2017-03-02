/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Candidate from '../api/candidate/candidate.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
    if (config.seedDB) {
       return Candidate.find({}).remove()
            .then(() => {
                return Candidate.create({
                    name: 'Lenin Moreno',
                    info: 'Candidato de Aliana País #35',
                    pimage: 'https://pbs.twimg.com/profile_images/796437159926439940/CEADx6SB.jpg'
                }, {
                    name: 'Guillermo Lasso',
                    info: 'Candidato movimiento CREO',
                    pimage: 'https://pbs.twimg.com/profile_images/806191783122178049/5r7u8xFe.jpg'
                });
            })
            .then(() => console.log('finished populating candidates'))
            .catch(err => console.log('error populating candidates', err));

    }
}
