import * as model from './model';
import addNewView from './view/AddNewView';
import navView from './view/NavView';
import projectView from './view/ProjectView';

const state = model.state;

function controlSelectedProject(newId) {
  model.setSelectedProject(newId);
  projectView.render(model.getSelectedProject());
}

function controlSelectedArea(newArea) {
  model.changeSelectedArea(newArea);
}

function controlAddNewArea(newArea) {
  model.addNewArea(newArea);
  navView.render(state);
}

function controlAddNewProject(newProject) {
  model.addNewProject(newProject);
  navView.render(state);
}

export const init = function () {
  navView.render(state);
  projectView.render(model.getSelectedProject());
  navView.handleNewSelectedProject(controlSelectedProject);
  addNewView.addNewViewHandler('area', controlAddNewArea);
  addNewView.addNewViewHandler('project', controlAddNewProject);
  navView.handleNewSelectedArea(controlSelectedArea);

  //   addNewView.addNewViewHandler('project');
};
