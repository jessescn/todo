angular.module('todoLista').config(($routeProvider) => {
    $routeProvider.when("/tasks", {
        templateUrl: 'view/allTasks.html',
        controller: 'taskCtrl'
    })
    .when('/newtask', {
        templateUrl: 'view/newTask.html',
        controller: 'taskCtrl',
        reloadOnSearch: false
    })
    .otherwise({
        redirectTo: '/tasks'
    })
})