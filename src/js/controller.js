import * as model from './model';
import navView from './view/NavView';
import projectView from './view/ProjectView';

export const init = function () {
  navView.render(model.state);
  projectView.render(model.state.getSelectedProject());
};
