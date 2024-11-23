import { AssetsResultProps, useEditor } from '@grapesjs/react'
import { ActionIcon, Image, SimpleGrid } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Asset } from 'grapesjs';
import React from 'react'

type CustomAssetManagerProps = Pick<AssetsResultProps, "assets" | "close" | "select">

export const CustomAssetManager = ({
    assets, select
}: CustomAssetManagerProps) => {
    const editor = useEditor();

    const remove = (asset: Asset) => {
        editor.Assets.remove(asset);
    }
    return (<SimpleGrid cols={4}>
        {assets.map((asset) => {
            return <div key={asset.getSrc()}
                onClick={() => select(asset, true)}
            >
                <Image src={asset.getSrc()} />
                <ActionIcon onClick={() => remove(asset)} variant='transparent' color='red'>
                    <IconTrash />
                </ActionIcon>
            </div>
        })}
    </SimpleGrid>
    )
}
