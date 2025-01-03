import { Stack, Text, SimpleGrid, Flex } from "@mantine/core";

interface CustomBlocksManagerProps {
  mapCategoryBlocks: any;
  dragStart: any;
  dragStop: any;
}

export const CustomBlocksManager = ({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}: CustomBlocksManagerProps) => {

   
  return (
    <>
      {Array.from(mapCategoryBlocks as any).map(([category, blocks]: any) => {
        return (
          <Stack key={category}>
            <Text size="md" className=" p-2 rounded-md">
              {category}
            </Text>
            <SimpleGrid cols={4}>
              {blocks.map((block: any) => {
                return (
                  <Flex
                    direction="column"
                    key={block.getId()}
                    align="center"
                    gap={0}
                    onClick={() => dragStart(block)}
                    draggable
                    onDragStart={(e) => dragStart(block, e.nativeEvent)}
                    onDragEnd={ (e) => dragStop(false)}
                  >
                    <div
                      className="h-full w-full"
                      dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                    />
                    <Text>{block.getLabel()}</Text>
                  </Flex>
                );
              })}
            </SimpleGrid>
           
          </Stack>
        );
      })}
    </>
  );
};
