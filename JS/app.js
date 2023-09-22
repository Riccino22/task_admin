document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskTime = document.getElementById('task-time');
    const taskList = document.getElementById('task-list');
    
    // Obtener las tareas almacenadas en el localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Función para renderizar las tareas en la lista
    function renderTasks() {
      taskList.innerHTML = '';
      
      tasks.forEach(function(task, index) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
          // Eliminar la tarea cuando se marque como completada
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
        
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = task.name + ' - ' + task.time;
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTextElement);
        taskList.appendChild(taskItem);
      });
    }
    
    // Renderizar las tareas al cargar la página
    renderTasks();
    
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const taskName = taskInput.value;
      const taskTimeValue = taskTime.value;
      
      if (taskName.trim() !== '' && taskTimeValue.trim() !== '') {
        const newTask = {
          name: taskName,
          time: taskTimeValue
        };
        
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        taskInput.value = '';
        taskTime.value = '';
        
        renderTasks();
      }
    });
  });
  