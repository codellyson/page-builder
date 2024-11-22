import { Center, SegmentedControl } from "@mantine/core";
import React, { useState } from "react";
import { IconAlignBoxCenterStretch, IconBrush } from "@tabler/icons-react";

export const RightBar = () => {
  const Icon = ({icon}:{ icon:React.ElementType}) => {
    return (
      <Center style={{ gap: 10 }}>
        {icon}
      </Center>
    );
  };

  const g_UI_CONTROLS = [
    {
      label: <Icon icon={IconAlignBoxCenterStretch} />,
      value: "1",
    },
    {
      label: <Icon icon={IconBrush} />,
      value: "2",
    },
  ];
  const [selected, setSelected] = useState("1");

  return (
    <div className="bg-slate-900 border-slate-800 p-2 text-white h-full">
      <SegmentedControl
        value={selected}
        data={g_UI_CONTROLS}
        onChange={(value) => setSelected(value)}
        fullWidth
      />
    </div>
  );
};
