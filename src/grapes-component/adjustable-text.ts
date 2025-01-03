import { Editor } from "grapesjs";

export const AdjustableText = (editor: Editor) => {
  editor.DomComponents.addType("adjustable-text-component", {
    isComponent(el) {
      return el.classList?.contains('adjustable-text-component');
    },
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          class: "adjustable-text-component",
        },
        components: [
          {
            tagName: "span",
            attributes: {
              class: "adjustable-text-component",
            },
            content: "Adjustable Text",
          },
        ],
        traits: [
          {
            type: "text",
            label: "Text",
            name: "content",
            changeProp: true,
            text: "Adjustable Text",
          },
        ],
      },
    },

    view: {
        events: {
            click: 'onClick',
        },
        onClick(ev) {
            const el = this.el;
            console.log("Adjustable Text clicked", el);
            el.style.backgroundColor = 'red';
        },
        onRender() {
            const el = this.el;
            console.log("Adjustable Text rendered", el);
            el.style.backgroundColor = 'blue';
        },
    },
  });
};