//Envío del formulario
        function añadir(){

           // const citasGuardadas=JSON.parse(localStorage.getItem("citas")) || [];
            document.getElementById("form")
            const nombre = document.getElementById("nombre").value;
            const apellido=document.getElementById("apellido").value
            const dni=document.getElementById("dni").value
            const telefono=document.getElementById("telefono").value
            const fechaN=document.getElementById("nacimiento").value
            const fecha = document.getElementById("fecha").value;
            const hora=document.getElementById("hora").value
            const area=document.getElementById("area").value
           
            const fechaActual = new Date().toISOString().split('T')[0];            
            const fechaSeleccionada = fecha
            if(fechaSeleccionada<fechaActual){
                alert("No puedes introducir una fecha anterior a la actual")
                return;
            }
       
            if (!nombre || !apellido || !dni ||!telefono || !fechaN || !fecha || !hora) {
                alert("Por favor, complete todos los campos.");
                return;
            }
            if (!/^\[0-9]{8}[A-Za-z]{1}$/.test(dni)) {
                alert("El DNI debe contener 8 números seguidos de una letra");
                return;
            }

            // objeto cita con los datos ingresados
            const cita = {
                
                nombre,
                apellido,
                dni,
                telefono,
                fechaN,
                fecha,
                hora,
                area
            };

           
            
            // Agregar la nueva cita
            citasGuardadas.push(cita);

            // Guardar las citas en localStorage con setItem
            localStorage.setItem("citas", JSON.stringify(citasGuardadas));

                cargarCitas();
        };

 // Función para cargar y mostrar las citas desde localStorage
 function cargarCitas() {
            const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [] ;
            const citasTable = document.getElementById("citasTable");
             citasTable.innerHTML="";
            if (citasGuardadas.length === 0) {
                const vacio = document.createElement("tr");
                vacio.innerHTML = "<td colspan='3'>No hay citas</td>";
                citasTable.appendChild(vacio);
            } else {
                citasGuardadas.forEach((cita, index) => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${index+1}</td>
                        <td>${cita.nombre}</td>
                        <td>${cita.apellido}</td>
                        <td>${cita.dni}</td>
                        <td>${cita.telefono}</td>
                        <td>${cita.fechaN}</td>
                        <td>${cita.fecha}</td>
                        <td>${cita.hora}</td>
                        <td>${cita.area}</td>
                        <td>
                            <button onclick="editarCita(${index})">Editar</button>
                            <button onclick="eliminarCita(${index})">Eliminar</button>
                        </td>
                    `;
                    citasTable.appendChild(fila);
                });
            }
        }

      function editarCita(index) {
            const citasGuardadas = JSON.parse(localStorage.getItem("citas")) ||[] ;
            const cita = citasGuardadas[index];

            if (cita) {
                //  formulario con los datos de la cita seleccionada
                document.getElementById("nombre").value = cita.nombre;
                document.getElementById("apellido").value = cita.apellido;
                document.getElementById("dni").value = cita.dni;
                document.getElementById("telefono").value = cita.telefono;
                document.getElementById("nacimiento").value = cita.fechaN;
                document.getElementById("fecha").value = cita.fecha;
                document.getElementById("hora").value = cita.hora;
                document.getElementById("area").value = cita.area;

                // Cambiar el texto del botón Guardar Cita a Guardar Cambios
                document.getElementById("guardarCita").innerText = "Guardar Cambios";

                // Agregar un atributo data-index al botón Guardar Cita con el índice de la cita
                document.getElementById("guardarCita").setAttribute("data-index", index);
            }
        }

        // Modificar la función añadir para agregar o actualizar citas 
        function añadir() {
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const dni = document.getElementById("dni").value;
            const telefono = document.getElementById("telefono").value;
            const fechaN = document.getElementById("nacimiento").value;
            const fecha = document.getElementById("fecha").value;
            const hora = document.getElementById("hora").value;
            const area = document.getElementById("area").value;

            const fechaActual = new Date().toISOString().split('T')[0];
            const fechaSeleccionada = fecha;
            if (fechaSeleccionada < fechaActual) {
                alert("No puedes introducir una fecha anterior a la actual");
                return;
            }

            if (!nombre || !apellido || !dni || !telefono || !fechaN || !fecha ||!hora) {
                alert("Por favor, complete todos los campos.");
                return;
            }
            if (!/^[0-9]{8}[A-Za-z]{1}$/.test(dni)){
                alert("El DNI debe contener 8 números seguidos de una letra");
                return;
            }

            // Obtener las citas existentes desde localStorage
            const citasGuardadas = JSON.parse(localStorage.getItem("citas"))  ||[];

            // Obtener el índice almacenado en el atributo data-index del botón Guardar Cita
            const index = document.getElementById("guardarCita").getAttribute("data-index");

            if (index !== null) {
                // Si hay un índice, significa que estamos editando una cita existente
                citasGuardadas[index] = {
                    nombre,
                    apellido,
                    dni,
                    telefono,
                    fechaN,
                    fecha,
                    hora,
                    area
                };

                // Limpiar el atributo data-index y cambiar el texto del botón
                document.getElementById("guardarCita").removeAttribute("data-index");
                document.getElementById("guardarCita").innerText = "Guardar Cita";
            } else {
                // Si no hay un índice, estamos agregando una nueva cita
                const nuevaCita = {
                    nombre,
                    apellido,
                    dni,
                    telefono,
                    fechaN,
                    fecha,
                    hora,
                    area
                };

                // Agregar la nueva cita al array de citas
                citasGuardadas.push(nuevaCita);
            }

            // Guardar las citas actualizadas en localStorage
            localStorage.setItem("citas", JSON.stringify(citasGuardadas));

            // Limpiar el formulario después de agregar o editar una cita
            document.getElementById("form").reset();

            // Recargar la tabla de citas
            cargarCitas();
        }

       // Función para eliminar una cita
function eliminarCita(index) {
    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) ;
    if (index >= 0 && index < citasGuardadas.length) {
        // Elimina la cita del arreglo
        citasGuardadas.splice(index, 1);

        // Guarda las citas actualizadas en localStorage
        localStorage.setItem("citas", JSON.stringify(citasGuardadas));

        // Vuelve a cargar la tabla de citas solo si hay citas después de la eliminación
        if (citasGuardadas.length > 0) {
            cargarCitas();
        } else {
            // Si no hay citas, limpiar el contenido de la tabla
            const citasTable = document.getElementById("citasTable");
            citasTable.innerHTML = "";
        }
    }
}

// Llama a cargarCitas al cargar la página
cargarCitas();
