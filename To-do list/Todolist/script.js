const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const ClearAllBtn = document.getElementById('ClearAllBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = "flex justify-between items-center bg-gray-100 rounded-lg"

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if(task.completed) {
            taskText.classList.add('line-through', 'text-gray-400');

        }

        const btnGroup = document.createElement('div');

        const completeBtn = document.createElement('button');
        completeBtn.textContent =  task.completed ? 'Undo' : 'Done';
        completeBtn.className = "text-green-600 hover:underline"
        completeBtn.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = " X ";
        deleteBtn.className = "text-red-600 hover:underline"
        deleteBtn.onclick = () => deleteTask(index);

        btnGroup.appendChild(completeBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(btnGroup);
        taskList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if(text == '') return alert('Please enter a task');
    tasks.push({text, completed: false});
    renderTasks()

});

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks()

}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks()

}

ClearAllBtn.addEventListener('click', () => {
    if(confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        renderTasks()
    }
})

renderTasks();
