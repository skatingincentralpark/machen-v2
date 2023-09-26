const NOTE_TEXT = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hey there","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;

export interface NotesData {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        text: string;
      };
    };
  };
}

const NOTES_DATA: NotesData = {
  2023: {
    9: {
      10: {
        text: NOTE_TEXT,
      },
      14: {
        text: NOTE_TEXT,
      },
    },

    10: {
      31: {
        text: NOTE_TEXT,
      },
    },
  },
};

export const JSON_NOTES_DATA = JSON.stringify(NOTES_DATA);
