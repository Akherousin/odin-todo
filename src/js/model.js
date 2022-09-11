function* generateId() {
  let id = 1;
  while (true) {
    yield id;
    id++;
  }
}

const generatorObject = generateId();

export const state = {
  selectedProjectId: 1,

  getSelectedProject() {
    return this.projectList.find(
      (project) => project.id === this.selectedProjectId
    );
  },

  setSelectedProject(newId) {
    this.selectedProjectId = +newId;
  },

  areas: ['Family', 'Work'],

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
