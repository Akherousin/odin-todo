import { generateId, todoIdGenerator } from '../utilities';

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
      const newGroupId = `newgroup-${generatorObject.next().value}`;

      const newGroup = document.createElement('div');
      newGroup.setAttribute('data-group', newGroupId);

      const newHeading = document.createElement('h4');
      newHeading.innerText = '';
      newHeading.classList.add('subtasks-heading');
      newHeading.setAttribute('contenteditable', true);

      const newUl = document.createElement('ul');
      newUl.classList.add('subtasks-list');
      newUl.setAttribute('data-group', newGroupId);

      const newBtn = document.createElement('button');
      newBtn.innerText = '+';
      newBtn.classList.add('subtask-new');
      newBtn.setAttribute('data-group', newGroupId);

      newGroup.appendChild(newHeading);
      newGroup.appendChild(newUl);
      newGroup.appendChild(newBtn);
      projects.appendChild(newGroup);
      newHeading.focus();

      // handle newInput
      newHeading.addEventListener('blur', () => {
        // if no name entered, destroy the new heading

        if (newHeading.innerText.trim() === '') {
          newGroup.remove();
        } else {
          // change attributes according to new group name
          newGroup.setAttribute('data-group', newHeading.innerText.trim());
          newUl.setAttribute('data-group', newHeading.innerText.trim());
          newBtn.setAttribute('data-group', newHeading.innerText.trim());

          // add new subtask group to the state
          handler(newHeading.innerText.trim());
        }
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
      `[data-group=${e.target.dataset.group}]`
    );

    const ulEl = divEl.querySelector('.subtasks-list');

    const newSubtask = document.createElement('li');
    newSubtask.classList.add('subtasks-item');
    const newInput = document.createElement('input');
    const newTaskId = `subtask-${todoIdGenerator.next().value}`;

    newInput.setAttribute('type', 'checkbox');
    newInput.setAttribute('id', newTaskId);
    newInput.classList.add('subtask-checkbox');

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
      const newHeading = e.target.innerText.trim();

      if (newHeading === '') {
        newSubtask.remove();
      } else {
        // add new subtask to the list

        handler(ulEl.dataset.group, newHeading, newTaskId);
      }
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

  generateMarkup(project) {
    return `
    <h3 class="project-heading" contenteditable="true" data-type="heading">${
      project.heading
    }</h3>
    <p class="project-description" contenteditable="true" data-type="description">
      ${project.description}
    </p>
    <div class="project-subtasks" >
      ${this.generateSubtasks(project.subtasks).join('')}
    
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
            <input type='checkbox' id='${item.id}' class='subtask-checkbox' ${
            item.completed ? 'checked' : ''
          }>
            <label for='${item.id}'>${item.subtask}</label>
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
