// scripts.js

$(document).ready(function() {
  // Array to store tasks
  let tasks = [];

  // Function to render tasks
  function renderTasks() {
      // Clear tasks container
      $('#tasks-container').empty();

      // Filter tasks based on selected filters
      let filteredTasks = tasks.filter(task => {
          const priorityFilter = $('#priority-filter').val();
          const completedFilter = $('#completed-filter').prop('checked');
          const incompleteFilter = $('#incomplete-filter').prop('checked');

          if ((priorityFilter === '' || task.priority === priorityFilter) &&
              (completedFilter && task.completed || incompleteFilter && !task.completed || !completedFilter && !incompleteFilter)) {
              return true;
          }

          return false;
      });

      // Render filtered tasks
      filteredTasks.forEach(task => {
          const taskStatusClass = task.completed ? 'line-through text-gray-500' : 'text-black';
          const taskPriorityClass = task.priority === 'high' ? 'bg-red-200' : task.priority === 'medium' ? 'bg-yellow-200' : 'bg-green-200';

          const taskElement = `
              <div class="bg-white shadow-md rounded-md p-4">
                  <h3 class="text-lg font-semibold ${taskStatusClass}">${task.title}</h3>
                  <p class="text-sm text-gray-500 mb-2">${task.description}</p>
                  <p class="text-xs font-semibold ${taskPriorityClass} py-1 px-2 rounded-full inline-block">${task.priority}</p>
                  <p class="text-xs text-gray-500">Due: ${task.dueDate}</p>
                  <button class="text-xs text-white bg-blue-500 py-1 px-2 rounded-md mt-2 mark-complete">${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
              </div>
          `;
          $('#tasks-container').append(taskElement);
      });
  }

  // Function to add new task
  $('#task-form').submit(function(event) {
      event.preventDefault();

      const title = $('#task-title').val();
      const description = $('#task-description').val();
      const dueDate = $('#due-date').val();
      const priority = $('#priority').val();

      if (title.trim() === '') {
          alert('Please enter a task title.');
          return;
      }

      const task = {
          title,
          description,
          dueDate,
          priority,
          completed: false
      };

      tasks.push(task);

      renderTasks(); // Render tasks after adding new task

      // Clear form inputs
      $('#task-title').val('');
      $('#task-description').val('');
      $('#due-date').val('');
      $('#priority').val('');
  });

  // Event listener for task completion
  $(document).on('click', '.mark-complete', function() {
      const index = $(this).closest('.bg-white').index();
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
  });

  // Initial rendering of tasks
  renderTasks();
});
