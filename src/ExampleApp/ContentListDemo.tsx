import { Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core'
import {GenericContent, SchemaStore} from '@sensenet/default-content-types'
import React = require('react')
import {ContentList, ContentListProps} from '../ContentList'

export class ContentListDemo extends React.Component<{}, ContentListProps<GenericContent>> {

    public state: ContentListProps<GenericContent> = {
        items: [
            {Id: 1, Path: '/Root/Examples/Foo', Type: 'Folder', Name: 'Foo', DisplayName: 'FoOoOo'},
            {Id: 2, Path: '/Root/Examples/Bar', Type: 'Folder', Name: 'Bar', DisplayName: 'Bár'},
            {Id: 3, Path: '/Root/Examples/Baz', Type: 'Folder', Name: 'Baz', DisplayName: 'Z Baz'},

        ],
        schema: SchemaStore.filter((s) => s.ContentTypeName === 'GenericContent')[0],
        selected: [],
        fieldsToDisplay: ['DisplayName', 'Name', 'Path', 'Id', 'Type'],
        orderBy: 'Id',
        orderDirection: 'asc',
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

    /**
     *
     */
    constructor(props: any) {
        super(props)
        this.handleOrderChange = this.handleOrderChange.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)

    }

    public render() {
        return (
            <div style={{padding: '2em'}}>
        <Typography variant="headline">ContentList</Typography>
        <Typography variant="subheading">You can display a collection of content in a list view</Typography>
        <Typography variant="body1">Some generic description about what and how you can use the control</Typography>
        <Divider />
        <ExpansionPanel>
            <ExpansionPanelSummary>Basic usage</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <ContentList<GenericContent>
                        {...this.state}
                        onRequestOrderChange={this.handleOrderChange}
                        onRequestSelectionChange={this.handleSelectionChange}
                    />
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        </div>)
    }
}
