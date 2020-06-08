(function() {
    angular.module('HealthUser').controller('RegistrosController', [
        '$scope',
        '$http',
        'consts',
        RegistrosController
    ])
    function RegistrosController($scope, $http, consts) {

        //let url = 'http://localhost:3000/registros/pessoa'
        $scope.registrosPessoa = []
        $scope.GetRegistros = function() {
            $http.get(`${consts.api_url}registros/pessoa/1`).then(resp => {
                $scope.registrosPessoa = resp.data
                console.log($scope.registrosPessoa)
            }).catch(resp => {
                console.log(resp)
            })
        }

        $scope.GetRegistros()
    }
})()