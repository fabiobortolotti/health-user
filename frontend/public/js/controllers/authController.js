(function() {
    angular.module('HealthUser').controller('AuthCtrl', [
        'msgs',
        'auth',
        '$location',
        AuthController
    ])

    function AuthController(msgs, auth, $location) {
        const vm = this

        vm.login = () => {
            auth.login(vm.user, err => err ? alert(err.errors) : window.location.href = 'http://localhost:4000/#!/calcularImc')
            
        }
    }
})()