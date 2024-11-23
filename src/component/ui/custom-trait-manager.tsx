
import { TraitsResultProps } from '@grapesjs/react';
import TraitPropertyField from './trait-property-field';
import { Box, Text } from '@mantine/core';

export default function CustomTraitManager({ traits }: Omit<TraitsResultProps, 'Container'>) {
    return (
        <Box className="gjs-custom-style-manager text-left mt-3 p-1">
            {
                !traits.length ?
                    <Text>No properties available</Text>
                    :
                    traits.map(trait => (
                        <TraitPropertyField key={trait.getId()} trait={trait} />
                    ))}
        </Box>
    );
}