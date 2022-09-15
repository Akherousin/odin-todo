import { getDragAfterElement } from '../utilities';

const boxSvg = `<svg xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <path
                      d="M224,177.3V78.7a8.1,8.1,0,0,0-4.1-7l-88-49.5a7.8,7.8,0,0,0-7.8,0l-88,49.5a8.1,8.1,0,0,0-4.1,7v98.6a8.1,8.1,0,0,0,4.1,7l88,49.5a7.8,7.8,0,0,0,7.8,0l88-49.5A8.1,8.1,0,0,0,224,177.3Z"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="16"
                    ></path>
                    <polyline
                      points="222.9 74.6 128.9 128 33.1 74.6"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="16"
                    ></polyline>
                    <line
                      x1="128.9"
                      y1="128"
                      x2="128"
                      y2="234.8"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="16"
                    ></line>
                  </svg>`;

const circleSvg = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <circle
                    cx="128"
                    cy="128"
                    r="96"
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></circle></svg
                >`;

class NavView {
  parentElement = document.querySelector('.areas-list');

  render(state) {
    const markup = this.generateMarkup(state);
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  handleNewSelectedProject(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const project = e.target.closest('[data-id]');
      if (!project) return;
      handler(project.dataset.id);
    });
  }

  handleNewSelectedArea(handler) {
    const areasList = document.querySelector('.areas-list');
    areasList.addEventListener('click', function (e) {
      const selectedArea = e.target.closest('[data-area]');
      if (!selectedArea) return;
      const areasAll = document.querySelectorAll('.area-item');
      selectedArea.classList.add('area-item-selected');
      areasAll.forEach((area) => {
        if (area !== selectedArea) area.classList.remove('area-item-selected');
      });

      handler(selectedArea.dataset.area);
    });
  }

  handleDraggable(handler) {
    const draggables = document.querySelectorAll('[data-draggable]');
    const areas = document.querySelectorAll('.area-item');

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });

    areas.forEach((currentArea) => {
      currentArea.addEventListener('dragover', (e) => {
        e.preventDefault();

        const currentDraggable = document.querySelector('.dragging');
        const currentList = currentArea.querySelector('.project-list');
        const afterElement = getDragAfterElement(currentList, e.clientY);

        if (afterElement === null) {
          currentList.appendChild(currentDraggable);
        } else {
          currentList.insertBefore(currentDraggable, afterElement);
        }
        handler(currentDraggable, currentArea.dataset.area);
      });
    });
  }

  generateMarkup(state) {
    return `${state.areas
      .map((area) =>
        area === ''
          ? `<li class='area-item' data-area='${area}'>
          <ul class='project-list'>
          ${this.generateProjectList(area, state.projectList)}
          </ul>
          </li>`
          : `
      <li class='area-item' data-area='${area}'>
      <div class='area-title'>
          ${boxSvg}
          <h2 class='area-heading'>${area}</h2>
      </div>
      <ul class='project-list'>
      ${this.generateProjectList(area, state.projectList)}
      </ul>
      </li>`
      )
      .join('')}`;
  }

  generateProjectList(area, projectList) {
    return `${projectList
      .map((project) =>
        project.area === area
          ? ` 
      <li data-id='${project.id}' data-draggable draggable='true'>
      ${circleSvg}
      <a href='#'>${project.heading}</a>
      </li>
      `
          : ''
      )
      .join('')}`;
  }
}

export default new NavView();
