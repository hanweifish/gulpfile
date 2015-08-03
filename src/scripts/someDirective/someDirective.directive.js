;(function() {
'use strict';

angular.module('app')
    .directive('someDirective', [
        SomeDirectiveDirective
    ]);

function SomeDirectiveDirective() {
    return {
        restrict: 'E',
        templateUrl: 'scripts/someDirective/someDirective.tpl.html',
        link: linkFunc,
        replace: false,
        transclude: true,
        controller: 'SomeDirectiveCtrl',
        scope: {

        }
    }
}

function linkFunc(scope, elem, attrs) {

}

}());
