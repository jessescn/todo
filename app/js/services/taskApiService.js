angular.module('todoLista').factory('taskAPI', function($http, config) {
    
    var api = config.apiURL
    var _getTasks = function(){
        return $http.get(api +  '/tasks.json')
    }

    var _adicionarTask = (task) => {
        return $http.post(api + '/tasks', task)
    }

    var _removerTask  = (taskId) => {
        return $http.delete(api + '/tasks/' + taskId)
    }

    var _updateTask = (task) => { 
        return $http.put(api + '/tasks/' + task.id, task)
    }

    return {
        getTasks : _getTasks, 
        adicionarTask: _adicionarTask,
        removerTask: _removerTask,
        updateTask: _updateTask
    }
})