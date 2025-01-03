import { Box, Center, SegmentedControl, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { IconBrush, IconLayoutGrid, IconNotes, IconSettings, IconStack } from "@tabler/icons-react";
import { BlocksProvider, LayersProvider, PagesProvider, StylesProvider, TraitsProvider } from "@grapesjs/react";
 
import { CustomStyleManager } from "./custom-style-manager";
import { CustomBlocksManager } from "./custom-block-manager";
import CustomPageManager from "./custom-page-manager";
import CustomTraitManager from "./custom-trait-manager";
import { CustomLayerManager } from "./custom-layer-manager";

export const Icon = ({ Label, Size, bare = true }: { Label: React.ElementType, Size?: number, bare?: boolean }) => {
  return !bare ? (
    <Center style={{ gap: 10 }}>
      {<Label size={Size || 12} 
      />}
    </Center>
  ) : <Label size={Size || 12}  />;
};

export const RightBar = () => {


  const g_UI_CONTROLS = [{
    label: <Icon Label={IconBrush} bare={false} />,
    value: "1",
  },
  {
    label: <Icon Label={IconSettings} bare={false} />,
    value: "2",
  },

  {
    label: <Icon Label={IconStack} bare={false} />,
    value: "3",
  },
  {
    label: <Icon Label={IconLayoutGrid} bare={false} />,
    value: "4",
  }, {
    label: <Icon Label={IconNotes} bare={false} />,
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
          size="lg"
          color="dark"
          variant="filled"
          
         
          classNames={{
            root: "bg-transparent",
            control: "bg-transparent",
            label: "text-white",
          }}
        />
        {selected === "1" && <StylesProvider>
          {(props) => <CustomStyleManager {...props} />}
        </StylesProvider>}
        {selected === "2" && <TraitsProvider>
          {(props) => <CustomTraitManager {...props} />}
        </TraitsProvider>}
        {selected === "3" &&  <LayersProvider>
          {(props) => <CustomLayerManager {...props} />}
        </LayersProvider>}
      
        {selected === "4" && <BlocksProvider>
          {(props) => <CustomBlocksManager {...props} />}
        </BlocksProvider>}  {selected === "5" && <PagesProvider>
          {({ pages, select, add, remove }) => <CustomPageManager pages={pages} select={select} add={add} remove={remove} />}
        </PagesProvider>}
      </Stack>
    </Box>
  );
};








