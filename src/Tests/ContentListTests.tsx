import { GenericContent, SchemaStore } from '@sensenet/default-content-types'
import {expect} from 'chai'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import {ActionsCell} from '../ContentList/CellTemplates/ActionsCell'
import { ContentList } from '../ContentList/ContentList'

const genericSchema = SchemaStore[1]

/**
 * ContentList Component tests
 */
export const contentListTests: Mocha.Suite = describe('ContentList component', () => {

    describe('Initialization', () => {
        it('Should render without crashing with bare minimum props', () => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[]}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName']}
                selected={[]}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
            />)
            component.unmount()
        })

        it('Should render with a few content', () => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }]}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName']}
                selected={[]}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
            />)
            component.unmount()
        })

    })

    describe('Selection', () => {
        it('Should render with a selected content and the corresponding class should be appear', () => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }]}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName']}
                selected={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }]}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
            />)

            const selected = component.root.findAll((instance) => (instance.type as any).name === 'TableRow' && typeof instance.props.className === 'string' && instance.props.className.indexOf('selected') > -1)
            expect(selected.length).to.be.equal(1)

            component.unmount()
        })

        it('Clicking on a selection box should default behavior', () => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[
                    { Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' },
                    { Id: 2, Name: '2', Path: '2', DisplayName: 'B', Type: 'Folder' },
                ]}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName', 'Type']}
                selected={[]}
                active={{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
            />)
            const selected = component.root.findAll((instance) => (instance.type as any).name === 'Checkbox' && instance.props.className !== 'select-all')[0]
            selected.props.onChange()
            component.unmount()
        })

        it('Clicking on a selection box should add a content to the selection if not selected', (done: MochaDone) => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[
                    { Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' },
                    { Id: 2, Name: '2', Path: '2', DisplayName: 'B', Type: 'Folder' },
                ]}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName', 'Type']}
                selected={[]}
                active={{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
                onRequestSelectionChange={(items) => {
                    expect(items.length).to.be.equal(1)
                    expect(items[0].Id).to.be.equal(1)
                    component.unmount()
                    done()
                }}
            />)
            const selected = component.root.findAll((instance) => (instance.type as any).name === 'Checkbox' && instance.props.className !== 'select-all')[0]
            selected.props.onChange()
        })

        it('Clicking on a selection box should remove a content from the selection if selected', (done: MochaDone) => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[
                    { Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' },
                    { Id: 2, Name: '2', Path: '2', DisplayName: 'B', Type: 'Folder' },
                ]}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName', 'Type']}
                selected={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }]}
                active={{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
                onRequestSelectionChange={(items) => {
                    expect(items.length).to.be.equal(0)
                    expect(items).to.be.deep.equal([])
                    component.unmount()
                    done()
                }}
            />)
            const selected = component.root.findAll((instance) => (instance.type as any).name === 'Checkbox' && instance.props.className !== 'select-all')[0]
            selected.props.onChange()
        })

        it('Clicking on a select all box should add all content to the selection, if not all is selected', (done: MochaDone) => {
            const items = [
                { Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' },
                { Id: 2, Name: '2', Path: '2', DisplayName: 'B', Type: 'Folder' },
            ]
            const component = renderer.create(<ContentList<GenericContent>
                items={items}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName', 'Type']}
                selected={[]}
                active={{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
                onRequestSelectionChange={(selection) => {
                    expect(selection.length).to.be.equal(2)
                    expect(selection).to.be.deep.eq(selection)
                    component.unmount()
                    done()
                }}
            />)
            const selected = component.root.findAll((instance) => (instance.type as any).name === 'Checkbox' && instance.props.className === 'select-all')[0]
            selected.props.onChange()
        })

        it('Clicking on a select all box should clear the selection if all content are selected', (done: MochaDone) => {
            const items = [
                { Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' },
                { Id: 2, Name: '2', Path: '2', DisplayName: 'B', Type: 'Folder' },
            ]
            const component = renderer.create(<ContentList<GenericContent>
                items={items}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName', 'Type']}
                selected={items}
                active={{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
                onRequestSelectionChange={(selection) => {
                    expect(selection.length).to.be.equal(0)
                    expect(selection).to.be.deep.eq([])
                    component.unmount()
                    done()
                }}
            />)
            const selected = component.root.findAll((instance) => (instance.type as any).name === 'Checkbox' && instance.props.className === 'select-all')[0]
            selected.props.onChange()
        })

        it('Should render with an active content and the corresponding class should be appear', () => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }]}
                schema={genericSchema}
                fieldsToDisplay={['DisplayName', 'Type']}
                selected={[]}
                active={{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
            />)
            const selected = component.root.findAll((instance) => (instance.type as any).name === 'TableRow' && typeof instance.props.className === 'string' && instance.props.className.indexOf('active') > -1)
            expect(selected.length).to.be.equal(1)
            component.unmount()
        })
    })

    describe('Actions', () => {
        it('Actions component shouldn\'t be added by if actions are selected but not expanded on the content', () => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder'}]}
                schema={genericSchema}
                fieldsToDisplay={['Actions', 'Type']}
                selected={[]}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
            />)

            const actionsComponent = component.root.findAllByType(ActionsCell)
            expect(actionsComponent.length).to.be.equal(0)

            component.unmount()
        })

        it('Actions component should be added by if actions are selected and expanded on the content', () => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder', Actions: []}]}
                schema={genericSchema}
                fieldsToDisplay={['Actions', 'Type']}
                selected={[]}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
            />)
            const actionsComponent = component.root.findAllByType(ActionsCell)
            expect(actionsComponent.length).to.be.equal(1)

            component.unmount()
        })

        it('onRequestActionsMenu should be triggered on click if actions are expanded', (done: MochaDone) => {
            const component = renderer.create(<ContentList<GenericContent>
                items={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder', Actions: []}]}
                schema={genericSchema}
                fieldsToDisplay={['Actions', 'Type']}
                selected={[]}
                orderBy="DisplayName"
                orderDirection="asc"
                icons={{}}
                onRequestActionsMenu={(ev) => {
                    component.unmount()
                    done()
                }}
            />)
            const actionsComponent = component.root.findAllByType(ActionsCell)
            actionsComponent[0].props.openActionMenu()
        })
    })
})
