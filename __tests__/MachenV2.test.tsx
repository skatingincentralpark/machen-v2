import { render, screen, waitFor } from "@testing-library/react";
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
    json: async () => Promise.resolve(NOTES_DATA),
  } as Response);

  await userEvent.click(screen.getByTestId("header-menu-button")); // userEvent needs to be awaited
  expect(screen.getByRole("dialog")).toBeInTheDocument();

  // Assert that localStorage doesn't contain machen data
  expect(localStorage.getItem("machen-data")).toBeNull();

  // Assert that localStorage is set
  await userEvent.click(screen.getByTestId("set-dummy-notes"));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(localStorage.getItem("machen-data")).not.toBeNull();
};

describe("MachenV2", () => {
  test("renders and falls back properly with bad data", async () => {
    localStorage.setItem("machen-data", JSON.stringify({ bad: "data" }));
    renderWithProviders();
    expect(localStorage.getItem("machen-data")).toBeNull();
    expect(screen.getByLabelText("Calendar")).toBeVisible();
  });

  test("renders correctly when setting dummy data", async () => {
    renderWithProviders();
    await setAndAssertDummyData();

    // Assert that the note cells with notes are updated
    expect(
      screen.getAllByRole("gridcell", {
        description: /has-note/i,
      })
    ).toHaveLength(6);
  });

  test("Able to change month and year", async () => {
    renderWithProviders();

    // Assert that month buttons exist
    expect(
      screen.getAllByRole("button", {
        description: /select a month/i,
      })
    ).toHaveLength(12);

    // Assert can change month
    const januaryButton = screen.getByRole("button", {
      name: /select january/i,
    });
    await userEvent.click(januaryButton);
    expect(januaryButton.classList.contains("active")).toBe(true);

    const februaryButton = screen.getByRole("button", {
      name: /select february/i,
    });
    await userEvent.click(februaryButton);
    expect(februaryButton.classList.contains("active")).toBe(true);

    // Assert can change year
    await userEvent.click(
      screen.getByRole("button", {
        description: /select a year/i,
      })
    );
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

  test("editor buttons change when note exists", async () => {
    renderWithProviders();
    await setAndAssertDummyData();

    // Select November, 2023
    await userEvent.click(
      screen.getByRole("button", {
        name: /select november/i,
      })
    );

    await userEvent.click(
      screen.getByRole("button", {
        description: /select a year/i,
      })
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /select 2023/i,
      })
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /close/i,
      })
    );

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );

    // Click first cell with note
    const dayCellsWithNote = screen.getAllByRole("gridcell", {
      description: /has-note/i,
    });

    expect(dayCellsWithNote).toHaveLength(6);
    if (!dayCellsWithNote[0])
      throw new Error("First day cell with note not found");

    await userEvent.click(dayCellsWithNote[0]);

    // toBeInTheDocument is not necessary, but some people think it helps communicate intention more clearly.
    // https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Assert that editor buttons are correct
    expect(
      screen.getByRole("button", {
        name: /save note/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /close editor/i,
      })
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", {
        name: /delete note/i,
      })
    );
    // toBeInTheDocument simply finds element is in DOM Tree regardless of visibility
    // toBeVisible checks for multiple attributes to see if it's visible such as
    //    - display not equal to none
    //    - opacity greater than 0
    //    - hidden attribute does not exist
    //    - visibility not equal to hidden or collapse
    //    - checks for element, if it's document and parent is visible
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );

    expect(
      screen.getAllByRole("gridcell", {
        description: /has-note/i,
      })
    ).toHaveLength(5);

    await userEvent.click(dayCellsWithNote[0]);

    // Assert that editor buttons are correct when there's no note
    expect(
      screen.getByRole("button", {
        name: /create note/i,
      })
    ).toBeInTheDocument();
  });
});

// To-Do: loop through a few calendar months and years and ensure date cells are sequential
//        and are showing correct dates
