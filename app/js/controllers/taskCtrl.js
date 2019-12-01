angular.module('todoLista').controller('taskCtrl',  function($scope, $location, taskAPI){
    
    $scope.filter = ""
    $scope.modalOpen = false
    $scope.currentTask = undefined
    $scope.priorities = ['Low', 'Medium', 'High']
    $scope.status = ['TODO', 'In Progress', 'Done', 'Stopped']

    $scope.prioritiesColors = { 
        'Low': '#fdcc00',
         'Medium': '#ff9a1a',
         'High': '#ff6674'
    }


    var loadTasks = () => {        
        taskAPI.getTasks().then(function (response, status){
            $scope.tasks = response.data
            updateView()
        })
    }

    var addTask = (task) => {
        taskAPI.adicionarTask(task).then((response, status) => {
            $scope.tasks.push(response.data)
        })
    }

    var remove = (taskID) => {
        taskAPI.removerTask(taskID).then(() => {
            console.log('task removida com sucesso!');
        })
    }

    var update = (task) => {
        taskAPI.updateTask(task).then((response) => {
        })
    }

    $scope.editTask = (editedTask, taskId) => {
        
        let task = $scope.tasks.filter(elem => {
            return elem.id == taskId
        })[0]

        for(let i in editedTask){
            task[i] = editedTask[i]
        }

        update(task)
        $scope.closeModal()
    }

    
   $scope.displayMore = (taskId) => {       
       $scope.tasks = $scope.tasks.map(elem => {
           if(elem.id == taskId){
               elem.showMore = !elem.showMore
           }
           return elem
       })
   }

    $scope.addTask = (newTask, tasks) => {

        newTask.startDate = newTask.startDate ? newTask.startDate : new Date()
        newTask.endDate = newTask.endDate ? newTask.endDate : new Date()
        newTask.status = newTask.status ? newTask.status: 'TODO'
        newTask.priority = newTask.priority ? newTask.priority: 'Low'

        const { title, priority, status, description, startDate, endDate } = newTask

        var task = {
            title,
            priority,
            status,
            description,
            startDate,
            endDate,
        }
        
        addTask(task)
        $scope.taskForm.$setPristine()
        $location.path('/tasks', false)
    }

    $scope.updateTask = (taskId) => {

        let task = $scope.tasks.filter(elem => {
            return elem.id == taskId
        })[0]

        task.status = task.status != "Done" ? task.status = "Done" : "TODO"

        update(task)
    }

    var updateView = () => {
        $scope.displayedTasks = $scope.tasks
    }

    $scope.removeTask = (tasks, displayedTasks, taskID) => {
        $scope.tasks = tasks.filter(elem =>{ 
            return elem.id != taskID
        })

        $scope.displayedTasks = displayedTasks.filter(elem =>{ 
            return elem.id != taskID
        })

        remove(taskID)
    }

    $scope.filterTasks = (tasks, filter) => {
        
        $scope.displayedTasks = tasks.filter(elem => {
            return elem.title.toLowerCase().startsWith(filter)
        })
    }

    $scope.closeModal = () => {
        $scope.modalOpen =  false
    }

    $scope.openModal = (task) => {
        $scope.currentTask = task        
        $scope.modalOpen = true
    }
    
    loadTasks()
})