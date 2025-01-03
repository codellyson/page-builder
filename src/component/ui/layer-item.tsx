import { useEditor } from "@grapesjs/react";
import { Component } from "grapesjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { cx, MAIN_BORDER_COLOR } from "../../helper";
import { Box } from "@mantine/core";
import { Icon } from "./right-bar";
import { IconChevronDown, IconChevronUp, IconEye, IconEyeOff } from "@tabler/icons-react";

 

export declare interface LayerItemProps
  extends React.HTMLProps<HTMLDivElement> {
  component: Component;
  level: number;
  draggingCmp?: Component;
  dragParent?: Component;
}

const itemStyle = { maxWidth: `100%` };

export   function LayerItem({
  component,
  draggingCmp,
  dragParent,
  ...props
}: LayerItemProps) {
  const editor = useEditor();
  const { Layers } = editor;
  const layerRef = useRef<HTMLDivElement>(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;
  const componentsIds = components.map((cmp) => cmp.getId());
  const isDragging = draggingCmp === component;
  const cmpHash = componentsIds.join('-');
  const level = props.level + 1;
  const isHovered = hovered || dragParent === component;

  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component));
    if (layerRef.current) {
      (layerRef.current as any).__cmp = component;
    }
  }, [component]);

  useEffect(() => {
    const up = (cmp: Component) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp));
    };
    const ev = Layers.events.component;
    editor.on(ev, up);

    return () => {
      editor.off(ev, up);
    };
  }, [editor, Layers, component]);

  const cmpToRender = useMemo(() => {
    return components.map((cmp) => (
      <LayerItem
        key={cmp.getId()}
        component={cmp}
        level={level}
        draggingCmp={draggingCmp}
        dragParent={dragParent}
      />
    ));
  }, [cmpHash, draggingCmp, dragParent]);

  const toggleOpen = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !visible });
  };

  const select = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const hover = (hovered: boolean) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered });
    }
  };

  const wrapperCls = cx(
    'layer-item flex flex-col',
    selected && 'bg-slate-500 text-white',
    (!visible || isDragging) && 'opacity-50'
  );

  return (
    <Box className={wrapperCls}>
      <Box
        onClick={(e: React.MouseEvent<HTMLDivElement>) => select(e)}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        className="group max-w-full"
        data-layer-item
        ref={layerRef}
      >
        <Box
          className={cx(
            'flex items-center p-1 pr-2 border-b gap-1',
            level === 0 && 'border-t',
            MAIN_BORDER_COLOR,
            isHovered && 'bg-slate-700 text-white',
            selected && 'bg-slate-500 text-white'
          )}
        >
          <Box
            style={{ marginLeft: `${level * 10}px` }}
            className={cx(
              'cursor-pointer',
              !components.length && 'pointer-events-none opacity-0'
            )}
            onClick={(ev: React.MouseEvent<HTMLDivElement>) => toggleOpen(ev)}
          >
            <Icon Label={
                open ? IconChevronUp : IconChevronDown
            } Size={0.7} />
          </Box>
          <Box className="truncate flex-grow" style={itemStyle}>
            {name}
          </Box>
          <Box
            className={cx(
              'group-hover:opacity-100 cursor-pointer',
              visible ? 'opacity-0' : 'opacity-100'
            )}
            onClick={(ev: React.MouseEvent<HTMLDivElement>) => toggleVisibility(ev)}
          >
            <Icon Label={
                visible ? IconEye : IconEyeOff
                 } Size={0.7} />
          </Box>
        </Box>
      </Box>
      {!!(open && components.length) && (
        <div className={cx('max-w-full', !open && 'hidden')}>{cmpToRender}</div>
      )}
    </Box>
  );
}
