angular.module('todoLista').controller('menuCtrl', function($scope, $location){

    $scope.$on('$routeChangeStart', function($event, next, current) {
        var nextPath = next.$$route.originalPath
        $scope.selectOption(nextPath)
    })
    
    $scope.options = [
        {id:1, label: 'Todas as Tasks', icon:'assets/tasks.svg', selected: true, reference: '#!tasks', path: '/tasks' }, 
        {id:2, label: 'Adicionar Task', icon: 'assets/addTask.svg', selected: false, reference: '#!newtask', path: '/newtask'}
    ]

    $scope.selectOption = (path => {
        $scope.options = $scope.options.map(elem => {
            elem.selected = false
            if (elem.path == path) {
                elem.selected = true       
            } 
            return elem
        })
    })

    $scope.selectOption($location.$$path)
})