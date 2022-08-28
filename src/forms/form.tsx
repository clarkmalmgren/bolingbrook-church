import { Paper } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import React, { PureComponent } from 'react'
import { merge } from './merge'
import { ProvidedFieldProps } from './props'

const styles = createStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    maxWidth: '800px',
    padding: '22px',
    margin: '15px auto'
  }
})

interface FormProps<T> extends WithStyles<typeof styles> {
  initialData?: T
  onChange?: (data: T) => any | void
  onSubmit?: (data: T) => any | void
  children: JSX.Element[]
}

interface FormState<T> {
  value: T
}

class Form<T> extends PureComponent<FormProps<T>, FormState<T>> {

  state = {
    value: this.props.initialData || {} as T
  }
  
  // If the initial data populates for the first time, update state now
  componentDidUpdate(prevProps: FormProps<T>) {
    if (!prevProps.initialData && this.props.initialData) {
      this.setState({ value: this.props.initialData } )
    }
  }
  
  // Common update logic
  update<K extends keyof T>(id: K, data: T[K]): void {
    const updated = merge(this.state.value, { [id]: data })

    this.setState({ value: updated })
    if (this.props.onChange) {
      this.props.onChange(updated)
    }
  }

  submit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value)
    }
  }

  renderChild(child: JSX.Element, index: number): JSX.Element | JSX.Element[] | undefined {
    if (React.isValidElement(child)) {
      const id: keyof T = (child.props as any).id
      const providedProps: ProvidedFieldProps<any> & { key: string } = {
        key: id as string || `__forms__.${index}`,
        value: this.state.value[id],
        onChange: (data) => this.update(id, data),
        onSubmit: () => this.submit()
      }

      return React.cloneElement(child, providedProps)
    }
  }

  formComponent = (props: any) => (<form {...props}/>)

  render() {
    return (
      <Paper className={this.props.classes.root} component={this.formComponent}>
        { this.props.children.map((child, index) => this.renderChild(child, index)) }
      </Paper>
    )
  }
}

export default withStyles(styles)(Form)
