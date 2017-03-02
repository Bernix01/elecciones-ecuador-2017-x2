import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
    awesomecandidates = [];
    newThing = '';
    days = 1;
    hours = 1;
    minutes = 1;
    seconds = 1;

    /*@ngInject*/
    constructor($http, $scope, socket, $interval) {
        this.$http = $http;
        this.socket = socket;
        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('candidate');
        });
        
    }

    $onInit() {
        this.$http.get('/api/candidates')
            .then(response => {
                this.awesomecandidates = response.data;
                this.socket.syncUpdates('candidate', this.awesomecandidates);
            });
    }

}

export default angular.module('testApp.main', [uiRouter])
    .config(routing)
    .component('main', {
        template: require('./main.html'),
        controller: MainController
    })
    .name;
