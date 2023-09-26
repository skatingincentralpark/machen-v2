import { LexicalComposer as LexComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import defaultTheme from "./themes/default";

function onError(error: Error) {
  console.error(error);
}

const LexicalComposer = ({ children }: { children: React.ReactNode }) => {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
    theme: defaultTheme,
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
  };

  return (
    <LexComposer initialConfig={initialConfig}>
      <>{children}</>
    </LexComposer>
  );
};

export default LexicalComposer;
