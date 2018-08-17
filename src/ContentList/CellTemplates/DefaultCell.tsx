import { TableCell } from '@material-ui/core'
import { GenericContent } from '@sensenet/default-content-types'
import React = require('react')

export interface DefaultCellProps<T extends GenericContent, K extends keyof T> {
    isSelected: boolean
    content: T
    field: K
}

export const DefaultCell = <T extends GenericContent, K extends keyof T>(props: DefaultCellProps<T, K>) => (
    <TableCell className={props.isSelected ? 'selected' : ''} padding="checkbox">
        <span>{props.content[props.field] && props.content[props.field].toString()}</span>
    </TableCell>
)
