export interface NotesData {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        text: string;
      };
    };
  };
}

export interface NotesDataV2 {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        title: string;
        content: string;
      };
    };
  };
}
