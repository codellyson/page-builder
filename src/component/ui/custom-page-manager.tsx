import { PagesResultProps } from '@grapesjs/react';
import { IconTrashFilled } from '@tabler/icons-react';
import { Box } from '@mantine/core';
import { BTN_CLS, cx, MAIN_BORDER_COLOR } from '../../helper';
import { Icon } from './right-bar';

export default function CustomPageManager({
    pages,
    selected,
    add,
    select,
    remove,
}: PagesResultProps) {
    const addNewPage = () => {
        const nextIndex = pages.length + 1;
        add({
            name: `New page ${nextIndex}`,
            component: `<h1>Page content ${nextIndex}</h1>`,
        });
    };

    return (
        <Box className="gjs-custom-page-manager">
            <Box className="p-2">
                <button type="button" className={BTN_CLS} onClick={addNewPage}>
                    Add new page
                </button>
            </Box>
            {pages.map((page, index) => (
                <Box
                    key={page.getId()}
                    className={cx(
                        'flex items-center py-2 px-4 border-b',
                        index === 0 && 'border-t',
                        MAIN_BORDER_COLOR
                    )}
                >
                    <button
                        type="button"
                        className="flex-grow text-left"
                        onClick={() => select(page)}
                    >
                        {page.getName() || 'Untitled page'}
                    </button>
                    {selected !== page && (
                        <button type="button" onClick={() => remove(page)}>
                            <Icon Label={IconTrashFilled} Size={0.7} />
                        </button>
                    )}
                </Box>
            ))}
        </Box>
    );
}
