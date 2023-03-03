//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");  
const listaCursos = document.querySelector("#lista-cursos"); 
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito"); 
let articulosCarrito = []; 


cargarEventListener(); 

function cargarEventListener(){
    listaCursos.addEventListener("click", agregarCurso);
    
    //Eliminar cursos del carrito 
    
    carrito.addEventListener("click", eliminarCurso); 

    //Muestra los cursos en el carrito con localstorage

    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []; 
        carritoenHtml(); 
    })

    //Vaciar completamente el carrito 

    vaciarCarritoBtn.addEventListener("click", ()=>{
        articulosCarrito = [] //Vaciamos el arreglo
        limpirarHtml(); //Eliminarmos todo el html
        carritoenHtml(); 

    }); 


}

//Funciones 
function agregarCurso(event){
    event.preventDefault(); 

    if(event.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = event.target.parentElement.parentElement; 
        leerDatosCurso(cursoSeleccionado); 
    }
}

//Elimina un curso del carrido 

function eliminarCurso(event){
    //Se le va a pasar el evento para identificar a que se le dio click
    if(event.target.classList.contains("borrar-curso")){
        const cursoId = event.target.getAttribute("data-id"); 

        //Elimina del arreglo por el data id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        
        carritoenHtml(); //Iterar sobre el carrito y mostrar su html
        console.log(articulosCarrito); 
    }
    

}

//Lee el contenido del html al que le dimos click

function leerDatosCurso(curso){
    // console.log(curso); 
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src, 
        titulo: curso.querySelector("h4").textContent, 
        precio: curso.querySelector("span").textContent, 
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); 

    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado con la suma de cursos
            }else{
                return curso; //Retorna el objeto sin actualizar o sin duplicados
            }
        }); 

        articulosCarrito = [...cursos]; 
    }else{
       //Se agrega el curso al carrito  
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    //Agregando elementos al arreglo de carrito

    

    console.log(articulosCarrito); 
    carritoenHtml();
}

//Muestra el carrito de compras en el html

function carritoenHtml(){

    //Limpiar el html
    limpirarHtml(); 
    //Recorrer el carrito y generar el html
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio, cantidad,id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src= "${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `; 

        contenedorCarrito.appendChild(row); 
    });

    //Sincronizar con storage 

    //Agregar el carrito de compras 

    sincronizarStorage(); 
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//Elimina los cursos del table tbody 

function limpirarHtml(){
    //Forma lenta de limpiar el html
    // contenedorCarrito.innerHTML = ""; 

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}



