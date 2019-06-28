import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { FormControlLabel, Checkbox, Paper, Theme, Typography, Button } from '@material-ui/core'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    maxWidth: '800px',
    padding: '22px',
    margin: '15px auto'
  },

  header: {
    flex: '0 0 100%',
    margin: '15px 0'
  },

  formField: {
    minWidth: '250px',
    margin: '3px 10px',
    flex: '1',

    [theme.breakpoints.down('xs')]: {
      margin: '3px 0',
      flex: '0 0 100%',
      minWidth: 'auto'
    }
  },
  
  formFull: {
    flex: '0 0 100%',
    margin: '10px 0'
  }
})

interface FormComponent<T> {
  readonly type: string
  valueholder?: T // just used for fancy type casting
}

interface TextFieldComponent extends FormComponent<string> {
  readonly label: string,
  readonly autoComplete?: string,
  readonly required?: boolean,
  readonly dataType?: string
}

interface CheckboxsComponent extends FormComponent<string[]> {
  readonly values: string[] 
}

interface SubmitComponent extends FormComponent<void> {
  readonly label: string
}

type HeaderVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
interface HeaderComponent extends FormComponent<void> {
  readonly text: string
  readonly variant: HeaderVariant
}

export class Generator {
  static text(label: string, autoComplete?: string, required?: boolean, dataType?: string): TextFieldComponent {
    return { type: 'text', label, autoComplete, required, dataType }
  }

  static checkboxes(...values: string[]): CheckboxsComponent {
    return { type: 'checkboxes', values }
  }

  static submit(label: string = 'submit'): SubmitComponent {
    return { type: 'submit', label }
  }

  static header(text: string, variant: HeaderVariant): HeaderComponent {
    return { type: 'header', text, variant}
  }
}

export type FormConfig = {
  [ id: string ]: FormComponent<any>
}

export type FormData<Config extends FormConfig> = {
  [ id in keyof Config ]: Config[id]['valueholder']
}

export interface FormProps<C extends FormConfig> extends WithStyles<typeof styles> {
  config: C
  onchange?: (data: FormData<C>) => any | void
  onsubmit: (data: FormData<C>) => any | void
}


class Form<C extends FormConfig> extends React.PureComponent<FormProps<C>, FormData<C>> {

  state = {} as FormData<C>

  input(id: keyof C, conf: TextFieldComponent) {
    const props: TextFieldProps = {
      id: id as string,
      label: conf.label,
      className: this.props.classes.formField,
      value: this.state[id] || '',
      required: conf.required,
      autoComplete: conf.autoComplete,
      type: conf.type
    }

    return (
      <TextField
        key={id as string}
        onChange={(event) => this.setState({[id]: event.target.value})}
        {...props}
      />
    )
  }

  toggle = (id: keyof C, value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const original = (this.state[id] as string[] || []).filter(s => s != value)

    if (event.target.checked) {
      this.setState({ [id]: [value, ...original] })
    } else {
      this.setState({ [id]: original })
    }
  }

  checkbox(id: keyof C, index: string, value: string) {
    const checked = (this.state[id] || []).includes(value)
    
    return (
      <FormControlLabel className={this.props.classes.formField} key={`${id}.${index}`}
        control={
          <Checkbox checked={checked} onChange={this.toggle(id, value)} value={value} />
        } label={value}
      />
    )
  }

  submit() {
    if (this.props.onsubmit) {
      this.props.onsubmit(this.state)
    }
  }

  renderComponent(id: keyof C, component: FormComponent<any>) {
    switch (component.type) {
      case 'text':
        return this.input(id, component as TextFieldComponent)
      case 'checkboxes':
        const cc = component as CheckboxsComponent
        return Object.keys(cc.values).map(index => this.checkbox(id, index, cc.values[index as any]))
      case 'header':
        const hc = component as HeaderComponent
        return (<Typography key={id as string} className={this.props.classes.header} variant={hc.variant}>{hc.text}</Typography>)
      case 'submit':
        const sc = component as SubmitComponent
        return (<Button key={id as string} className={this.props.classes.formFull} variant="contained" onClick={() => this.submit()}>{sc.label}</Button>)
    }
  }

  formComponent = (props: any) => (<form {...props}/>)

  render() {
    return (
      <Paper className={this.props.classes.root} component={this.formComponent}>
        { Object.keys(this.props.config).map(k => this.renderComponent(k, this.props.config[k])) }
      </Paper>
    )
  }
}

export default withStyles(styles)(Form)
