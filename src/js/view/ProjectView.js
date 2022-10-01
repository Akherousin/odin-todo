const checkedBox = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <polyline
                    points="172 104 113.3 160 84 132"
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></polyline>
                  <rect
                    x="40"
                    y="40"
                    width="176"
                    height="176"
                    rx="8"
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></rect>
                </svg>`;

const uncheckedBox = `<svg
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
fill="#000000"
viewBox="0 0 256 256"
>
<rect width="256" height="256" fill="none"></rect>
<rect
  x="40"
  y="40"
  width="176"
  height="176"
  rx="8"
  fill="none"
  stroke="#000000"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="16"
></rect>
</svg>`;

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
    <h4 class="subtasks-heading">${subtask.heading}</h4>
    <ul class="subtasks-list">
      ${subtask.list
        .map(
          (item) => `
      <li class="subtasks-item">
      ${item.completed ? checkedBox : uncheckedBox}
      <p>${item.subtask}</p>`
        )
        .join('')}
    
    </ul>

    `
    );
  }
}

export default new ProjectView();
