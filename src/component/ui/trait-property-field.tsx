import * as React from 'react';
import { useEditor } from '@grapesjs/react';
import { Box, Button, Checkbox, ColorInput, Select, TextInput } from '@mantine/core';
 import type { Trait } from 'grapesjs';
import { cx } from '../../helper';
import { Icon } from './right-bar';
import { IconCircle } from '@tabler/icons-react';

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait;
}

export   function TraitPropertyField({
  trait,
 }: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    trait.setValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get('command');
    if (command) {
      typeof command === 'string'
        ? editor.runCommand(command)
        : command(editor, trait);
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = typeof value !== 'undefined' ? value : defValue;

  let inputToRender = (
    <TextInput
      placeholder={defValue}
      value={value}
      onChange={onChange}
      size="sm"
      w="100%"
    />
  );

  switch (type) {
    case 'select':
      {
        inputToRender = (
          <Select value={value} onChange={onChange}
            data={trait.getOptions().map((option) => ({
              value: trait.getOptionId(option),
              label: trait.getOptionLabel(option),
            }))}
          />
        );
      }
      break;
    case 'color':
      {
        inputToRender = (
          <ColorInput
            placeholder={defValue}
            value={value}
            defaultValue={valueWithDef}
            onChange={onChange}
            size="sm"
            rightSection={<Icon Label={IconCircle} />}
             
          />
        );
      }
      break;
    case 'checkbox':
      {
        inputToRender = (
          <Checkbox
            checked={value}
            onChange={(ev) => trait.setValue(ev.target.checked)}
            size="sm"
          />
        );
      }
      break;
    case 'button':
      {
        inputToRender = (
          <Button fullWidth onClick={handleButtonClick}>
            {trait.getLabel()}
          </Button>
        );
      }
      break;
  }

  return (
    <Box   className={cx('mb-3 px-1 w-full')}>
      <div className={cx('flex mb-2 items-center')}>
        <div className="flex-grow capitalize">{trait.getLabel()}</div>
      </div>
      {inputToRender}
    </Box>
  );
}
