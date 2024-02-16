document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    var inputTask = document.getElementById('input-task');
    var addTaskButton = document.getElementById('add-task-button');
    var taskList = document.getElementById('task-list');

    // Function to fetch task list from local storage
    function fetchTaskList() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Function to save task list to local storage
    function saveTaskList(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create a new task element
    function createTaskElement(task) {
        // Create new list item
        var listItem = document.createElement('li');

        // Create input element for checkbox
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        // Create span element for task name
        var taskSpan = document.createElement('span');
        taskSpan.className = 'task';
        taskSpan.textContent = task.name;
        if (task.completed) {
            taskSpan.style.textDecoration = 'line-through'; // Add line-through style
        }

        // Create button element for delete
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';

        // Append elements to list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);

        // Add event listener for delete button
        deleteButton.addEventListener('click', function() {
            deleteTask(task);
        });

        // Add event listener for checkbox
        checkbox.addEventListener('change', function() {
            task.completed = checkbox.checked;
            saveTaskList(tasks);
            markTaskComplete(task, taskSpan);
        });

        return listItem;
    }

    // Function to render the task list
    function renderTaskList() {
        taskList.innerHTML = ''; // Clear existing list
        tasks.forEach(function(task) {
            var taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }

    // Function to add a new task
    function addNewTask() {
        var taskName = inputTask.value.trim(); // Trim whitespace
        if (taskName !== '') { // Check if the task name is not empty
            var newTask = {
                name: taskName,
                completed: false
            };
            tasks.push(newTask);
            saveTaskList(tasks);
            renderTaskList();
            inputTask.value = ''; // Clear input field
        } else {
            alert('Please enter a task name.');
        }
    }

    // Function to handle task deletion
    function deleteTask(taskToDelete) {
        tasks = tasks.filter(function(task) {
            return task !== taskToDelete;
        });
        saveTaskList(tasks);
        renderTaskList();
    }

    // Function to mark task as complete
    function markTaskComplete(task, taskSpan) {
        if (task.completed) {
            taskSpan.style.textDecoration = 'line-through'; // Add line-through style
        } else {
            taskSpan.style.textDecoration = 'none'; // Remove line-through style
        }
    }

    // Fetch the task list from local storage
    var tasks = fetchTaskList();

    // Render the task list
    renderTaskList();

    // Event listener for add task button click
    addTaskButton.addEventListener('click', addNewTask);
});
