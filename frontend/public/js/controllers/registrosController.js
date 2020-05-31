(function() {
    angular.module('HealthUser').controller('RegistrosController', [
        '$scope',
        '$http',
        RegistrosController
    ])
    function RegistrosController($scope, $http) {

        let url = 'http://localhost:3000/registros/pessoa'
        $scope.registrosPessoa = []
            $scope.GetRegistros = function() {
            $http.get(`${url}/1`).then(resp => {
                $scope.registrosPessoa = resp.data
                console.log($scope.registrosPessoa)
            }).catch(resp => {
                console.log(resp)
            })
        }

        $scope.GetRegistros()
    }
})()