import grapesjs, { Editor } from 'grapesjs';
import GjsEditor from '@grapesjs/react';
import "grapesjs/dist/css/grapes.min.css"
import '@fortawesome/fontawesome-free/css/all.css';

export const Grapejs = () => {
    const onEditor = (editor: Editor) => {
        // Add basic blocks
        editor.BlockManager.add('h1-block', {
            label: 'Heading',
            content: '<h1>Insert your heading here</h1>',
            category: 'Basic',
            media: '<i class="fas fa-heading"></i>'
        });

        editor.BlockManager.add('text-block', {
            label: 'Text',
            content: '<div>Insert your text here</div>',
            category: 'Basic',
            media: '<i class="fas fa-paragraph"></i>'
        });

        editor.BlockManager.add('image-block', {
            label: 'Image',
            content: { type: 'image' },
            category: 'Basic',
            media: '<i class="fas fa-image"></i>'
        });

        editor.BlockManager.add('button-block', {
            label: 'Button',
            content: '<button class="button">Click me</button>',
            category: 'Basic',
            media: '<i class="fas fa-square"></i>'
        });

        editor.BlockManager.add('container-block', {
            label: 'Container',
            content: `<div class="container" style="padding: 20px; min-height: 100px; background-color: #f4f4f4;">
                        <p>Container block</p>
                     </div>`,
            category: 'Layout',
            media: '<i class="fas fa-box"></i>'
        });

        editor.BlockManager.add('grid-block', {
            label: '2 Columns',
            content: `<div class="grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="padding: 20px; background-color: #f4f4f4;">Column 1</div>
                        <div style="padding: 20px; background-color: #f4f4f4;">Column 2</div>
                     </div>`,
            category: 'Layout',
            media: '<i class="fas fa-columns"></i>'
        });
    }

    return (
        <GjsEditor
            grapesjs={grapesjs}
            options={{
                // Editor Configuration
                height: '100vh',
                storageManager: false,
                
                // Configure panels to show blocks
                panels: {
                    defaults: [
                        {
                            id: 'blocks',
                            el: '.panel__right',
                            resizable: {
                                maxDim: 350,
                                minDim: 200,
                            },
                        }
                    ]
                },

                // Configure block manager
                blockManager: {
                    appendTo: '.panel__right',
                },

                // Basic style manager with more options
                styleManager: {
                    appendTo: '.panel__right',
                    sectors: [{
                        name: 'Dimension',
                        properties: [
                            { name: 'width', property: 'width' },
                            { name: 'height', property: 'height' },
                            { name: 'padding', property: 'padding' },
                            { name: 'margin', property: 'margin' },
                            { name: 'display', property: 'display' }
                        ]
                    }, {
                        name: 'Typography',
                        properties: [
                            { name: 'Font Size', property: 'font-size' },
                            { name: 'Font Weight', property: 'font-weight' },
                            { name: 'Text Align', property: 'text-align' },
                            { name: 'Color', property: 'color' },
                            { name: 'Line Height', property: 'line-height' },
                            { name: 'Letter Spacing', property: 'letter-spacing' }
                        ]
                    }, {
                        name: 'Decorations',
                        properties: [
                            { name: 'Background Color', property: 'background-color' },
                            { name: 'Border', property: 'border' },
                            { name: 'Border Radius', property: 'border-radius' },
                            { name: 'Box Shadow', property: 'box-shadow' }
                        ]
                    }, {
                        name: 'Extra',
                        properties: [
                            { name: 'Opacity', property: 'opacity' },
                            { name: 'Transform', property: 'transform' }
                        ]
                    }]
                },

                // Enable undo/redo
                undoManager: true,

                // Default content
                components: `
                    <div style="padding: 20px">
                        <h1 style="color: #374151;">Welcome to Page Builder</h1>
                        <p style="color: #6B7280;">Drag and drop elements from the blocks panel to start building your page!</p>
                    </div>
                `
            }}
            onEditor={onEditor}
        />
    )
}
