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

const existingHtml = `<section id="services" data-gjs-type="services" class="px-4 py-16 bg-white lg:py-32 gjs-block-section">
      <div class="flex flex-col items-center justify-center mx-auto max-w-[1200px]">
        <img src="./assets/icons/tools.png" alt="" class="mb-4">
        <h1 class="capitalize text-dark text-[24px] lg:text-[40px] font-medium font-inter">
          services
        </h1>
      </div>
      <div class="mt-10 space-y-10">
        <div class="h-[350px] lg:h-[530px] w-full px-4 py-8 md:px-8 md:py-16 lg:px-36 lg:py-24 flex flex-col justify-end gap-4" style="
            background-image: url('https://images.unsplash.com/photo-1719937050446-a121748d4ba0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            background-repeat: no-repeat;
            background-size: cover;
          ">
          <h1 class="text-white capitalize font-inter text-[24px] lg:text-[32px] leading-[26px] lg:leading-[34px] font-medium">
            site documentation and record keeping
          </h1>
          <p class="md:w-[600px] text-white font-inter">
            Maintains accurate and up-to-date records for transparency,
            regulatory compliance, and client reference.
          </p>
        </div>
        <div class="h-[350px] lg:h-[530px] w-full px-4 py-8 md:px-8 md:py-16 lg:px-36 lg:py-24 flex flex-col justify-end gap-4" style="
            background-image: url('https://images.unsplash.com/photo-1719937050446-a121748d4ba0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            background-repeat: no-repeat;
            background-size: cover;
          ">
          <h1 class="text-white capitalize font-inter text-[24px] lg:text-[32px] leading-[26px] lg:leading-[34px] font-medium">
            project closeout and final inspection
          </h1>
          <p class="md:w-[600px] text-white font-inter">
            Manages the project closeout process, including final inspections
            and handover documentation.
          </p>
        </div>
        <div class="h-[350px] lg:h-[530px] w-full px-4 py-8 md:px-8 md:py-16 lg:px-36 lg:py-24 flex flex-col justify-end gap-4 hover:bg-slate-800" style="
            background-image: url('https://images.unsplash.com/photo-1719937050446-a121748d4ba0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            background-repeat: no-repeat;
            background-size: cover;
          ">
          <h1 class="text-white capitalize font-inter text-[24px] lg:text-[32px] leading-[26px] lg:leading-[34px] font-medium">
            post-construction maintenance planning
          </h1>
          <p class="md:w-[600px] text-white font-inter">
            Provides post-construction maintenance plans to ensure the longevity
            and quality of completed projects.
          </p>
        </div>
      </div>
    </section>`

export const Grapejs = () => {
  const onEditor = (editor: Editor) => {
     editor.setComponents(existingHtml)
  };
 

  const canvasConfig: EditorConfig["canvas"] = {
    scripts: ["https://vjs.zencdn.net/7.19.2/video.min.js", 'https://cdn.tailwindcss.com'],
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

 