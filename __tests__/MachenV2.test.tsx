import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import { NotesController } from "@/context/NotesContext";
import { DUMMY_NOTES_DATA } from "@/lib/data";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";
import { DateController } from "@/context/DateContext";

beforeEach(() => window.localStorage.clear());

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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

const setAndAssertDummyData = async () => {
  // Need to mock fetch as it is not available in Node.js where Jest tests run.
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => Promise.resolve(DUMMY_NOTES_DATA),
  } as Response);

  const headerMenuButton = screen.getByTestId("header-menu-button");
  await userEvent.click(headerMenuButton); // userEvent needs to be awaited
  const headerMenu = screen.getByRole("dialog"); // assert that the dialog is open
  expect(headerMenu).toBeInTheDocument();

  // Assert that localStorage doesn't contain machen data
  const setDummyNotesButton = screen.getByTestId("set-dummy-notes");
  const localStorageData = localStorage.getItem("machen-data");
  expect(localStorageData).toBeNull();

  // Assert that localStorage is set
  await userEvent.click(setDummyNotesButton);
  expect(headerMenu).not.toBeInTheDocument();
  const localStorageDataNew = localStorage.getItem("machen-data");
  expect(localStorageDataNew).not.toBeNull();
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
    await setAndAssertDummyData();

    // Assert that the note cells with notes are updated
    const dayCells = screen.getAllByRole("gridcell", {
      description: /has-note/i,
    });
    expect(dayCells).toHaveLength(9);
  });

  test("editor buttons change when note exists", async () => {
    renderWithProviders();
    await setAndAssertDummyData();

    // Click first cell with note
    const dayCellsWithNote = screen.getAllByRole("gridcell", {
      description: /has-note/i,
    });
    if (!dayCellsWithNote[0]) throw new Error("Day cell not found");
    await userEvent.click(dayCellsWithNote[0]);
    screen.getByRole("dialog");

    // Assert that editor buttons are correct
    screen.getByRole("button", {
      name: /save note/i,
    });
    screen.getByRole("button", {
      name: /close editor/i,
    });
    const deleteButton = screen.getByRole("button", {
      name: /delete note/i,
    });

    await userEvent.click(deleteButton);
    await userEvent.click(dayCellsWithNote[0]);

    // Assert that editor buttons are correct when there's no note
    const createButton = screen.getByRole("button", {
      name: /create note/i,
    });
    expect(createButton).toBeInTheDocument();
  });

  test("Able to change month and year", async () => {
    renderWithProviders();

    // Assert that month buttons exist
    const monthButtons = screen.getAllByRole("button", {
      description: /select a month/i,
    });
    expect(monthButtons).toHaveLength(12);

    // Assert can change month
    const januaryButton = monthButtons[0];
    if (!januaryButton) throw new Error("January button not found");
    await userEvent.click(januaryButton);
    expect(januaryButton.classList.contains("active")).toBe(true);

    const februaryButton = monthButtons[1];
    if (!februaryButton) throw new Error("January button not found");
    await userEvent.click(februaryButton);
    expect(februaryButton.classList.contains("active")).toBe(true);

    // Assert that year button exists
    const yearTrigger = screen.getByRole("button", {
      description: /select a year/i,
    });
    expect(yearTrigger).toBeInTheDocument();

    // Assert can change year
    await userEvent.click(yearTrigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const yearButtons = screen.getAllByRole("button", {
      name: /select \d{4}/i,
    });
    expect(yearButtons).toHaveLength(7);
    if (!yearButtons[0] || !yearButtons[1])
      throw new Error("First two year buttons not found");
    await userEvent.click(yearButtons[0]);
    expect(yearButtons[0].classList.contains("active")).toBe(true);
    await userEvent.click(yearButtons[1]);
    expect(yearButtons[1].classList.contains("active")).toBe(true);
  });
});
