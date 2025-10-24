class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.initElements();
        this.bindEvents();
        this.render();
    }

    initElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        this.clearCompleted = document.getElementById('clearCompleted');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.clearCompleted.addEventListener('click', () => this.clearCompletedTasks());
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) return;

        const task = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.taskInput.value = '';
        this.saveTasks();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
    }

    clearCompletedTasks() {
        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveTasks();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active': return this.tasks.filter(t => !t.completed);
            case 'completed': return this.tasks.filter(t => t.completed);
            default: return this.tasks;
        }
    }

    render() {
        const filteredTasks = this.getFilteredTasks();
        
        this.taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-checkbox" onclick="app.toggleTask(${task.id})"></div>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="app.deleteTask(${task.id})">×</button>
            </li>
        `).join('');

        this.updateStats();
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        
        this.totalTasks.textContent = total;
        this.completedTasks.textContent = completed;
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('todoTasks');
        return saved ? JSON.parse(saved) : [];
    }
}

const app = new TodoApp();