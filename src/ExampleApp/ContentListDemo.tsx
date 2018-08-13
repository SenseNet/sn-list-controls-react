import { Checkbox, Divider, FormControlLabel, FormGroup, Paper, TableCell, TextField, Tooltip, Typography } from '@material-ui/core'
import { GenericContent, SchemaStore } from '@sensenet/default-content-types'
import React = require('react')
import { ContentList, ContentListProps } from '../ContentList'

export interface ContentListDemoState extends ContentListProps<GenericContent> {
    isEditing: boolean
}

export class ContentListDemo extends React.Component<{}, ContentListDemoState> {

    public state: ContentListDemoState = {
        items: [
            { Id: 1, Path: '/Root/Examples/Foo', Type: 'Folder', Name: 'Foo', DisplayName: 'FoOoOo' },
            { Id: 2, Path: '/Root/Examples/Bar', Type: 'Folder', Name: 'Bar', DisplayName: 'Bár' },
            { Id: 3, Path: '/Root/Examples/Baz', Type: 'Folder', Name: 'Baz', DisplayName: 'Z Baz' },
        ],
        schema: SchemaStore.filter((s) => s.ContentTypeName === 'GenericContent')[0],
        selected: [],
        fieldsToDisplay: ['DisplayName', 'Name', 'Type', 'Id'],
        orderBy: 'Id',
        orderDirection: 'asc',
        isEditing: false,
        fieldComponent: (field, content) => (_props) => {
            switch (field) {
                case 'DisplayName':
                    if (this.state.isEditing) {
                        return (<TableCell><TextField defaultValue={content[field]} onChange={(ev) => content[field] = ev.currentTarget.value} /></TableCell>)
                    } else {
                        return (<TableCell>
                            <span title={content.Description}>{content[field]} </span>
                        </TableCell>)
                    }
                case 'Name':
                    return (<TableCell>
                        <Tooltip title={content.Path}><span>{content[field]} </span></Tooltip>
                    </TableCell>)
                default:
                    return (<TableCell>{content[field]}</TableCell>)
            }
        },
    }

    private handleOrderChange(field: keyof GenericContent, direction: 'asc' | 'desc') {
        const orderedItems = (this.state.items as GenericContent[]).sort((a, b) => {
            const textA = (a[field] || '').toString().toUpperCase()
            const textB = (b[field] || '').toString().toUpperCase()
            return direction === 'asc' ? ((textA < textB) ? -1 : (textA > textB) ? 1 : 0) :
                ((textA > textB) ? -1 : (textA < textB) ? 1 : 0)
        })
        this.setState({
            ...this.state,
            orderBy: field,
            items: orderedItems,
            orderDirection: direction,
        })
    }

    private handleSelectionChange(newSelection: GenericContent[]) {
        this.setState({
            ...this.state,
            selected: newSelection,
        })
    }

    private handleActiveItemChange(item: GenericContent) {

        this.setState({
            ...this.state,
            active: item,
        })
    }

    constructor(props: any) {
        super(props)
        this.handleOrderChange = this.handleOrderChange.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.handleEditToggle = this.handleEditToggle.bind(this)
        this.handleActiveItemChange = this.handleActiveItemChange.bind(this)
    }

    private handleEditToggle() {
        this.setState({
            ...this.state,
            isEditing: !this.state.isEditing,
        })
    }

    public render() {
        return (
            <div style={{ padding: '2em' }}>
                <Typography variant="headline">ContentList</Typography>
                <Typography variant="subheading">You can display a collection of content in a grid view</Typography>
                <Typography variant="body1">Some generic description about what and how you can use the control</Typography>
                <Divider />
                <Paper style={{ marginTop: '1em' }}>
                    <ContentList<GenericContent>
                        {...this.state}
                        onRequestOrderChange={this.handleOrderChange}
                        onRequestSelectionChange={this.handleSelectionChange}
                        onRequestActiveItemChange={this.handleActiveItemChange}
                    />
                    <FormGroup row style={{ marginLeft: '2em', display: 'flex', flexDirection: 'row-reverse' }}>
                        <FormControlLabel control={
                            <Checkbox onChange={this.handleEditToggle} checked={this.state.isEditing} title={'Toggle display name editing'} />
                        } label="Toggle edit display name" />
                    </FormGroup>
                </Paper>
            </div>)
    }
}
