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

  generateMarkup(project) {
    return `
    <h3 class="project-heading">${project.heading}</h3>
    <p class="project-description">
      ${project.description}
    </p>
    <div class="project-subtasks">
      ${this.generateSubtasks(project.subtasks)}
    </div>
    `;
  }

  generateSubtasks(subtasks) {
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
