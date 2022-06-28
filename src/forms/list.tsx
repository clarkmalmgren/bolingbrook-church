import React, { FunctionComponent } from 'react'
import { Paper, Fab, Typography, Icon } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FieldProps, partial } from './props'
import { mergeArray } from './merge'
import ListItem from './list-item'

const styles = makeStyles({
  root: {
    flex: '100%',
    display: 'flex',
    flexFlow: 'column',
    margin: '20px 0',
    padding: '12px'
  },

  header: {
    display: 'flex',
    flexFlow: 'row',

    "& .text": { flex: "1 0" }
  }
})

interface ListProps extends FieldProps<any[]> {
  title: string
  children: JSX.Element[]
}

const List: FunctionComponent<ListProps> =
  (props) => {
    const classes = styles(props)

    const add = () => {
      props.onChange(props.value ? [...props.value, {}] : [{}])
    }

    const remove = (index: number) => {
      const updated = mergeArray(props.value)
      updated.splice(index, 1)
      props.onChange(updated)
    }

    const update = (value: any, index: number) => {
      const updated = mergeArray(props.value, {[index]: value})
      props.onChange(updated)
    }

    const renderChild = (value: any, index: number) => (
      <ListItem
        id={`${index}`}
        key={index}
        children={props.children}
        onChange={(updated) => update(updated, index)}
        onSubmit={() => props.onSubmit()}
        onDelete={() => remove(index)}
        value={value}
      />
    )

    return (
      <Paper key={props.id} className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h5" className="text">{props.title}</Typography>
          <Fab className="fab" size="small" color="primary" onClick={add}><Icon>add</Icon></Fab>
        </div>
        { (props.value || []).map(renderChild) }
      </Paper>
    )
  }

export default partial(List)
