import grapesjs, { Editor, EditorConfig } from "grapesjs";
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from "@grapesjs/react";
import "grapesjs/dist/css/grapes.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useMemo } from "react";
import { AppShell } from "@mantine/core";
import { Top } from "../ui/top";
import { RightBar } from "../ui/right-bar";

export const Grapejs = () => {
  const onEditor = (editor: Editor) => {
     editor.setComponents([
      {
        type: "text",
        content: "Hello World!",
      },
    ]);
  };
 

  const canvasConfig: EditorConfig["canvas"] = {
    scripts: ["https://vjs.zencdn.net/7.19.2/video.min.js"],
  };

  const editorOptions: EditorConfig = useMemo(() => {
    return {
      height: "100vh",
      storageManager: false,
    
      blockManager: {
        blocks: [],
      },
      canvas: canvasConfig,
    };
  }, []);

  return (
    <GjsEditor
      className={`gjs-custom-editor  `}
      grapesjs={grapesjs}
      options={editorOptions}
      plugins={[
        {
          id: "gjs-blocks-basic",
          src: "https://unpkg.com/grapesjs-blocks-basic",
        },
      ]}
      onEditor={onEditor}
    >
      <AppShell aside={{ width: 400, breakpoint: "sm" }}>
        <AppShell.Header>
          <Top  />
        </AppShell.Header>
        <AppShell.Main>
          <Canvas className="flex-grow gjs-custom-editor-canvas" />
        </AppShell.Main>
        <AppShell.Aside>
          <RightBar />
        </AppShell.Aside>
      </AppShell>
    </GjsEditor>
  );
};

 