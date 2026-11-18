// 1. ESTADO INTELIGENTE: Intentamos cargar las tareas guardadas previamente.
// Si 'localStorage' está vacío, usamos el arreglo con las tareas iniciales por defecto.
let todos = JSON.parse(localStorage.getItem('mis_tareas')) || [
    { title: 'Estudiar desarrollo web', dueDate: '2026-11-15', completed: false },
    { title: 'Practicar bases de datos', dueDate: '2026-11-16', completed: true },
    { title: 'Hacer ejercicio', dueDate: '2026-11-17', completed: false }
];

render();

function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value.trim();

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    if (title === '') {
        alert('Por favor escribe una tarea');
        return;
    }

    todos.push({
        title: title,
        dueDate: dueDate,
        completed: false
    });

    textbox.value = '';
    datePicker.value = '';

    // 2. Cada vez que añadimos una tarea, guardamos el estado actualizado
    guardarYRenderizar();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    
    // 3. Cada vez que marcamos una tarea como completada, guardamos los cambios
    guardarYRenderizar();
}

// NUEVA FUNCIÓN AUXILIAR: Guarda en el disco del navegador y actualiza la pantalla
function guardarYRenderizar() {
    // Convertimos el arreglo 'todos' a texto y lo guardamos con la llave 'mis_tareas'
    localStorage.setItem('mis_tareas', JSON.stringify(todos));
    
    // Actualizamos la vista visual
    render();
}

function render() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(function (todo, index) {
        const element = document.createElement('div');
        element.classList.add('todo-item');

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('todo-content');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        checkbox.onchange = function () {
            toggleTodo(index);
        };

        const textSpan = document.createElement('span');
        textSpan.innerText = `${todo.title} - (${todo.dueDate || 'Sin fecha'})`;

        if (todo.completed) {
            textSpan.classList.add('completed');
        }

        contentWrapper.appendChild(checkbox);
        contentWrapper.appendChild(textSpan);
        element.appendChild(contentWrapper);
        todoList.appendChild(element);
    });
}