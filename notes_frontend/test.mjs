/**
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './app/index.html'), 'utf8');

describe('Todo App', () => {
  let container;

  beforeEach(() => {
    // Cargar el HTML en el DOM
    document.documentElement.innerHTML = html.toString();
    container = document.body;

    // Importar y ejecutar el archivo app.js para manipular el DOM
    require('./app.js');
  });

  it('debería añadir un nuevo todo', () => {
    const addForm = container.querySelector('.add');
    const inputTitle = addForm.querySelector('input[name="add"]');
    const inputContent = addForm.querySelector('input[name="content"]');
    const list = container.querySelector('.todos');

    // Simular la adición de un nuevo todo
    inputTitle.value = 'New Todo';
    inputContent.value = 'New Content';
    fireEvent.submit(addForm);

    // Verificar que el nuevo todo se haya añadido al DOM
    expect(list).toHaveTextContent('New Todo');
    expect(list).toHaveTextContent('New Content');
  });

  it('debería eliminar un todo', () => {
    const addForm = container.querySelector('.add');
    const inputTitle = addForm.querySelector('input[name="add"]');
    const inputContent = addForm.querySelector('input[name="content"]');
    const list = container.querySelector('.todos');

    // Añadir un nuevo todo
    inputTitle.value = 'New Todo';
    inputContent.value = 'New Content';
    fireEvent.submit(addForm);

    // Eliminar el todo
    const deleteButton = list.querySelector('.delete');
    fireEvent.click(deleteButton);

    // Verificar que el todo se haya eliminado del DOM
    expect(list).not.toHaveTextContent('New Todo');
    expect(list).not.toHaveTextContent('New Content');
  });

  it('debería buscar y filtrar todos', () => {
    const addForm = container.querySelector('.add');
    const inputTitle = addForm.querySelector('input[name="add"]');
    const inputContent = addForm.querySelector('input[name="content"]');
    const searchInput = container.querySelector('.search');
    const list = container.querySelector('.todos');

    // Añadir algunos todos
    inputTitle.value = 'First Todo';
    inputContent.value = 'First Content';
    fireEvent.submit(addForm);

    inputTitle.value = 'Second Todo';
    inputContent.value = 'Second Content';
    fireEvent.submit(addForm);

    // Filtrar los todos
    searchInput.value = 'First';
    fireEvent.input(searchInput);

    // Verificar que solo los todos que coinciden con el término de búsqueda estén visibles
    expect(list.children).toHaveLength(2); // Asegurarse de que hay dos elementos en la lista
    expect(list.children[0]).toHaveTextContent('First Todo');
    expect(list.children[1]).toHaveClass('filtered'); // El segundo todo debería estar filtrado
  });
});
