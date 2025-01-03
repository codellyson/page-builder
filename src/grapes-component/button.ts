import { Editor } from "grapesjs";

export const Button = (editor: Editor) => {
  editor.DomComponents.addType("button-component", {
    isComponent(el) {
      return el.tagName === "BUTTON";
    },
    model: {
      defaults: {
        tagName: "button",
        id: "custom-button",
        attributes: {
          class: "bg-blue-500 text-white px-4 py-2 rounded-md",
          ['data-button-text']: "Button",
        },
        traits: [
          {
            type: "text",
            label: "Text",
            name: "content",
            changeProp: true,
            text: "Button",
          },
        ],
      },
    },
    view: {
      events: () => {
        return {
          click: 'onEdit',
        };
      },
      init(opts) {
        console.log("Button initialized", opts);
      },
      onEdit() {
        console.log("Button clicked");
      },
      onRender({el}) {
        console.log("Button rendered", el);
       
        const model= this.model;
        const buttonText = model.getAttributes()['data-button-text'];
        console.log("Button text", buttonText);
        el.textContent = buttonText;
      },
    },
  });
};
