//selectors
const form = document.querySelector('form');
const list = document.querySelector('#list');
const input = document.querySelector('#input');
const select = document.querySelector('#select');

// DOMTokenList.prototype.addMany = function(classes) {
//     var array = classes.split(' ');
//     for (var i = 0, length = array.length; i < length; i++) {
//       this.add(array[i]);
//     }
// }

// DOMTokenList.prototype.removeMany = function(classes) {
//     var array = classes.split(' ');
//     for (var i = 0, length = array.length; i < length; i++) {
//       this.remove(array[i]);
//     }
// }

//functions
const newTodo = (e) => {
    e.preventDefault();

    //create Elements
    let newLi = document.createElement('li');
    let newDiv = document.createElement('div');
    let btnOne = document.createElement('button');
    let btnTwo = document.createElement('button');
    let checkIcon = document.createElement('i');
    let delIcon = document.createElement('i');

    //assign classes
    newLi.classList.add('my-2', 'd-flex', 'justify-content-between', 'list-group-item');
    newDiv.classList.add('border', 'border-secondary', 'rounded-start', 'd-flex', 'align-items-center', 'flex-fill', 'p-1', 'fs-5', 'font-monospace');
    btnOne.classList.add('check-btn', 'btn', 'btn-outline-secondary', 'border-start-0', 'border-end-0', 'rounded-0');
    btnTwo.classList.add('trash-btn', 'btn', 'btn-outline-secondary', 'rounded-0', 'rounded-end');
    checkIcon.classList.add('bi', 'bi-check-square', 'pe-none');
    delIcon.classList.add('bi', 'bi-trash', 'pe-none');

    //append
    btnOne.append(checkIcon);
    btnTwo.append(delIcon);
    newDiv.append(input.value);
    newLi.append(newDiv);
    newLi.append(btnOne);
    newLi.append(btnTwo);
    list.append(newLi);

    //add toDO to localStorage
    saveToLocal(input.value);

    //reset input
    input.value = "";
}

//remove todo
const deleteTodo = (e) => {
    let btn = e.target;
    if (btn.classList[0] === 'trash-btn') {
        let toDo = btn.parentElement;
        toDo.classList.add('fall');
        removeFromLocal(toDo);
        toDo.addEventListener('transitionend', () => {
            toDo.remove();
        });
    }
}

//add check effect
const checkTodo = (e) => {
    let btn = e.target;
    if (btn.classList[0] === 'check-btn') {
        let toDo = btn.parentElement;
        toDo.classList.toggle('checked');
    }
}

//filter todo list
const filterTodo = () => {
    const todos = list.querySelectorAll('li');
    todos.forEach((todo) => {
        switch (select.value) {
            case 'all':
                todo.classList.add('d-flex')
                todo.classList.remove('d-none')
                input.removeAttribute('readOnly');
                break;
            case 'checked':
                if (todo.classList.contains('checked')) {
                    todo.classList.add('d-flex')
                    todo.classList.remove('d-none');
                    input.setAttribute('readOnly', 'true');

                } else {
                    todo.classList.add('d-none')
                    todo.classList.remove('d-flex')
                }
                break;
            case 'unchecked':
                if (!todo.classList.contains('checked')) {
                    todo.classList.add('d-flex')
                    todo.classList.remove('d-none');
                    input.setAttribute('readOnly', 'true');
                } else {
                    todo.classList.remove('d-flex')
                    todo.classList.add('d-none')
                } break;
        }
    });
}

//check storage
const checkStorage = () => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

const saveToLocal = (toDo) => {
    //check
    const todos = checkStorage();
    todos.push(toDo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const getToDo = () => {
    //check
    const todos = checkStorage();

    todos.forEach((todo) => {
        //create Elements
        let newLi = document.createElement('li');
        let newDiv = document.createElement('div');
        let btnOne = document.createElement('button');
        let btnTwo = document.createElement('button');
        let checkIcon = document.createElement('i');
        let delIcon = document.createElement('i');

        //assign classes
        newLi.classList.add('my-2', 'd-flex', 'justify-content-between', 'list-group-item');
        newDiv.classList.add('border', 'border-secondary', 'rounded-start', 'd-flex', 'align-items-center', 'flex-fill', 'p-1', 'fs-5', 'font-monospace');
        btnOne.classList.add('check-btn', 'btn', 'btn-outline-secondary', 'border-start-0', 'border-end-0', 'rounded-0');
        btnTwo.classList.add('trash-btn', 'btn', 'btn-outline-secondary', 'rounded-0', 'rounded-end');
        checkIcon.classList.add('bi', 'bi-check-square', 'pe-none');
        delIcon.classList.add('bi', 'bi-trash', 'pe-none');

        //append
        btnOne.append(checkIcon);
        btnTwo.append(delIcon);
        newDiv.append(todo);
        newLi.append(newDiv);
        newLi.append(btnOne);
        newLi.append(btnTwo);
        list.append(newLi);
    });
}

const removeFromLocal = (todo) => {
    const todos = checkStorage();
    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//Events
form.addEventListener('submit', newTodo);
list.addEventListener('click', deleteTodo);
list.addEventListener('click', checkTodo);
select.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded', getToDo);


