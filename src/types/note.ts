export interface NotesData {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        title: string;
        content: string;
      };
    };
  };
}
