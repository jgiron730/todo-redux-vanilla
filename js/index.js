var miForm = document.getElementById('formulario')
var miEdit = document.getElementById('editando')
var lista = document.getElementById('lista')
var cancelar = document.getElementById('cancel')


var initialState = { valor: 0, lista: [] };

var llave=0

const mostrar =(s,valor,k)=>{
    llave=k;
    miEdit[0].value=valor

    console.log(miEdit[0])

    if(s){
        miForm.style.display = 'block'
        miEdit.style.display = 'none'
    }else{
        miForm.style.display = 'none'
        miEdit.style.display = 'block'
    }
}

cancelar.addEventListener('click', function(){
    mostrar(true)
})

mostrar(true)

const add = (i, t) => {
    return {
        type: 'ADD',
        id: i,
        tarea: t
    }
}
const borrar = (i) => {
    return {
        type: 'DELETE',
        id: i,
        tarea: i
    }
}
const editar = (i,t) => {
    return {
        type: 'EDIT',
        id: i,
        tarea: t
    }
}

const reductor = (estado = initialState, accion) => {
    switch (accion.type) {
        case 'ADD':
            return { ...estado, lista: [...estado.lista, { id: accion.id, tarea: accion.tarea }] }
        case 'DELETE':
            return { ...estado, lista: estado.lista.filter((x, k) => k != accion.id) }
        case 'EDIT':
            return { ...estado, lista: estado.lista.map((x, k) => k == accion.id ? {...x, tarea: accion.tarea}  : x ) }

        default:
            return estado
    }
}


var tienda = Redux.createStore(reductor)


miForm.addEventListener('submit', function (e) {
    console.log(e.target[0].value)
    e.preventDefault()
    if (e.target[0].value !== "") {

        tienda.dispatch(add(0, e.target[0].value))
        e.target[0].value = ""
    } else {
        alert('Dont be lazy! Add a task.')
    }
})
miEdit.addEventListener('submit', function (e) {
    console.log(e.target[0].value)
    e.preventDefault()
    if (e.target[0].value !== "") {

        tienda.dispatch(editar(llave, e.target[0].value))
        
    } else {
        alert('Dont be lazy! Add a task.')
    }
})


var control = document.getElementById('control')

const iniciar = () => {

    lista.innerHTML = "";


    console.log((tienda.getState().lista).length)

    if ((tienda.getState().lista).length == 0) {
        lista.innerHTML += `<li class="list-group-item align-middle"> Empty   </li>`
    } else {

        for (const [k, tarea] of tienda.getState().lista.entries()) {
            lista.innerHTML += `<li class="list-group-item align-middle">${tarea.tarea}
        <button type="button" onclick="tienda.dispatch(borrar(${k}))" class="btn btn-danger btn-sm float-right ml-1"><i class="fas fa-trash"></i></button>
        <button type="button" class="btn btn-warning btn-sm float-right" onclick="mostrar(${false},'${tarea.tarea}',${k})"><i class="fas fa-pen"></i></button>
    </li>`
        }
    }

}

iniciar()
tienda.subscribe(iniciar)

