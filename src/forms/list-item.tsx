import React, { FunctionComponent } from 'react'
import { Fab, Icon } from '@mui/material'
import * as colors from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { FieldProps, ProvidedFieldProps } from './props'
import { merge } from './merge'

const styles = makeStyles({
  root: {
    display: 'flex',
    marginTop: '12px'
  },

  control: {
    backgroundColor: colors.red[500],
    color: colors.common.white,
    margin: '12px 12px 0 0'
  },

  form: {
    display: 'flex',
    flexFlow: 'row wrap',
    flex: '1'
  }
})

interface ListItemProps extends FieldProps<{[id: string]: any}> {
  onDelete: () => void
  children: JSX.Element[]
}

const ListItem: FunctionComponent<ListItemProps> =
  (props) => {
    const classes = styles(props)

    const update = (value: any, id: string) => {
      const updated = merge(props.value, { [id]: value })
      props.onChange(updated)
    }

    const renderChild = (child: JSX.Element, index: number): JSX.Element | JSX.Element[] | undefined => {
      if (React.isValidElement(child)) {
        const id: string = (child.props as any).id
        const providedProps: ProvidedFieldProps<any> & { key: string } = {
          key: id as string || `__forms__.${index}`,
          value: props.value[id],
          onChange: (data) => update(data, id),
          onSubmit: () => props.onSubmit()
        }

        return React.cloneElement(child, providedProps)
      }
    }

    return (
      <div className={classes.root}>
        <Fab className={classes.control} size="small" onClick={() => props.onDelete()}>
          <Icon>remove</Icon>
        </Fab>
        <div className={classes.form}>{ props.children.map(renderChild) }</div>
      </div>
    )
  }


export default ListItem
