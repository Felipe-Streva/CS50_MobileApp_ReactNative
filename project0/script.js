const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


function elementFactory(type, id, classe, content){
  let elementCreated = document.createElement(`${type}`);
  elementCreated.setAttribute('id', `${id}`);
  elementCreated.classList.add(`${classe}`);
  elementCreated.innerText = `${content}`;

  return elementCreated;
}

function deleteElement(id, classePai){
  let element = document.getElementById(`${id}`);
  classePai.removeChild(element)
}

let buttonNew = document.querySelector('#buttonNew')
buttonNew.addEventListener('click', newTodo)

function newTodo() {
  let form = document.querySelector('#form')

  let label = elementFactory('label', 'labelTODO', 'label-todo', 'Add To-Do message')
  let input = elementFactory('input', 'inputTODO', 'input-todo', '')

  let button = elementFactory('button', 'buttonTODO', 'button-todo', 'Add')
  form.appendChild(label)
  form.appendChild(input)
  form.appendChild(button)
  label.htmlFor = '#inputTODO'
  input.name = 'input'

  form.addEventListener('submit', function(event) {
    event.preventDefault()
    let liCount = document.querySelectorAll('.li').length
    let ul = document.querySelector('#todo-list')
    let li = elementFactory('li', `li${liCount}`, 'li', '')
    li.innerHTML = `<input type="checkbox" class="checkbox" id="checkbox${liCount}" onClick="reviewNumberChecked()">
     <label for="#checkbox" class="label-checkbox" id="labelCheckbox${liCount}">${this.elements.input.value}</label>
     <button class="delete-button" id="deleteButton${liCount}" onClick="deleteTask(${liCount})">Delete</button>`
    ul.appendChild(li)
    this.elements.input.value = ''
    reviewNumberItem()
    reviewNumberChecked()
  })
  
  buttonNew.removeEventListener('click', newTodo)
}

function reviewNumberItem(){
  let list = document.querySelectorAll('.li')
  itemCountSpan.innerText = list.length
}

function reviewNumberChecked(){
  let list = document.querySelectorAll('.checkbox')
  let count = 0
  list.forEach((el)=>{
    if(el.checked == false) count++
  })
  uncheckedCountSpan.innerText = count
}

function deleteTask(number){
  let ul = document.querySelector('#todo-list')
  deleteElement(`li${number}`, ul)
  reviewNumberChecked()
  reviewNumberItem()
}



