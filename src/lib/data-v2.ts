// ⚠️ To-do: remvoe eslint disable comments

import { type NotesDataV2 } from "@/types/note";

export const NOTES_DATA_V2: NotesDataV2 = {
  2023: {
    9: {
      1: {
        title: `45RPM`,
        content: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore exercitationem possimus.  suscipit iusto totam repellendus sint non? Earum architecto cupiditate, ex magni veritatis, perspiciatis iusto aperiam, esse consectetur voluptatum repellendus?
        `,
      },
      10: {
        title: `45RPM`,
        content: `
        Eaque quam dolorem veritatis eum quod atque dolore voluptatibus deserunt.
        Ex laborum asperiores possimus consequatur quas nulla pariatur, corporis
        placeat est accusantium numquam natus. 
        
        Incidunt itaque ipsa quia totam.  Velit. Veritatis exercitationem architecto cum fugit odio quisquam omnis
        debitis officia. Rem nemo distinctio, labore sequi atque culpa magnam vel
        quia debitis quo, ut, cum id quod perspiciatis dolore minima optio.
        `,
      },
      14: {
        title: `45RPM`,
        content: `
        Dolorum laudantium cumque saepe at eligendi perferendis, mollitia minus
        quis natus vero possimus.
        
        Aperiam amet atque architecto odit non? Amet animi aliquid ut, fuga recusandae repellendus illum ex? Incidunt, nobis.
        Culpa sapiente ipsa voluptates
        `,
      },
    },
  },
};

/** Will also return true if empty object */
export const assertIsNotes = (value: unknown): value is NotesDataV2 => {
  if (typeof value !== "object" || value === null) return false;

  function isNumeric(str: string) {
    if (typeof str !== "string") return false;
    return !isNaN(+str) && !isNaN(parseFloat(str));
  }

  if (
    !Object.entries(value).every(([year, yearValue]) => {
      if (
        !isNumeric(year) ||
        typeof yearValue !== "object" ||
        yearValue === null
      ) {
        return false;
      }

      /* eslint-disable */
      return Object.entries(yearValue).every(([month, monthValue]) => {
        if (
          !isNumeric(month) ||
          typeof monthValue !== "object" ||
          monthValue === null
        ) {
          return false;
        }

        return Object.entries(monthValue).every(([day, dayValue]) => {
          if (
            !isNumeric(day) ||
            typeof dayValue !== "object" ||
            dayValue === null
          ) {
            return false;
          }

          /* eslint-disable */
          if (typeof dayValue.text !== "string") {
            return false;
          }

          return true;
        });
      });
    })
  ) {
    return false;
  }

  return true;
};
