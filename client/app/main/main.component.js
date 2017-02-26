import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
    awesomeThings = [];
    newThing = '';
    days = 1;
    hours = 1;
    minutes = 1;
    seconds = 1;

    /*@ngInject*/
    constructor($http, $scope, socket, $interval) {
        this.$http = $http;
        this.socket = socket;
        this.$interval = $interval
        $scope.$on('$destroy', function() {

        });
        this.$scope = $scope;
        $scope = $scope;
    }

    $onInit() {
        

        this.$scope.days = 1;
        this.stopTime = this.$interval(function(maketimer) { makeTimer() }, 1000);

        // listen on DOM destroy (removal) event, and cancel the next UI update
        // to prevent updating time after the DOM element was removed.

    }

    makeTimer() {

        var endTime = new Date("2017-04-01T00:00:00-0500");
        var endTime = (Date.parse(endTime)) / 1000;


        var now = new Date();
        var now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        this.$scope.days = Math.floor(timeLeft / 86400);
        this.$scope.hours = Math.floor((timeLeft - (this.$scope.days * 86400)) / 3600);
        this.$scope.minutes = Math.floor((timeLeft - (this.$scope.days * 86400) - (this.$scope.hours * 3600)) / 60);
        this.$scope.seconds = Math.floor((timeLeft - (this.$scope.days * 86400) - (this.$scope.hours * 3600) - (this.$scope.minutes * 60)));

        if (this.$scope.hours < "10") { this.$scope.hours = "0" + hours; }
        if (this.$scope.minutes < "10") { this.$scope.minutes = "0" + minutes; }
        if (this.$scope.seconds < "10") { this.$scope.econds = "0" + seconds; }

        console.log(this.$scope.days + " " + this.$scope.hours + " " + this.$scope.minutes);


    }

}

export default angular.module('testApp.main', [uiRouter])
    .config(routing)
    .component('main', {
        template: require('./main.html'),
        controller: MainController
    })
    .name;
