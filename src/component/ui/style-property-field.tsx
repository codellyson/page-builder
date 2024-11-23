import { Center, TextInput, Select, Radio, Group, Slider, ColorInput, Stack, ActionIcon, Text } from "@mantine/core";
import { IconChevronUp, IconChevronDown, IconTrashFilled } from "@tabler/icons-react";
import { Property, PropertyComposite, PropertyRadio, PropertySelect, PropertySlider, PropertyStack } from "grapesjs";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
    prop: Property;
  }
  export    const StylePropertyField = ({
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
        inputToRender = <div className="flex flex-col items-center gap-3">
          {value && value !== defaultValue && (
            <div
              className="w-[50px] h-[50px] rounded inline-block bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url("${value}")` }}
              onClick={() => handleChange('')}
            />
          )}
          <button type="button" onClick={openAssets} className='bg-white text-black'>
            Select Image
          </button>
        </div>
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
            <div
              className='flex flex-col p-2 gap-2   min-h-[54px]'
            >
              {layers.map((layer) => (
                <div key={layer.getId()} className='rounded-md  '>
                  <div className="flex gap-1  px-2 py-1 items-center">
                    <ActionIcon
                      size="sm"
                      onClick={() => layer.move(layer.getIndex() - 1)}
                    >
                      <Icon Label={IconChevronUp} />
                    </ActionIcon>
                    <ActionIcon
                      size="sm"
                      onClick={() => layer.move(layer.getIndex() + 1)}
                    >
                      <Icon Label={IconChevronDown} />
                    </ActionIcon>
                    <button className="flex-grow" onClick={() => layer.select()}>
                      {layer.getLabel()}
                    </button>
                    <div
                      className={
                        'bg-white min-w-[17px] min-h-[17px] text-black text-sm flex justify-center'
                      }
                      style={layer.getStylePreview({
                        number: { min: -3, max: 3 },
                        camelCase: true,
                      })}
                    >
                      {isTextShadow && 'T'}
                    </div>
                    <ActionIcon size="sm" onClick={() => layer.remove()} variant="outline">
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
      }
        break;
      default:
        inputToRender = <TextInput value={valueWithDef} onChange={(e) => handleChange(e.target.value!)} />
    }
    return <Stack gap={0} >
      <Text size="sm">{prop.getLabel()}</Text>
      {inputToRender}
    </Stack>
  }
  