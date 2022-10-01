import { generateId } from '../utilities';

const generatorObject = generateId();

class ProjectView {
  parentElement = document.querySelector('.project-content');

  render(project) {
    const markup = this.generateMarkup(project);
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  handleEdit(handler) {
    const editableContent = document.querySelectorAll(
      '[contenteditable="true"]'
    );
    editableContent.forEach((editable) =>
      editable.addEventListener('blur', () => {
        handler(editable.dataset.type, editable.textContent);
      })
    );
  }

  handleCreateNewGroup(handler) {
    const btnCreate = document.querySelector('.subtasks-create');
    const projects = document.querySelector('.project-subtasks');
    btnCreate.addEventListener('click', () => {
      const newHeading = document.createElement('h4');
      newHeading.innerText = '';
      newHeading.classList.add('subtasks-heading');
      newHeading.setAttribute('contenteditable', true);
      projects.appendChild(newHeading);
      newHeading.focus();

      // handle newInput
      newHeading.addEventListener('blur', () => {
        // if no name entered, destroy the new heading

        if (newHeading.innerText.trim() === '') {
          newHeading.remove();
        } else {
          // add new subtask group to the state
          handler(newHeading.innerText.trim());
        }
      });
    });
  }

  handleAddNewSubtask(handler) {
    const btnCreate = document.querySelector('.subtask-new');

    btnCreate.addEventListener('click', (e) => {
      const ulEl = document
        .querySelector(`[data-group=${e.target.dataset.group}]`)
        .querySelector('.subtasks-list');

      const newSubtask = document.createElement('li');
      newSubtask.classList.add('subtasks-item');
      const newInput = document.createElement('input');
      const newTaskId = `newtask-${generatorObject.next().value}`;

      newInput.setAttribute('type', 'checkbox');
      newInput.setAttribute('id', newTaskId);

      const newLabel = document.createElement('label');
      newLabel.setAttribute('for', newTaskId);
      newLabel.textContent = 'New Task';
      newLabel.setAttribute('contenteditable', true);

      newSubtask.appendChild(newInput);
      newSubtask.appendChild(newLabel);

      ulEl.appendChild(newSubtask);
      newLabel.focus();

      newLabel.addEventListener('blur', (e) => {
        newLabel.setAttribute('contenteditable', false);

        if (e.target.innerText.trim() === '') {
          newSubtask.remove();
        } else {
          // add new subtask to the list
          handler(ulEl.dataset.group, e.target.innerText.trim());
        }
      });
    });
  }

  generateMarkup(project) {
    return `
    <h3 class="project-heading" contenteditable="true" data-type="heading">${
      project.heading
    }</h3>
    <p class="project-description" contenteditable="true" data-type="description">
      ${project.description}
    </p>
    <div class="project-subtasks" >
      ${this.generateSubtasks(project.subtasks)}
    
    </div>
      <button class='subtasks-create'>create group</button>
    `;
  }

  generateSubtasks(subtasks) {
    if (!subtasks) return '';
    return subtasks.map(
      (subtask) => `
      <div data-group='${subtask.heading.toLowerCase()}'>
      <h4 class="subtasks-heading">${subtask.heading}</h4>
      <ul class="subtasks-list" data-group='${subtask.heading.toLowerCase()}'>
      ${subtask.list
        .map(
          (item) => `
          <li class="subtasks-item">
            <input type='checkbox' id='${item.subtask}' ${
            item.completed ? 'checked' : ''
          }>
            <label for='${item.subtask}'>${item.subtask}</label>
          </li>
          `
        )
        .join('')}
          
          </ul>
          <button class='subtask-new' data-group='${subtask.heading.toLowerCase()}'>+</button>
      </div>
          
    `
    );
  }
}

export default new ProjectView();
