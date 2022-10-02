import * as model from './model';
import addNewView from './view/AddNewView';
import navView from './view/NavView';
import projectView from './view/ProjectView';

const state = model.state;

function controlSelectedProject(newId) {
  model.setSelectedProject(newId);
  projectView.render(model.getSelectedProject());
  projectView.handleEdit(controlEditData);
  projectView.handleCreateNewGroup(controlCreateNewGroup);
  projectView.handleAddNewSubtask(controlCreateNewSubtask);
  projectView.handleCheckboxChange(controlCheckboxChange);
}

function controlSelectedArea(newArea) {
  model.changeSelectedArea(newArea);
}

function controlAddNewArea(newArea) {
  model.addNewArea(newArea);
  navView.render(state);
  navView.handleDraggable(controlDragProject);
}

function controlAddNewProject(newProject) {
  model.addNewProject(newProject);
  navView.render(state);
  navView.handleDraggable(controlDragProject);
}

function controlDragProject(draggedProject, area) {
  model.changeProjectArea(draggedProject, area);
}

function controlEditData(type, newData) {
  model.changeProjectData(type, newData);
  navView.render(state);
}

function controlCreateNewGroup(newGroupName) {
  model.addNewSubtasksGroup(newGroupName);
  projectView.handleAddNewSubtask(controlCreateNewSubtask);
}

function controlCreateNewSubtask(tasksGroup, newSubtask, newSubtaskId) {
  model.addNewSubtask(tasksGroup, newSubtask, newSubtaskId);
  projectView.handleCheckboxChange(controlCheckboxChange);
}

function controlCheckboxChange(group, checkboxId) {
  model.changeSubtaskStatus(group, checkboxId);
}

export const init = function () {
  navView.render(state);
  projectView.render(model.getSelectedProject());
  navView.handleNewSelectedProject(controlSelectedProject);
  addNewView.addNewViewHandler('area', controlAddNewArea);
  addNewView.addNewViewHandler('project', controlAddNewProject);
  navView.handleNewSelectedArea(controlSelectedArea);
  navView.handleDraggable(controlDragProject);
  projectView.handleEdit(controlEditData);
  projectView.handleAddNewSubtask(controlCreateNewSubtask);
  projectView.handleCreateNewGroup(controlCreateNewGroup);
  projectView.handleCheckboxChange(controlCheckboxChange);
};
