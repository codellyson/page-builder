import { useEditor } from '@grapesjs/react';
import { Component } from 'grapesjs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cx, MAIN_BORDER_COLOR } from '../../helper';
import { Box } from '@mantine/core';
import { Icon } from './right-bar';
import { IconChevronDown, IconChevronUp, IconEye, IconEyeOff } from '@tabler/icons-react';

declare interface LayerItemProps extends React.HTMLProps<HTMLDivElement> {
    component: Component;
    level: number;
    draggingComponent?: Component;
    dragParent?: Component;
}

const itemStyle = {
    maxWidth: '100%'
}

export const LayerItem: React.FC<LayerItemProps> = (props) => {
    const editor = useEditor();
    const {
        component, draggingComponent, dragParent,
    } = props
    const { Layers } = editor;
    const layerRef = useRef<HTMLDivElement>(null);
    type LayerData = ReturnType<typeof Layers.getLayerData>;
    const [layerData, setLayerData] = useState<LayerData>(Layers.getLayerData(component));
    const { open, selected, hovered, components, visible, name } = layerData;

    const componentIds = components.map(c => c.getId());
    const isDragging = component === draggingComponent;
    const componentHash = componentIds.join('-');
    const level = props.level + 1;
    const isHovered = hovered || dragParent === component;

    useEffect(() => {
        level === 0 && setLayerData(Layers.getLayerData(component));
        if (layerRef.current) {
            (layerRef.current as any).__cmp = component;
        }
    }, [component]);


    useEffect(() => {
        const up = (component: Component) => {
            component === component && setLayerData(Layers.getLayerData(component));
        }

        const ev = Layers.events.component;
        editor.on(ev, up);
        return () => { editor.off(ev, up) };
    }, [component, editor, Layers])


    const componentToRender = useMemo(() => {
        return components.map((c) => {
            return <LayerItem key={c.getId()} component={c} level={level} draggingComponent={draggingComponent} dragParent={dragParent} />
        })
    }, [componentHash, draggingComponent, dragParent]) as React.ReactNode[]

    const toggleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        Layers.setLayerData(component, { open: !open });
    }

    const toggleVisibility = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        Layers.setLayerData(component, { visible: !visible });
    }

    const select = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        Layers.setLayerData(component, { selected: true }, {
            event: e
        });
    }


    const hover = (hovered: boolean) => {
        if (!hovered || !draggingComponent) {
            Layers.setLayerData(component, { hovered });
        }
    }


    const wrapperClass = cx('layer-item flex flex-col',
        selected && 'bg-sky-900',
        (!visible || isDragging) && 'opacity-50'
    )

    return (

        <Box className={wrapperClass}>
            <Box

                onClick={select}
                onMouseEnter={() => hover(true)}
                onMouseLeave={() => hover(false)}
                className='group max-w-full'
                data-layer-item
                ref={layerRef}
            >
                <Box
                    className={cx('flex items-center p-1 pr-2 border-b gap-1',
                        level === 0 && 'border-t',
                        MAIN_BORDER_COLOR,
                        isHovered && 'bg-sky-700',
                        selected && 'bg-sky-500')}
                >
                    <Box
                        style={{ marginLeft: `${level * 10}px` }}
                        className={cx(
                            'cursor-pointer',
                            !components.length && 'pointer-events-none opacity-0'
                        )}
                        onClick={toggleOpen}
                    >
                        {!open ? <Icon Label={IconChevronDown} Size={0.7} /> : <Icon Label={IconChevronUp} Size={0.7} />}
                    </Box>
                    <Box className="truncate flex-grow" style={itemStyle}>
                        {name}
                    </Box>
                        <Box
                        className={cx(
                            'group-hover:opacity-100 cursor-pointer',
                            visible ? 'opacity-0' : 'opacity-100'
                        )}
                        onClick={toggleVisibility}
                    >
                        <Icon
                            Label={visible ? IconEye : IconEyeOff}
                            Size={0.7}
                        />
                    </Box>
                </Box>
            </Box>
            {!!(open && components.length) &&  <Box className={cx('max-w-full', !open && 'hidden')}>{componentToRender}</Box>}
        </Box>
    )
}