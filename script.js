
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = task.name;
            span.addEventListener('click', () => toggleTask(index));
            if (task.completed) {
                span.classList.add('completed');
            }
            li.appendChild(span);
            const completeButton = document.createElement('button'); // Create complete button
            completeButton.textContent = task.completed ? 'Incomplete' : 'Complete'; // Set button text based on completion status
            completeButton.addEventListener('click', () => toggleTask(index)); // Toggle completion when clicking the button
            li.appendChild(completeButton); // Add complete button to task item

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editTask(index));
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(index));
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });
    }

    function addTask(taskName) {
        tasks.push({ name: taskName, completed: false });
        saveTasks();
        renderTasks();
    }

    function editTask(index) {
        const newName = prompt('Enter new task name:', tasks[index].name);
        if (newName !== null) {
            tasks[index].name = newName.trim();
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
   
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            addTask(taskName);
            taskInput.value = '';
        }
    });

    renderTasks();
});
