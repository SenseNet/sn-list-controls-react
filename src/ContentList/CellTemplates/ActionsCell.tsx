import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import MoreVert from '@material-ui/icons/MoreVert'
import { GenericContent, IActionModel } from '@sensenet/default-content-types'
import * as React from 'react'

export const styles = {
    actionMenuButton: {
        width: 30,
        cursor: 'pointer' as any,
    },
    icon: {
        verticalAlign: 'middle' as any,
        opacity: 0,
    },
    selectedIcon: {
        verticalAlign: 'middle' as any,
    },
    hoveredIcon: {
        verticalAlign: 'middle' as any,
    },
}

export interface ActionsCellProps<T extends GenericContent> {
    content: T,
    actions: IActionModel[]
    openActionMenu: (ev: React.MouseEvent) => any
}

export interface MenuCellState {
    anchorTop: number,
    anchorLeft: number
}

export class ActionsCell<T extends GenericContent> extends React.Component<ActionsCellProps<T>, MenuCellState> {
    constructor(props: ActionsCellProps<T>) {
        super(props)
        this.state = {
            anchorLeft: 0,
            anchorTop: 0,
        }
        this.handleActionMenuClick = this.handleActionMenuClick.bind(this)
    }
    public handleActionMenuClick(e: React.MouseEvent, content: T) {
        this.props.openActionMenu(e)
    }
    public render() {
        const { content } = this.props
        return (<TableCell style={styles.actionMenuButton} padding="checkbox">
            <IconButton
                aria-label="Menu"
                aria-owns="actionmenu"
                onClick={(event) => this.handleActionMenuClick(event, content)}
            >
                <MoreVert />
            </IconButton>
        </TableCell>
        )
    }
}
