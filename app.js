const getDB = () => JSON.parse(localStorage.getItem('todoBody')) ?? []
const setDB = (db) => localStorage.setItem('todoBody', JSON.stringify(db))


const createItem = (task, status, index) => {
    const item = document.createElement('label')
    item.classList.add('todo-item')
    item.innerHTML = `
    <input class="input-size" type="checkbox" data-index=${index} ${status}> 
    <div id="todo-item-text">${task}</div> 
    <input id="button-delete" type="button" value="x" title="deletar" data-index=${index}>
    `
    document.getElementById('todo-body').appendChild(item)
}

const clearScreen = () => {
    const todoBody = document.getElementById('todo-body')
    while (todoBody.firstChild) {
        todoBody.removeChild(todoBody.lastChild)
    }
}

const upgradeScreen = () => {
    clearScreen()
    const db = getDB()
    db.forEach((item, index) => createItem(item.task, item.status, index))
}

const addItem = (event) => {
    const button = event.key;
    const text = event.target.value
    if (button == 'Enter') {
        const db = getDB() 
        db.push({ 'task': text, 'status': '' })
        setDB(db)
        upgradeScreen()
        event.target.value = ""
    }
}

const deleteItem = (index) => {
    const db = getDB()
    db.splice(index, 1)
    setDB(db)
    upgradeScreen()
}

const upgradeItem = (index) => {
    const db = getDB()
    if (db[index].status == "") {
        db[index].status = "checked"
    } else {
        db[index].status = ""
    }
    setDB(db)
    upgradeScreen()
}

const clickItem = (event) => {
    const element = event.target
    if (element.type == 'button') {
        const index = element.dataset.index
        deleteItem(index)
    } else if (element.type == 'checkbox') {
        const index = element.dataset.index
        upgradeItem(index)
    }
}

document.getElementById('todo-text').addEventListener('keypress', addItem)
document.getElementById('todo-body').addEventListener('click', clickItem)
upgradeScreen()
