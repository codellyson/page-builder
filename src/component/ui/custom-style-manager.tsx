import { ScrollArea, Accordion, Text, Stack } from "@mantine/core"
import { StylePropertyField } from "./style-property-field"

export const CustomStyleManager = ({ sectors }: any) => {
    return <ScrollArea.Autosize mah={800} offsetScrollbars>
      {sectors.map((sector: any) => {
        return <Accordion key={sector.getId()} >
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
              <Stack gap='xs'>
                {console.log( sector.getProperties()) }
              {  console.log(sector)}
                {sector.getProperties().map((property: any) => {
                  return <StylePropertyField key={property.getId()} prop={property} />
              })}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      })}
    </ScrollArea.Autosize>
  }