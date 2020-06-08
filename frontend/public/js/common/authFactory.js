(function() {
    angular.module('HealthUser').factory('auth', [
        '$http',
        'consts',
        AuthFactory
    ])

    function AuthFactory($http, consts) {

        function login(user, callback) {
            submit('login', user, callback)
        }
        function submit(url, user, callback) {

            //Requisição para o backend - Verificar se o usurio possui login
            $http.post(`${consts.api_url}/${url}`, user)
                .then(resp =>{
                    sessionStorage.setItem(consts.user_key, JSON.stringify(resp.data))
                    $http.default.headers.common.Authorizantion = resp.data.token
                    if(callback) callback(null, resp.data)
                }).catch(resp => {
                    if(callback) callback(resp.data, resp.data)
                })
        }   

        return {login}
    }
})()