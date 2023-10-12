import {
  getAllByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import { NotesController } from "@/context/NotesContext";
import { NOTES_DATA } from "@/lib/data";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";
import { DateController } from "@/context/DateContext";

beforeEach(() => window.localStorage.clear());

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const renderWithProviders = () => {
  return render(
    <DateController>
      <NotesController>
        <Header />
        <Home />
      </NotesController>
    </DateController>
  );
};

describe("MachenV2", () => {
  test("it should render the main page", async () => {
    renderWithProviders();
    const calendarElement = await screen.findByLabelText("Calendar");
    expect(calendarElement).toBeInTheDocument();
  });

  test("renders and falls back properly with bad data", async () => {
    localStorage.setItem("machen-data", JSON.stringify({ bad: "data" }));

    renderWithProviders();

    const calendarElement = await screen.findByLabelText("Calendar");
    const data = localStorage.getItem("machen-data");

    expect(data).toBeNull();
    expect(calendarElement).toBeInTheDocument();
  });

  test("renders correctly when setting dummy data", async () => {
    renderWithProviders();

    const headerMenuButton = screen.getByTestId("header-menu-button");
    await userEvent.click(headerMenuButton); // userEvent needs to be awaited
    screen.getByRole("dialog"); // assert that the dialog is open

    const setDummyNotesButton = screen.getByTestId("set-dummy-notes");
    const localStorageData = localStorage.getItem("machen-data");
    expect(localStorageData).toBeNull();

    // Need to mock fetch as it is not available in Node.js where Jest tests run.
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => Promise.resolve(NOTES_DATA),
    } as Response);

    await userEvent.click(setDummyNotesButton);
    const localStorageDataNew = localStorage.getItem("machen-data");
    expect(localStorageDataNew).not.toBeNull();
  });

  test("able to use editor", async () => {
    renderWithProviders();

    const dayCells = screen.getAllByTestId("day-cell");
    expect(dayCells).toHaveLength(42);
    if (!dayCells[0]) throw new Error("dayCells[0] is null");
    await userEvent.click(dayCells[0]);

    // see if i can assert that the loading component is rendered
    // ⚠️ To-do: figure out how to test dynamic imports

    const editor = screen.getByRole("textbox");
    userEvent.type(editor, "Hello World");
  });
});
