import * as model from './model';
import navView from './view/NavView';
import projectView from './view/ProjectView';

function controlSelectedProject(newId) {
  model.state.setSelectedProject(newId);
  projectView.render(model.state.getSelectedProject());
}

export const init = function () {
  navView.render(model.state);

  projectView.render(model.state.getSelectedProject());
  navView.handleNewSelectedProject(controlSelectedProject);
};
