import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { DefaultCell } from '../../ContentList/CellTemplates/DefaultCell'

/**
 * DefaultCell Component tests
 */
export const defaultCellTests: Mocha.Suite = describe('DefaultCell component', () => {
    it('Should render without crashing', () => {
        const component = renderer.create(<DefaultCell
            content={{ Id: 123, Path: '', Name: '', Type: 'Folder' }}
            field={'Type'}
            isSelected={false}
        />)
        component.unmount()
    })

    it('Should add selected class from props', () => {
        const component = renderer.create(<DefaultCell
            content={{ Id: 123, Path: '', Name: '', Type: 'Folder' }}
            field={'Type'}
            isSelected={true}
        />)
        component.unmount()
    })
})
