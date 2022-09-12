// addNew = either 'project' or 'area'

class AddNewView {
  parentElement = document.querySelector('.project-content');

  render(addNew) {
    const markup = this.generateMarkup(addNew);

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  addNewViewHandler(addNew, handler) {
    const button = document.querySelector(`.new-${addNew}`);
    button.addEventListener('click', () => {
      this.render(addNew);
      this.addFormSubmitHandler(addNew, handler);
    });
  }

  addFormSubmitHandler(addNew, handler) {
    const form = document.querySelector(`.form_new-${addNew}`);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newEntry = e.target.children[1].value;
      e.target.children[1].value = '';

      if (!newEntry) return;
      handler(newEntry);
    });
  }

  generateMarkup(addNew) {
    return `
    <form class='form_new-${addNew}'>
    <label for="${addNew}-name">Add new ${addNew}:</label>
    
    <input type="text" id="${addNew}-name" name="${addNew}-name" required
    >
    </form>
      `;
  }
}

export default new AddNewView();
