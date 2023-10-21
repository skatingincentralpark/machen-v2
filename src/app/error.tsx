"use client";
import styled from "@emotion/styled";
import { media } from "@/lib/media-queries";
import { Button } from "@/components/Old/UI/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const deleteAllNotes = () => {
    localStorage.removeItem("machen-data");
    reset();
  };
  return (
    <Main>
      <Wrapper>
        <h2>Something unexpected went wrong...</h2>
        <p>
          If this happens again, please click delete all notes to clear local
          storage.
        </p>
        <ErrorText>Error: {error.message}</ErrorText>
        <br />
        <ButtonWrapper>
          <Button onClick={reset}>Try again</Button>
          <Button onClick={deleteAllNotes} variant="destructive">
            Delete all notes
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1rem;

  ${media.sm} {
    padding: 2rem;
  }
`;
const Wrapper = styled.div`
  background-color: var(--subtle-off-white-coloring);
  outline: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  overflow-wrap: break-word;
`;
const ErrorText = styled.p`
  font-size: 0.9rem;
  color: red;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;

  & > button {
    flex-grow: 1;
  }
`;
