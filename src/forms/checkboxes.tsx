import React, { Fragment, FunctionComponent } from 'react'
import { FieldProps, ProvidedFieldProps, partial } from './props'
import { CheckboxOptionProps } from './checkbox-option'

interface CheckboxesProps extends FieldProps<string[]> {
  children: JSX.Element[]
}

const Checkboxes: FunctionComponent<CheckboxesProps> =
  (props) => {
    const update = (id: string, checked: boolean) => {
      const original = (props.value || []).filter(s => s !== id)

      if (checked) {
        props.onChange([id, ...original])
      } else {
        props.onChange(original)
      }
    }

    const renderChild = (child: JSX.Element) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as CheckboxOptionProps
        const id: string = childProps.children
        const providedProps: ProvidedFieldProps<boolean> & { key: string } = {
          key: id,
          value: (props.value || []).includes(id),
          onChange: (checked) => update(id, checked),
          onSubmit: () => props.onSubmit()
        }

        return React.cloneElement(child, providedProps)
      }
    }

    return (
      <Fragment>{props.children.map(child => renderChild(child))}</Fragment>
    )
  }

export default partial(Checkboxes)
