;(function() {
'use strict';

angular.module('app')
.controller('AppCtrl', [
    '$scope',
    AppCtrl
]);

function AppCtrl($scope) {
    $scope.word = 'Using Angular';
}

}());
