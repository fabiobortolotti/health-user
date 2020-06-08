(function() {
    angular.module('HealthUser').factory('auth', [
        '$http',
        'consts',
        AuthFactory
    ])

    function AuthFactory($http, consts) {

        let user = null
        function getUser() {
            if(!user) {
                user = JSON.parse(sessionStorage.getItem(consts.user_key))
            }

            return user
        }

        function login(user, callback) {
            submit('login', user, callback)
        }

        function logout(callback) {
            user = null
            sessionStorage.removeItem(consts.user_key)
            $http.default.headers.common.Authorization = ''
            if (callback) callback(null)
        }
        function validateToken(token, callback) {
            if(token) {
                $http.post(`${consts.api_url}/validateToken`, { token })
                    .then(resp => {
                        if(!resp.data.valid) {
                            logout()
                        } else {
                            $http.defaults.headers.common.Authorization = getUser().token
                        }
                        if (callback) callback(resp.data.valid)
                    }).catch(resp => {
                        if (callback) callback(resp.data.errors)
                    })
            } else {
                if (callback) callback('Token Inválido')
            }
        }

        function submit(url, user, callback) {

            //Requisição para o backend - Verificar se o usurio possui login
            $http.post(`${consts.api_url}/${url}`, user)
                .then(resp =>{
                    sessionStorage.setItem(consts.user_key, JSON.stringify(resp.data))
                    $http.defaults.headers.common.Authorization = resp.data.token
                    if(callback) callback(null, resp.data)
                }).catch(resp => {
                    if(callback) callback(resp.data, resp.data)
                })
        }   

        return {login, getUser, validateToken}
    }
})()