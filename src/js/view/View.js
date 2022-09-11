class View {
  parentElement = '';
  markup = '';

  render(state) {
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }
}

export default View;
