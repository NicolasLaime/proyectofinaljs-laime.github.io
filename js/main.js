
// FECHT

let productos = []

fetch("./js/productos.json")
 .then(Response => Response.json())
 .then(data => {
    productos = data;
    cargarProductos(productos);


 })







// VARIABLES!

const contenedorProductos = document.querySelector('#contenedor-productos'); // productos
const botonesCategorias = document.querySelectorAll('.boton-categoria'); // para cambiar categorias
const tituloPrincipal = document.querySelector('#titulo-principal'); // para cambiar titutlo de las categorias
let botonesAgregar = document.querySelectorAll('.producto-agregar') // botones de agregar al carrito
const numerito = document.querySelector('#numerito')







// CARGO LOS PRODUCTOS EN LA SECCION "TODOS LOS PRODUCTOS "
function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";  // deja vacio el html vacio despues lee el filtro*

     productosElegidos.forEach( producto => {

       const div = document.createElement("div");
       
       div.classList.add("producto");
       div.innerHTML = `
       
           <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
         <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">agregar</button>
          </div>
        `;

        contenedorProductos.append(div)
             
        
    })
    
     
    actualizarBotonesAgregar();


}



// FuNCION PARA LLAMAR POR CATEGORIAS

botonesCategorias.forEach( boton => {
    boton.addEventListener('click', (e) => {
         
        botonesCategorias.forEach(boton => boton.classList.remove('active'));  // esto elimina la clase "active" cuando clickeo cualquier categoria en el "menu" de la izquierda

        e.currentTarget.classList.add('active');

        
        // Filtramos por categoria


        if (e.currentTarget.id != "todos"){                   // CON ESTO LE DIGO QUE SI ES DIFERENTE A LA CLASSE "TODOS" HAGO LO DE ABAJO! Y CON EL ELSE LO MANDO A QUE CARGUE TODOS LOS PRODUCTOS

            const productoCategoria = productos.find( producto => producto.categoria.id === e.currentTarget.id)

            tituloPrincipal.innerText = productoCategoria.categoria.nombre;   // CON ESTO CODEO EL NOMBRE DEL TITULO EN CADA CATEGORIA



            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)  // Con esto le decimos que filtre el array por id de productos


            cargarProductos(productosBoton);


        }else {

            tituloPrincipal.innerText = "todos los productos";
            cargarProductos(productos);    // CON ESTO LE DIGO QUE SI NO CARGA LO DE ARRIBA CARGUE TODOS LOS PRODUCTOS
        }
        

    })
})


// BOTONES AGREGAR


function actualizarBotonesAgregar(){

    botonesAgregar = document.querySelectorAll('.producto-agregar') // botones de agregar al carrito

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlcarrito);

    })
}




let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem('productos-en-carrtio');


if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}






function agregarAlcarrito(e){

    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        
        const index =productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;


    } else{
       
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)

 
    }

    actualizarNumerito();


    // LOCALSTORAGE

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito))
     

}


// NUMERITO CARRITO

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito
}