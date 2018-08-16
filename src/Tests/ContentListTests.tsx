import { GenericContent, SchemaStore } from '@sensenet/default-content-types'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { ContentList } from '../ContentList/ContentList'

const genericSchema = SchemaStore[1]

/**
 * ContentList Component tests
 */
export const contentListTests: Mocha.Suite = describe('ContentList component', () => {
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

    it('Should render with a selected content', () => {
        const component = renderer.create(<ContentList<GenericContent>
            items={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }]}
            schema={genericSchema}
            fieldsToDisplay={['DisplayName']}
            selected={[{ Id: 1, Name: '1', Path: '1', DisplayName: 'A', Type: 'Folder' }]}
            orderBy="DisplayName"
            orderDirection="asc"
            icons={{}}
        />)
        component.unmount()
    })
})
