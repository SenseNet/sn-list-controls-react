import { TableCell } from '@material-ui/core'
import { GenericContent } from '@sensenet/default-content-types'
import React = require('react')
import { CellProps } from './CellProps'

export const DefaultCell = <T extends GenericContent>(props: CellProps<T, keyof T>) => (
    <TableCell className={props.isSelected ? 'selected' : ''} padding="checkbox">
        <span>{props.content[props.field] && props.content[props.field].toString()}</span>
    </TableCell>
)
