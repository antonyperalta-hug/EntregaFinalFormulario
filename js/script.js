document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formContacto");
  const btnEnviar = document.getElementById("btnEnviar");
  const mensajeValidacion = document.getElementById("mensajeValidacion");

  function validateForm() {
    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();

    if (nombre === "" || edad === "") {
      mensajeValidacion.textContent = "Por favor, complete todos los campos";
      mensajeValidacion.style.color = "red";
      return false;
    }

    const edadNumero = Number(edad);
    if (isNaN(edadNumero) || edadNumero <= 18 || edadNumero >= 100) {
      mensajeValidacion.textContent = "Tienes que ser mayor de edad para registrarte";
      mensajeValidacion.style.color = "red";
      return false;
    }

    if (!isNaN(nombre)) {
      mensajeValidacion.textContent = "Ingrese un nombre válido";
      mensajeValidacion.style.color = "red";
      return false;
    }

    mensajeValidacion.style.color = "green";
    mensajeValidacion.textContent = "¡Formulario enviado correctamente!";
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      const nombre = document.getElementById("nombre").value.trim();
      const edad = document.getElementById("edad").value.trim();

      fetch("https://formspree.io/f/mjkokybz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, edad })
      })
        .then(res => {
          if (res.ok) {
            mensajeValidacion.textContent = "¡Enviado exitosamente!";
            window.location.href = "./pages/valForm.html";
          } else {
            mensajeValidacion.textContent = "Error al enviar";
          }
        })
        .catch(() => {
          mensajeValidacion.textContent = "Error de conexión";
        });
    }
  });

  mostrarProductos(productos);
  actualizarCarrito();
});


const productos = [
  {
    id: 1,
    title: "Mandala Flor Expansión Tonos Azules",
    price: 1500,
    image: "media/imagen/Mandalaflor.jpg"
  },
  {
    id: 2,
    title: "Mandala Geometria Sagrada Tonos Rosas",
    price: 2300,
    image: "media/imagen/Mandala estrella.png"
  },
  {
  id: 3,
    title: "Mandala Selva Tonos a elección",
    price: 1800,
    image: "media/imagen/MandalaSelva.png"
  },
  {
    id: 4,
    title: "Mandala Flor Tonos Dorados",
    price: 2500,
    image: "media/imagen/MandalaFlordorada.png"
  },
  {
  id: 5,
    title: "Espejo Circular Tonos Lilas",
    price: 3000,
    image: "media/imagen/espejocircularlila.jpg"
  },
  {
    id: 6,
    title: "Espejo Flor Tonos Dorados",
    price: 3200,
    image: "media/imagen/espejoflordorado.png"
  },
  
];

mostrarProductos(productos);


/*
fetch('https://fakestoreapi.com/products?limit=6')
  .then(response => response.json())
  .then(data => mostrarProductos(data))
  .catch(error => {
    document.getElementById("contenedorProductos").innerHTML = "<p>Error al cargar los productos.</p>";
    console.error(error);
  });
*/
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos(productos) {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" />
      <h3>${producto.title}</h3>
      <p>$${producto.price}</p>
      <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });

  document.querySelectorAll('.agregar-carrito').forEach(boton => {
    boton.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const producto = productos.find(p => p.id == id);
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert('Producto agregado al carrito');
      actualizarCarrito();
    });
  });
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  const mensaje = document.getElementById("mensajeCarrito");
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    mensaje.textContent = "El carrito está vacío";
    return;
  }

  carrito.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<p>${item.title} - $${item.price}</p>`;
    listaCarrito.appendChild(itemDiv);
  });

  mensaje.textContent = `Total: $${carrito.reduce((acc, prod) => acc + prod.price, 0).toFixed(2)}`;
}

document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarCarrito();
});

document.getElementById("comprarCarrito").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("No hay productos en el carrito");
    return;
  }
  alert("¡Compra realizada con éxito!");
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarCarrito();
});

actualizarCarrito();
