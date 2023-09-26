import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import defaultTheme from "../themes/default";

function onError(error: Error) {
  console.error(error);
}

const useLexicalComposer = () => {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
    theme: defaultTheme,
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
  };

  return function LexicalComposerComponent({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <LexicalComposer initialConfig={initialConfig}>
        <>{children}</>
      </LexicalComposer>
    );
  };
};

export default useLexicalComposer;
