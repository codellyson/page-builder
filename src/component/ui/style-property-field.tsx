import { useEditor } from "@grapesjs/react";
import { Center, TextInput, Select, Radio, Group, Slider, ColorInput, Stack, ActionIcon, Text, Box, Button, Avatar, Paper, Divider } from "@mantine/core";
import { IconChevronUp, IconChevronDown, IconTrashFilled } from "@tabler/icons-react";
import { Property, PropertyComposite, PropertyRadio, PropertySelect, PropertySlider, PropertyStack } from "grapesjs";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}
export const StylePropertyField = ({
  prop,
}: StylePropertyFieldProps) => {

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

  const editor = useEditor()
  const openAssets = () => {
    console.log("openAssets");

    const { Assets } = editor
    Assets.open({
      select: (asset, complete) => {
        prop.upValue(asset.getSrc())
        complete && Assets.close()
      }, types: ['image'],
      accept: 'image/*'
    })
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
      } value={selectProp.getValue() ?? ""} onChange={(value) => selectProp.setValue(value!)} placeholder={selectProp.getLabel()} />
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
      inputToRender = <ColorInput type="color" value={valueWithDef} onChange={(value) => handleChange(value!)} />
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
      const fileProp = prop as FilePropertyBag
      console.log({ fileProp }, value, defaultValue)
      inputToRender = <Group gap={4}  >
        {value && value !== defaultValue && (

          <Avatar src={value} size="md" radius={0} />
        )}
        <Button type="button" onClick={openAssets} variant="light" size="xs">
          Select Image
        </Button>
      </Group>
    }
      break;

    case 'composite': {
      const compositeProp = prop as PropertyComposite;
      inputToRender = <Group
        wrap="nowrap"
      >
        {compositeProp.getProperties().map((option: any) => {
          return <StylePropertyField key={option.getId()} prop={option} />
        })}
      </Group>
    }
      break;

    case 'stack': {

      {
        const stackProp = prop as PropertyStack;
        const layers = stackProp.getLayers();
        const isTextShadow = stackProp.getName() === 'text-shadow';
        inputToRender = (
          <Stack
          >
            {layers.map((layer) => (
              <Paper withBorder p='xs' key={layer.getId()} className='rounded-md '>
                <Group>
                <Group gap={2} >
                  <ActionIcon
                    size="sm"
                    onClick={() => layer.move(layer.getIndex() - 1)}
                    color="gray"
                    disabled={layer.getIndex() === 0}
                  >
                    <Icon Label={IconChevronUp} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    onClick={() => layer.move(layer.getIndex() + 1)}
                    color="gray"
                    disabled={layer.getIndex() === layers.length - 1}
                  >
                    <Icon Label={IconChevronDown} />
                  </ActionIcon>
                  </Group>
                  <Button className="flex-grow" onClick={() => layer.select()}
                    variant="light"
                    size="xs"
                  >
                    {layer.getLabel()}
                  </Button>
                  <Box
                    className={
                      'bg-white min-w-[30px] min-h-[30px] rounded-md text-black text-sm flex justify-center'
                    }
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && 'T'}
                  </Box>
                  <ActionIcon size="sm" onClick={() => layer.remove()} variant="outline" color="red">
                    <Icon Label={IconTrashFilled} />
                  </ActionIcon>
                </Group>
                {layer.isSelected() && (
                  <Box className="p-2 flex flex-wrap">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </Box>
                )}
              </Paper>
            ))}
          </Stack>
        );
      }
    }
      break;
    default:
      inputToRender = <TextInput value={valueWithDef} onChange={(e) => handleChange(e.target.value!)} />
  }
  return <Stack gap={3} >
    <Text size="sm" fw={500} >{prop.getLabel()}</Text>
    
    {inputToRender}
  </Stack>
}
