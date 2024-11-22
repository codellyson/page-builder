import { Accordion, ActionIcon, Box, Button, Center, ColorPicker, FileInput, Flex, Group, Radio, SegmentedControl, Select, SimpleGrid, Slider, Stack, Text, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { IconAlignBoxCenterStretch, IconBarrierBlock, IconBrush, IconCar, IconGrid3x3, IconLayersDifference, IconLayoutGrid, IconSettings, IconTrashFilled } from "@tabler/icons-react";
import { BlocksProvider, StylesProvider } from "@grapesjs/react";

import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from 'grapesjs';


export const RightBar = () => {
  const Icon = ({ Label }: { Label: React.ElementType }) => {
    return (
      <Center style={{ gap: 10 }}>
        {<Label size={12} />}
      </Center>
    );
  };

  const g_UI_CONTROLS = [
    {
      label: <Icon Label={IconAlignBoxCenterStretch} />,
      value: "1",
    },
    {
      label: <Icon Label={IconBrush} />,
      value: "2",
    },
    {
      label: <Icon Label={IconSettings} />,
      value: "3",
    },
    {
      label: <Icon Label={IconLayersDifference} />,
      value: "4",
    }, {
      label: <Icon Label={IconLayoutGrid} />,
      value: "5",
    }
  ];
  const [selected, setSelected] = useState("1");

  return (
    <Box className="bg-slate-900 border-slate-800 p-2 text-white h-full flex flex-col gap-2">
      <SegmentedControl
        value={selected}
        data={g_UI_CONTROLS}
        onChange={(value) => setSelected(value)}
        fullWidth
        size="sm"
      />
      <Stack className="flex-1">
        {selected === "1" && <Text>AlignBoxCenterStretch</Text>}
        {selected === "2" && <StylesProvider>
          {(props) => <StyleManager {...props} />}
        </StylesProvider>}
        {selected === "3" && <Text>Settings</Text>}
        {selected === "4" && <Text>LayersDifference</Text>}
        {selected === "5" && <BlocksProvider>
          {(props) => <BlocksManager {...props} />}
        </BlocksProvider>}
      </Stack>
    </Box>
  );
};




const StyleManager = ({ sectors }: any) => {
  return <Stack>
    {sectors.map((sector: any) => {
      return <Accordion key={sector.getId()} defaultValue={sector.getName()}>
        <Accordion.Item value={sector.getName()}>
          <Accordion.Control
            styles={{
              control: {
                backgroundColor: "#1e1e1e",
                color: "white",
              }
            }}
          >
            <Text

            >{sector.getName()}</Text>
          </Accordion.Control>
          <Accordion.Panel>
            {console.log(sector.getProperties())}
            {sector.getProperties().map((property: any) => {
              return <StylePropertyField key={property.getId()} prop={property} />
            })}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    })}
  </Stack>
}

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}
const StylePropertyField = ({
  prop,
}: StylePropertyFieldProps) => {
  console.log(JSON.stringify(prop, null, 2));

  const Icon = ({ Label }: { Label: React.ElementType }) => {
    return (
      <Center style={{ gap: 10 }}>
        {<Label size={12} />}
      </Center>
    );
  };
  const handleChange = (value: string) => {
    prop.upValue(value);
  }
  const inputType = prop.getType();
  const value = prop.getValue();
  const canClear = prop.canClear();
  const defaultValue = prop.getDefaultValue();
  const hasValue = prop.hasValue()
  const valueWithDef = hasValue ? value : defaultValue;


  const openAssets = () => {
    console.log("openAssets");
  }

  let inputToRender: React.ReactNode = (<TextInput value={valueWithDef} onChange={(e) => handleChange(e.target.value!)} />)
  switch (inputType) {
    case "select": {
      const selectProp = prop as PropertySelect
      inputToRender = <Select data={
        selectProp.getOptions().map((option: any) => {
          return {
            value: selectProp.getOptionId(option),
            label: selectProp.getOptionLabel(option),
          }
        })
      } value={selectProp.getValue() ?? ""} onChange={(value) => selectProp.setValue(value!)} placeholder={selectProp.getLabel()} label={selectProp.getLabel()} />
    }
      break;
    case 'radio': {
      const radioProp = prop as PropertyRadio;
      inputToRender = <Radio.Group>
        <Group>
          {radioProp.getOptions().map((option: any) => {
            return <Radio
              value={radioProp.getOptionId(option)}
              label={radioProp.getOptionLabel(option)}
            />
          })}
        </Group>
      </Radio.Group>
    }
      break;
    case 'color': {
      inputToRender = <ColorPicker value={valueWithDef} onChange={(value) => handleChange(value!)} />
    }
      break;
    case 'slider': {
      const sliderProp = prop as PropertySlider;
      inputToRender = <Slider value={parseFloat(value)} onChange={(value) => handleChange(value.toString())}
        min={sliderProp.getMin()}
        max={sliderProp.getMax()

        }
        step={sliderProp.getStep()}

      />
    }
      break;
    case 'file': {
      inputToRender = <Button
        onClick={openAssets}
      >Upload</Button>
    }
      break;

    case 'composite': {
      const compositeProp = prop as PropertyComposite;
      inputToRender = <Stack>
        {compositeProp.getProperties().map((option: any) => {
          return <StylePropertyField key={option.getId()} prop={option} />
        })}
      </Stack>
    }
      break;

    case 'stack': {
      const stackProp = prop as PropertyStack;
      const layers = stackProp.getLayers();
      const isTextShadow = stackProp.getName() === 'text-shadow';
      inputToRender = (
        <div

        >
          {layers.map((layer) => (
            <div key={layer.getId()}  >
              <div className="flex gap-1 bg-slate-800 px-2 py-1 items-center">
                <ActionIcon
                  size="small"
                  onClick={() => layer.move(layer.getIndex() - 1)}
                >
                  <Icon Label={IconCar} />
                </ActionIcon>
                <ActionIcon
                  size="small"
                  onClick={() => layer.move(layer.getIndex() + 1)}
                >
                  <Icon Label={IconCar} />
                </ActionIcon>
                <button className="flex-grow" onClick={() => layer.select()}>
                  {layer.getLabel()}
                </button>
                <div
                  //   className={cx(
                  //   'bg-white min-w-[17px] min-h-[17px] text-black text-sm flex justify-center',

                  // )}
                  style={layer.getStylePreview({
                    number: { min: -3, max: 3 },
                    camelCase: true,
                  })}
                >
                  {isTextShadow && 'T'}
                </div>
                <ActionIcon size="small" onClick={() => layer.remove()}>
                  <Icon Label={IconTrashFilled} />
                </ActionIcon>
              </div>
              {layer.isSelected() && (
                <div className="p-2 flex flex-wrap">
                  {stackProp.getProperties().map((prop) => (
                    <StylePropertyField key={prop.getId()} prop={prop} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
      break;
    default:
     null
  }
  return <Stack gap={5}>
    <div className="flex-grow capitalize">{prop.getLabel()}</div>
    {inputToRender}
  </Stack>
}



const BlocksManager = ({

  mapCategoryBlocks,
  dragStart,
  dragStop,

}: any) => {
  console.log(JSON.stringify(mapCategoryBlocks, null, 2));
  return < >
    {Array.from(mapCategoryBlocks).map(([category, blocks]) => {
      return <Stack key={category} >
        <Text size="md"
          className=" bg-slate-800 p-2 rounded-md"
        >{category}</Text>
        <SimpleGrid cols={4}>
          {blocks.map((block: any) => {
            return <Flex direction='column' key={block.getId()} align='center' gap={0}
              onClick={() => dragStart(block)}
              draggable
              onDragStart={(e) => dragStart(block, e.nativeEvent)}
              onDragEnd={(e) => dragStop(false)}
            >
              <div
                className="h-full w-full"
                dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
              />
              <Text>{block.getLabel()}</Text>

            </Flex>
          })}
        </SimpleGrid>
      </Stack>
    })}
  </>
}