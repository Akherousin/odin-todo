// import boxSvg from '../../img/box.svg';
// import circleSvg from '../../img/circle.svg';

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

  generateMarkup(state) {
    return `${state.areas
      .map(
        (area) => `
      <li class='area-item'>
      <div class='area-title'>
          ${boxSvg}
          <h2 class='area-heading'>${area.title}</h2>
      </div>
      <ul class='project-list'>
      ${this.generateProjectList(area)}
      </ul>
      </li>`
      )
      .join('')}`;
  }

  generateProjectList(area) {
    return `${area.projectList
      .map(
        (project) => `
      <li>
      ${circleSvg}
      <a href='#'>${project.heading}</a>
      </li>

      `
      )
      .join('')}`;
  }
}

export default new NavView();
