export interface NotesData {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        text: string;
      };
    };
  };
}
