const taskForm = document.getElementById('task-form');
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');

        // Load tasks from local storage
        const loadTasks = () => {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(task => addTaskToDOM(task));
        };

        // Save tasks to local storage
        const saveTasks = () => {
            const tasks = Array.from(taskList.children).map(li => ({
                text: li.querySelector('.task-text').textContent,
                id: li.dataset.id
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        // Add task to DOM
        const addTaskToDOM = ({ text, id }) => {
            const li = document.createElement('li');
            li.dataset.id = id;

            const span = document.createElement('span');
            span.textContent = text;
            span.className = 'task-text';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';
            editButton.onclick = () => editTask(li);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = () => deleteTask(li);

            li.append(span, editButton, deleteButton);
            taskList.appendChild(li);
        };

        // Add new task
        taskForm.addEventListener('submit', e => {
            e.preventDefault();
            const text = taskInput.value.trim();
            if (text === '') return;

            const id = Date.now().toString();
            addTaskToDOM({ text, id });
            saveTasks();
            taskInput.value = '';
        });

        // Edit task
        const editTask = li => {
            const newText = prompt('Edit your task:', li.querySelector('.task-text').textContent);
            if (newText === null || newText.trim() === '') return;
            li.querySelector('.task-text').textContent = newText.trim();
            saveTasks();
        };

        // Delete task
        const deleteTask = li => {
            li.remove();
            saveTasks();
        };

        // Initialize app
        loadTasks();