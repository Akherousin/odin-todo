export const state = {
  areas: [
    {
      title: 'Family',
      projectList: [
        {
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
      ],
    },
    {
      title: 'Work',
      projectList: [
        {
          heading: 'Prepare a presentation',
          description: `I'm gonna work till i die`,
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
      ],
    },
  ],
};
