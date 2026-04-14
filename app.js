// Load todos from local storage
function loadTodos() {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
}

// Save todos to local storage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the todo list
function renderTodos() {
    const todoList = document.getElementById('todoList');
    const todos = loadTodos();
    
    todoList.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${todo.completed ? 'checked' : ''} 
                onchange="toggleTodo(${index})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
    
    updateStats();
}

// Add a new todo
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (!text) {
        alert('Please enter a task');
        return;
    }
    
    const todos = loadTodos();
    todos.push({ text: text, completed: false });
    saveTodos(todos);
    input.value = '';
    renderTodos();
}

// Toggle todo completion
function toggleTodo(index) {
    const todos = loadTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos();
}

// Delete a todo
function deleteTodo(index) {
    const todos = loadTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

// Clear all completed todos
function clearCompleted() {
    const todos = loadTodos();
    const filtered = todos.filter(todo => !todo.completed);
    saveTodos(filtered);
    renderTodos();
}

// Update statistics
function updateStats() {
    const todos = loadTodos();
    const completed = todos.filter(todo => todo.completed).length;
    
    document.getElementById('totalCount').textContent = todos.length;
    document.getElementById('completedCount').textContent = completed;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add todo on Enter key
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('todoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    renderTodos();
});
