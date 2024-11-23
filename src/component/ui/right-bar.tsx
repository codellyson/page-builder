import { Accordion, ActionIcon, Box, Button, Center, ColorInput, ColorPicker, FileInput, Flex, Group, Radio, ScrollArea, SegmentedControl, Select, SimpleGrid, Slider, Stack, Text, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { IconAlignBoxCenterStretch, IconBarrierBlock, IconBrush, IconCar, IconChevronDown, IconChevronUp, IconGrid3x3, IconLayersDifference, IconLayoutGrid, IconSettings, IconTrashFilled } from "@tabler/icons-react";
import { BlocksProvider, StylesProvider } from "@grapesjs/react";

import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from 'grapesjs';
import { CustomStyleManager } from "./custom-style-manager";
import { CustomBlocksManager } from "./custom-block-manager";


export const RightBar = () => {
  const Icon = ({ Label }: { Label: React.ElementType }) => {
    return (
      <Center style={{ gap: 10 }}>
        {<Label size={12} />}
      </Center>
    );
  };

  const g_UI_CONTROLS = [{
    label: <Icon Label={IconBrush} />,
    value: "1",
  },
  {
    label: <Icon Label={IconAlignBoxCenterStretch} />,
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
    <Box className="" c="dark">

      <Stack className="flex-1">
        <SegmentedControl
          value={selected}
          data={g_UI_CONTROLS}
          onChange={(value) => setSelected(value)}
          fullWidth
          size="sm"
          h={30}
        />
        {selected === "1" && <StylesProvider>
          {(props) => <CustomStyleManager {...props} />}
        </StylesProvider>}
        {selected === "2" && <Text>Align</Text>}
        {selected === "3" && <Text>Settings</Text>}
        {selected === "4" && <Text>LayersDifference</Text>}
        {selected === "5" && <BlocksProvider>
          {(props) => <CustomBlocksManager {...props} />}
        </BlocksProvider>}
      </Stack>
    </Box>
  );
};








