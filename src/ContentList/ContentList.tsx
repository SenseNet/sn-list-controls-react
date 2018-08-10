import {GenericContent, IActionModel} from '@sensenet/default-content-types'
import * as React from 'react'

export interface ContentListProps<T extends GenericContent> {
    parent: GenericContent
    items: T[]
    active: T
    selected: T[]
    fieldsToDisplay: Array<keyof T>
    onItemClick?: (e: React.MouseEvent, content: GenericContent) => void
    onItemDoubleClick?: (e: React.MouseEvent, content: GenericContent) => void
    onItemTap?: (e: React.SyntheticEvent, content: GenericContent) => void
    onItemContextMenu?: (e: React.SyntheticEvent, content: GenericContent) => void
    onRequestOrderChange?: (field: keyof T, direction: 'asc' | 'desc') => void
    onRequestSelectionChange?: (newSelection: T[]) => void
    onRequestActiveItemChange?: (newActiveItem: T) => void
    onAction?: (item: T, action: IActionModel) => void
}

export class ContentList<T extends GenericContent> extends React.Component<ContentListProps<T>> {
    private bindCallbacks() {
        for (const field in this.props) {
            if (this.props.hasOwnProperty(field) && typeof field === 'function') {
                // field = field.bind(this)
            }
        }
    }

    constructor(props: ContentListProps<T>) {
        super(props)
        this.bindCallbacks()
    }
    public render() {
        return <div></div>
    }
}
