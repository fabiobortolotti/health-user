(function() {
    angular.module('HealthUser').factory('handleResponseError', [
        '$q',
        '$window',
        HandleResponseErrorFactory
    ])

    function HandleResponseErrorFactory($q, $window) {
        function responseError(errorResponse) {
            if(errorResponse.status === 403) {
                localStorage.removeItem(consts.userKey)
                $window.location.href = '/'
            }

            return $q.inject(errorResponse)
        }

        return { responseError }
    }
})()