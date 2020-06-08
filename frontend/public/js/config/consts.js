(function() {
    angular.module('HealthUser').constant('consts', {
        appName: 'Health User',
        version: '1.0',
        owner: 'Bortolotti Solutions',
        api_url: 'http://localhost:3000',
        user_key: 'app_imc'
    }).run(['$rootScope', 'consts', function($rootScope, consts) {
        $rootScope.consts = consts
    }])
})()