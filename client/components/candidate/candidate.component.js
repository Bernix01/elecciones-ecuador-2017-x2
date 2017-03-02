'use strict';

import angular from 'angular';

export class CandidateController {

    constructor(Auth) {
        'ngInject';
    }
}

export default angular.module('testApp.candidate', [])
    .component('candidate', function() {
        return {
            template: require('./candidate.html'),
            controller: CandidateController,
            controllerAs: 'Candidate',
            bindings:{
                human:'<'
            }
        };
    })
    .name;
