export const styleTokens = {
  ["font"]: {
    ["primary"]: "Helvetica Neue, system-ui, Helvetica, Arial, sans-serif",
    ["secondary"]: "Helvetica Neue, system-ui, Helvetica, Arial, sans-serif",
    ["tertiary"]: "Courier New, Courier, monospace",
  },
  ["media"]: {
    ["xs"]: "@media (min-width: 350px)",
    ["sm"]: "@media (min-width: 520px)",
    ["md"]: "@media (min-width: 740px)",
    ["lg"]: "@media (min-width: 960px)",
    ["xl"]: "@media (min-width: 1180px)",
    ["2xl"]: "@media (min-width: 1400px)",
    ["3xl"]: "@media (min-width: 1620px)",
  },
  ["size"]: {
    ["xs"]: "0.75rem", // 12px
    ["sm"]: "0.875rem", // 14px
    ["base"]: "1rem", // 16px
    ["lg"]: "1.125rem", // 18px
    ["xl"]: "1.25rem", // 20px
    ["2xl"]: "1.5rem", // 24px
    ["3xl"]: "1.875rem", // 30px
  },
  ["lineHeight"]: {
    ["xs"]: "1rem", // 16px
    ["sm"]: "1.25rem", // 20px
    ["base"]: "1.5rem", // 24px
    ["lg"]: "1.75rem", // 28px
    ["xl"]: "1.75rem", // 28px
    ["2xl"]: "2rem", // 32px
    ["3xl"]: "2.25rem", // 36px
  },
  ["color"]: {
    ["slate"]: {
      ["100"]: "#dde3e4",
      ["200"]: "#c6cbd0",
      ["300"]: "#989ca2",
    },
    ["gray"]: {
      ["100"]: "#f8f8f9",
      ["200"]: "#f1f1f1",
      ["300"]: "#dcdcdc",
      ["400"]: "#3e3e3e",
    },
    ["orange"]: "#ef3d23",
    ["blue"]: "#3f85c6",
  },
  ["space"]: {
    ["0"]: "0", // 0px
    ["0.5"]: "0.125rem", // 2px
    ["1"]: "0.25rem", // 4px
    ["1.5"]: "0.375rem", // 6px
    ["2"]: "0.5rem", // 8px
    ["2.5"]: "0.625rem", // 10px
    ["3"]: "0.75rem", // 12px
    ["3.5"]: "0.875rem", // 14px
    ["4"]: "1rem", // 16px
    ["5"]: "1.25rem", // 20px
    ["6"]: "1.5rem", // 24px
    ["7"]: "1.75rem", // 28px
    ["8"]: "2rem", // 32px
    ["9"]: "2.25rem", // 36px
    ["10"]: "2.5rem", // 40px
    ["11"]: "2.75rem", // 44px
    ["12"]: "3rem", // 48px
    ["14"]: "3.5rem", // 56px
    ["16"]: "4rem", // 64px
    ["20"]: "5rem", // 80px
    ["24"]: "6rem", // 96px
    ["28"]: "7rem", // 112px
    ["32"]: "8rem", // 128px
    ["36"]: "9rem", // 144px
    ["40"]: "10rem", // 160px
    ["44"]: "11rem", // 176px
    ["48"]: "12rem", // 192px
    ["52"]: "13rem", // 208px
    ["56"]: "14rem", // 224px
    ["60"]: "15rem", // 240px
    ["64"]: "16rem", // 256px
    ["72"]: "18rem", // 288px
    ["80"]: "20rem", // 320px
    ["96"]: "24rem", // 384px
  },
  ["gradient"]: {
    ["white-to-gray"]:
      "linear-gradient(0deg, rgba(244, 244, 244, 1) 0%, rgba(255, 255, 255, 1) 35%)",
  },
} as const;
