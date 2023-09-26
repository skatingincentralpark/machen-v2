"use client";
import { default as LexicalEditorComponent } from "@/components/Editor";

import LexicalComposer from "@/components/Editor/LexicalComposer";

export interface NoteEditorProps {
  editorStateString: string | undefined;
}

const NoteViewer = (props: NoteEditorProps) => {
  return (
    <LexicalComposer readOnly>
      <WrappedComponents {...props} />
    </LexicalComposer>
  );
};

const WrappedComponents = ({ editorStateString }: NoteEditorProps) => {
  return (
    <>
      <LexicalEditorComponent editorStateString={editorStateString} readOnly />
    </>
  );
};

export default NoteViewer;
