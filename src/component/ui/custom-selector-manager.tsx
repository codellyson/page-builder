 import { SelectorsResultProps } from '@grapesjs/react'; 
import { MAIN_BORDER_COLOR, cx } from  '../../helper'
import { Box,  Select, Text, UnstyledButton } from '@mantine/core';
import { Icon } from './right-bar';
import { IconPlus, IconX } from '@tabler/icons-react';

export default function CustomSelectorManager({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, 'Container'>) {
  const addNewSelector = () => {
    const next = selectors.length + 1;
    addSelector({ name: `new-${next}`, label: `New ${next}` });
  };

  const targetStr = targets.join(', ');

  return (
    <Box className="gjs-custom-selector-manager p-2 flex flex-col gap-2 text-left">
      <Box className="flex items-center">
        <Box className="flex-grow">Selectors</Box>
        
          <Select
            value={selectedState}
            onChange={(value) => setState(value!)}
            data={states.map((state) => ({
              label: state.getName(),
              value: state.id.toString(),
            }))}
          />
            
        
         
      </Box>
      <Box
        className={cx(
          'flex items-center gap-2 flex-wrap p-2 bg-black/30 border rounded min-h-[45px]',
          MAIN_BORDER_COLOR
        )}
      >
        {targetStr ? (
          <UnstyledButton 
            type="button"
            onClick={addNewSelector}
            className={cx('border rounded px-2 py-1')}
          >
            <Icon Label={IconPlus}   />
          </UnstyledButton>
        ) : (
          <Text className="opacity-70">Select a component</Text>
        )}
        {selectors.map((selector) => (
          <Box
            key={selector.toString()}
            className="px-2 py-1 flex items-center gap-1 whitespace-nowrap bg-sky-500 rounded"
          >
            <div>{selector.getLabel()}</div>
            <button type="button" onClick={() => removeSelector(selector)}>
              <Icon Label={IconX} bare />
            </button>
            </Box>
        ))}
      </Box>
      <Box>
        Selected: <span className="opacity-70">{targetStr || 'None'}</span>
      </Box>
    </Box>
  );
}
