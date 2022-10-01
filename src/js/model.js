function* generateId() {
  let id = 1;
  while (true) {
    yield id;
    id++;
  }
}

const generatorObject = generateId();

function projectMaker(heading = '', description = '', area = '') {
  return {
    area,
    id: generatorObject.next().value,
    heading,
    description,
  };
}

export const state = {
  selectedArea: null,
  selectedProjectId: 1,

  // the empty string makes the unsorted 'default' area
  areas: ['Family', 'Work', ''],

  projectList: [
    {
      area: 'Family',
      id: generatorObject.next().value,
      heading: 'Vacation in Rome',
      description: `We'll go from June 14-22 and stop through London on the way back to visit Jane and Paolo. Monti looks like a great place to stay. Maybe do a night out in Trastevere.`,
      subtasks: [
        {
          heading: 'Planning',
          list: [
            { subtask: 'Book flights', completed: true },
            { subtask: 'Read about the metro', completed: false },
            { subtask: "Borrow Sarah's travel guide", completed: false },
            { subtask: 'Book a hotel room', completed: false },
          ],
        },
      ],
    },

    {
      area: 'Work',
      id: generatorObject.next().value,
      heading: 'Prepare presentation',
      description: `Work till death`,
      subtasks: [
        {
          heading: 'Planning',
          list: [
            { subtask: 'Book flights', completed: false },
            { subtask: 'Read about the metro', completed: false },
            { subtask: "Borrow Sarah's travel guide", completed: false },
            { subtask: 'Book a hotel room', completed: false },
          ],
        },
      ],
    },
  ],
};

export const setSelectedProject = function (newId) {
  state.selectedProjectId = +newId;
};

export const getSelectedProject = function () {
  return state.projectList.find(
    (project) => project.id === state.selectedProjectId
  );
};

export const addNewArea = function (area) {
  state.areas = [...state.areas.slice(0, -1), area, ''];
};

export const changeSelectedArea = function (area) {
  if (!state.areas.includes(area)) return;
  state.selectedArea = area;
};

export const addNewProject = function (heading, description, area) {
  state.projectList.push(projectMaker(heading, description, area));
  console.log(state.projectList);
};

export const changeProjectArea = function (project, area) {
  const projectToChange = state.projectList.find(
    (proj) => proj.id === Number(project.dataset.id)
  );
  projectToChange.area = area;
};

export const changeProjectData = function (data, newData) {
  const project = getSelectedProject();
  project[data] = newData;
  console.log(state.projectList);
};

export const addNewSubtasksGroup = function (newGroupName) {
  const project = getSelectedProject();
  const newGroup = {
    heading: newGroupName,
    list: [],
  };

  project.subtasks.push(newGroup);
  console.log(state);
};
