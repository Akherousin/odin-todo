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

  generateMarkup(project) {
    return `
    <h3 class="project-heading" contenteditable="true" data-type="heading">${project.heading}</h3>
    <p class="project-description" contenteditable="true" data-type="description">
      ${project.description}
    </p>
    <div class="project-subtasks" >    
    </div>
      <button class='subtasks-create'>create group</button>
    `;
  }
}

export default new ProjectView();
