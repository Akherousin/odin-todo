import * as model from './model';
import addNewView from './view/AddNewView';
import navView from './view/NavView';
import projectView from './view/ProjectView';
import groupView from './view/GroupView';

const state = model.state;

function controlSelectedProject(newId) {
  // 1) Change selected project
  model.setSelectedProject(newId);

  // 2) Render Project View
  projectView.render(model.getSelectedProject());

  // 3) Handle text editing of heading and description of the project
  projectView.handleEdit(controlEditData);

  // 4) Render groups of subtasks
  groupView.render(model.getCurrentSubtasks());

  // 5) Add new group of subtasks
  groupView.handleCreateNewGroup(controlCreateNewGroup);

  // 6) Create a new subtask in a group
  groupView.handleAddNewSubtask(controlCreateNewSubtask);

  // 7) Control checkbox changes
  groupView.handleCheckboxChange(controlCheckboxChange);

  console.log(
    state.projectList.forEach((project) =>
      project.subtasks.forEach((subtask) => console.table(subtask.list))
    )
  );

  // projectView.handleCreateNewGroup(controlCreateNewGroup);
  // projectView.handleAddNewSubtask(controlCreateNewSubtask);
  // projectView.handleCheckboxChange(controlCheckboxChange);
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
  groupView.render(model.getCurrentSubtasks());
  groupView.handleAddNewSubtask(controlCreateNewSubtask);
  groupView.handleCheckboxChange(controlCheckboxChange);

  console.log(
    state.projectList.forEach((project) =>
      project.subtasks.forEach((subtask) => console.table(subtask.list))
    )
  );
}

function controlCreateNewSubtask(tasksGroup, newSubtask, newSubtaskId) {
  model.addNewSubtask(tasksGroup, newSubtask, newSubtaskId);

  groupView.update(tasksGroup, {
    subtask: newSubtask,
    completed: false,
    id: newSubtaskId,
  });
  groupView.handleCheckboxChange(controlCheckboxChange);

  console.log(
    state.projectList.forEach((project) =>
      project.subtasks.forEach((subtask) => console.table(subtask.list))
    )
  );
}

function controlCheckboxChange(group, checkboxId) {
  model.changeSubtaskStatus(group, checkboxId);

  console.log(
    state.projectList.forEach((project) =>
      project.subtasks.forEach((subtask) => console.table(subtask.list))
    )
  );
}

export const init = function () {
  navView.render(state);
  projectView.render(model.getSelectedProject());
  groupView.render(model.getCurrentSubtasks());

  navView.handleNewSelectedProject(controlSelectedProject);
  navView.handleNewSelectedArea(controlSelectedArea);
  navView.handleDraggable(controlDragProject);
  projectView.handleEdit(controlEditData);

  addNewView.addNewViewHandler('area', controlAddNewArea);
  addNewView.addNewViewHandler('project', controlAddNewProject);

  groupView.handleCreateNewGroup(controlCreateNewGroup);
  groupView.handleAddNewSubtask(controlCreateNewSubtask);
  groupView.handleCheckboxChange(controlCheckboxChange);

  // projectView.handleAddNewSubtask(controlCreateNewSubtask);
  // projectView.handleCreateNewGroup(controlCreateNewGroup);
  // projectView.handleCheckboxChange(controlCheckboxChange);
};
