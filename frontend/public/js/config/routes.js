(function() {
    angular.module('HealthUser').config([
        '$stateProvider',
        '$httpProvider',
        function($stateProvider, $httpProvider ) {
            $stateProvider.state('registros', {
                url: '/registros',
                templateUrl: 'views/registros.html'
            })
        }
    ])
})()