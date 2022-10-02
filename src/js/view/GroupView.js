import { todoIdGenerator } from '../utilities';

class GroupView {
  render(subtasks) {
    const markup = this.generateMarkup(subtasks);

    this.clear();
    document
      .querySelector('.project-subtasks')
      .insertAdjacentHTML('afterbegin', markup);
  }

  update(group, newSubtask) {
    const ul = document
      .querySelector(`[data-group=${group}]`)
      .querySelector('.subtasks-list');
    const newLi = this.newTaskMarkup(newSubtask);

    ul.insertAdjacentHTML('beforeend', newLi);
  }

  clear() {
    document.querySelector('.project-subtasks').innerHTML = '';
  }

  handleCreateNewGroup(handler) {
    const btnCreate = document.querySelector('.subtasks-create');
    const projects = document.querySelector('.project-subtasks');

    btnCreate.addEventListener('click', () => {
      const newForm = document.createElement('form');
      const newInput = document.createElement('input');
      newForm.appendChild(newInput);
      projects.appendChild(newForm);

      newInput.focus();

      newForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!newInput.value) return;

        handler(newInput.value);
      });
    });
  }

  handleAddNewSubtask(handler) {
    const btnsCreate = document.querySelectorAll('.subtask-new');
    if (!btnsCreate) return;

    const handleClick = function (e) {
      this.clickBtnNewTask(e, handler);
    }.bind(this);

    btnsCreate.forEach((btn) => {
      btn.onclick = handleClick;
    });
  }

  clickBtnNewTask(e, handler) {
    const divEl = document.querySelector(
      `[data-group='${e.target.dataset.group}']`
    );
    const btnEl = divEl.querySelector('.subtask-new');

    const newForm = document.createElement('form');
    const newInput = document.createElement('input');
    newForm.appendChild(newInput);

    divEl.insertBefore(newForm, btnEl);

    newInput.focus();

    newForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newId = todoIdGenerator.next().value;
      handler(divEl.dataset.group, newInput.value, newId);
      divEl.removeChild(newForm);
    });
  }

  handleCheckboxChange(handler) {
    const checkboxes = document.querySelectorAll('.subtask-checkbox');

    checkboxes.forEach((checkbox) =>
      checkbox.addEventListener('change', () => {
        const group = checkbox.closest('.subtasks-list').dataset.group;
        handler(group, checkbox.id);
      })
    );
  }

  newTaskMarkup(task) {
    return `<li class="subtasks-item">
    <input type='checkbox' id='subtask-${task.id}' class='subtask-checkbox' ${
      task.completed ? 'checked' : ''
    }>
    <label for='subtask-${task.id}'>${task.subtask}</label>
  </li>`;
  }

  generateMarkup(subtasks) {
    if (!subtasks) return '';
    return subtasks
      .map(
        (subtask) => `
        <div data-group='${subtask.heading.toLowerCase()}'>
        <h4 class="subtasks-heading">${subtask.heading}</h4>
        <ul class="subtasks-list" data-group='${subtask.heading.toLowerCase()}'>
        ${subtask.list.map((item) => this.newTaskMarkup(item)).join('')}
            
            </ul>
            <button class='subtask-new' data-group='${subtask.heading.toLowerCase()}'>+</button>
        </div>
            
      `
      )
      .join('');
  }
}

export default new GroupView();
