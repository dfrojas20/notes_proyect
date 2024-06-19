const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

var url = `http://LB_IP/notes`

fetch(url, {
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },})
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    return response.json();
  })
  .then(data => {
    // Aquí tienes acceso a los datos JSON
    data 
    console.log(data[0])
    data.forEach(element => {
        let html = `
    <li class="list-group-item" id=${element._id}>
        <span>Título:</span>
        <span contenteditable="true" id=title${element._id}>${element.title}</span><br>
        <span contenteditable="true" id=content${element._id}>${element.content}</span><br>
        <span>Última actualización: ${element.last_updated_date.substring(0, 10)} ${element.last_updated_date.substring(11, 19)}</span><br>
        <i class="far fa-trash-alt delete"></i>
        <i class="far fa-edit edit"></i>
    </li>
    `;
     list.innerHTML += html;
    });
  })
  .catch(error => {
     alert('Error al cargar el archivo JSON:', error);
  });

// add new todos
/*/const generateTemplate = (todo,content) => {
  const html = `
        <li class="list-group-item">
        <span>${todo}</span><br>
        <span>Contenido: ${content}</span><br>
        <i class="far fa-trash-alt delete"></i>
        </li>
        `;
  list.innerHTML += html;
};
/*/

// clear todo text box input and prevent inputs with unecessary white space
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = addForm.add.value.trim();
  const content = addForm.content.value.trim()

  postJson(title,content)

  if (title.length) {
    //generateTemplate(title,content);
    //addForm.reset();
  }

});

// delete todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    console.log(e.target.parentElement.id)
    try {
      deleteJson(e.target.parentElement.id,e)
    } catch (error) {
      alert(error)
    }
  }
  if (e.target.classList.contains("edit")) {
    id = e.target.parentElement.id
    title = document.getElementById(`title${id}`).innerText
    content = document.getElementById(`content${id}`).innerText
    try {
      putJson(id,title,content)
    } catch (error) {
      alert(error)
    }
  }
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});


function postJson(title,content){
    const data = {
        title: title,
        content: content,
    };
    // Configuración de la solicitud POST
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convierte el objeto JSON a una cadena JSON
    };
    // Realizar la solicitud POST utilizando fetch
    fetch(url, requestOptions)
        .then(response => {
            // Verificar si la respuesta es exitosa (código 200)
            if (!response.ok) {
                throw new Error('No se pudo completar la solicitud');
            }
            // Devolver la respuesta como JSON
            location.reload();
            return response.json();

        })
        .then(data => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            // Manejar errores
            throw new Error('Error en la solicitud POST:', error);
        });

   }

function deleteJson(id,e){
    const data = {
        id_note: id,
    };
    // Configuración de la solicitud POST
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convierte el objeto JSON a una cadena JSON
    };
    // Realizar la solicitud POST utilizando fetch
    fetch(url + `?id_note=${id}`, requestOptions)
        .then(response => {
            // Verificar si la respuesta es exitosa (código 200)
            if (!response.ok) {
                throw new Error('No se pudo completar la solicitud');
            }
            // Devolver la respuesta como JSON
            //location.reload();
            e.target.parentElement.remove();
            return response.json();

        })
        .then(data => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            // Manejar errores
            alert(`Error en la solicitud DELETE:${error}`);
        });
      }
      
function putJson(id,title,content){
        const data = {
            id_note: id,
            title: title,
            content: content,
        };
        // Configuración de la solicitud POST
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Convierte el objeto JSON a una cadena JSON
        };
        // Realizar la solicitud POST utilizando fetch
        fetch(url, requestOptions)
            .then(response => {
                // Verificar si la respuesta es exitosa (código 200)
                if (!response.ok) {
                    throw new Error('No se pudo completar la solicitud');
                }
                // Devolver la respuesta como JSON
                //location.reload();
                alert('nota editada satisfactoriamente')
                return response.json();
    
            })
            .then(data => {
                // Manejar la respuesta del servidor
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                // Manejar errores
                throw new Error('Error en la solicitud PUT:', error);
            });
    
       }