import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core'
import { GenericContent, IActionModel, Schema} from '@sensenet/default-content-types'
import * as React from 'react'

export interface ContentListProps<T extends GenericContent> {
    items: T[]
    schema: Schema
    active?: T
    selected: T[]
    fieldsToDisplay: Array<keyof T>
    orderBy: keyof T
    orderDirection: 'asc' | 'desc'
    onItemClick?: (e: React.MouseEvent, content: GenericContent) => void
    onItemDoubleClick?: (e: React.MouseEvent, content: GenericContent) => void
    onItemTap?: (e: React.SyntheticEvent, content: GenericContent) => void
    onItemContextMenu?: (e: React.SyntheticEvent, content: GenericContent) => void
    onRequestOrderChange?: (field: keyof T, direction: 'asc' | 'desc') => void
    onRequestSelectionChange?: (newSelection: T[]) => void
    onRequestActiveItemChange?: (newActiveItem: T) => void
    onAction?: (item: T, action: IActionModel) => void
}

export interface ContentListState {
    itemCount: number
    selectedCount: number
    isAllSelected: boolean
    hasSelected: boolean
}

export class ContentList<T extends GenericContent> extends React.Component<ContentListProps<T>, ContentListState> {
    public state = ContentList.getDerivedStateFromProps(this.props as any, null as any)

    public static getDerivedStateFromProps(nextProps: ContentListProps<GenericContent>, lastState: ContentListState) {
        const selectedCount = nextProps.selected.length
        const itemCount = nextProps.items.length
        return {
            selectedCount,
            itemCount,
            hasSelected: selectedCount > 0,
            isAllSelected: itemCount === selectedCount,
        } as ContentListState
    }

    public handleSelectAllClick() {
        this.props.onRequestSelectionChange &&
            (this.state.isAllSelected ?
                this.props.onRequestSelectionChange([]) :
                this.props.onRequestSelectionChange(this.props.items))
    }

    public handleContentSelection(content: T) {
        if (this.props.onRequestSelectionChange) {
            if (this.props.selected.find((c) => c.Id === content.Id)) {
                this.props.onRequestSelectionChange(this.props.selected.filter((s) => s.Id !== content.Id))
            } else {
                this.props.onRequestSelectionChange([...this.props.selected, content])
            }
        }
    }

    constructor(props: ContentListProps<T>) {
        super(props)
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
        this.handleContentSelection = this.handleContentSelection.bind(this)
    }
    public render() {
        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox" key="selectAll">
                        <Checkbox
                            indeterminate={this.state.hasSelected && !this.state.isAllSelected}
                            checked={this.state.isAllSelected}
                            onChange={this.handleSelectAllClick}
                        />
                    </TableCell>
                    {this.props.fieldsToDisplay.map((field) => {
                        const fieldSetting = this.props.schema.FieldSettings.find((s) => s.Name === field)
                        const isNumeric = fieldSetting && (fieldSetting.Type === 'IntegerFieldSetting' || fieldSetting.Type === 'NumberFieldSetting')
                        const description = fieldSetting && fieldSetting.Description || field
                        const displayName = fieldSetting && fieldSetting.DisplayName || field
                        return (<TableCell
                                key={field as string}
                                numeric={isNumeric}
                            >
                                <Tooltip title={description} >
                                    <TableSortLabel
                                        active={this.props.orderBy === field}
                                        direction={this.props.orderDirection}
                                        onClick={() => this.props.onRequestOrderChange && this.props.onRequestOrderChange(field, this.props.orderDirection === 'asc' ? 'desc' : 'asc')}
                                        >
                                        {displayName}
                                    </TableSortLabel>
                                </Tooltip>
                        </TableCell>)
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.items.map((item) => {
                    return (<TableRow key={item.Id}>
                        <TableCell padding="checkbox" key="select">
                            <Checkbox
                                checked={this.props.selected.find((i) => i.Id === item.Id) ? true : false}
                                onChange={() => this.handleContentSelection(item)}
                                />
                        </TableCell>
                        {this.props.fieldsToDisplay.map((field) => {
                            return (<TableCell key={field.toString()}>
                                {item[field]}
                            </TableCell>)
                        })}
                    </TableRow>
    )
                })}
            </TableBody>
        </Table>
    }
}
