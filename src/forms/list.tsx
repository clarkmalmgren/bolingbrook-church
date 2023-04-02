import { Box, Fab, Icon, Paper, Typography } from '@mui/material'
import { common, red } from '@mui/material/colors'
import { cloneElement, FunctionComponent, isValidElement, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Range } from '../utils/range'
import { CheckboxesElementType } from './checkboxes'
import { FormElement } from './form'
import { TextFieldElementType } from './text'

type ValidChildTypes = TextFieldElementType | CheckboxesElementType

type ListProps = FormElement<{
  title: string
  children: ValidChildTypes[]
  minLength?: number
}>

export const List: FunctionComponent<ListProps> =
  ({ name, title, children, methods, minLength }) => {
    const [ count, setCount ] = useState(0)
    if (!methods) { throw new Error("Only use List as a direct child of Form or List") }

    function validateAndUpdateLength(updatedLength: number) {
      if (minLength) {
        if (updatedLength < minLength) {
          methods?.setError(`${name}.length`, { type: 'custom', message: `List "${name}" must be at least ${minLength} entry long` })
        } else {
          methods?.clearErrors(`${name}.length`)
        }
      }
      setCount(updatedLength)
    }

    useEffect(() => {
      const length = methods.getValues(name)?.length || 0
      validateAndUpdateLength(length)
    }, [ name, methods ])

    const add = () => {
      validateAndUpdateLength(count + 1)
      setCount(count + 1)
    }

    const remove = (index: number) => {
      // Copy down the elements above the index by one
      const array = methods.getValues(name) as any[]
      array.splice(index, 1)
      methods.setValue(name, array)
      
      // Remove the last item
      validateAndUpdateLength(count - 1)
    }

    const renderChild = (index: number) => (
      <ListItem
        key={`${name}.${index}`}
        prefix={`${name}.${index}`}
        children={children}
        onDelete={() => remove(index)}
        methods={methods}
      />
    )

    return (
      <Paper
        sx={{
          flex: '100%',
          display: 'flex',
          flexFlow: 'column',
          margin: '20px 0',
          padding: '12px'
        }}
      >
        <Box sx={{display: 'flex', flexFlow: 'row'}}>
          <Typography variant="h5" sx={{flex: "1 0"}}>{title}</Typography>
          <Fab className="fab" size="small" color="primary" onClick={add}><Icon>add</Icon></Fab>
        </Box>
        { Range.size(count).map(renderChild) }
      </Paper>
    )
  }
  
type ListItemProps = {
  prefix: string
  onDelete: () => void
  children: ValidChildTypes[]
  methods: UseFormReturn
}
  
const ListItem: FunctionComponent<ListItemProps> =
  ({ prefix, onDelete, children, methods }) => {
    
    const renderChild = (child: ValidChildTypes, index: number): JSX.Element | JSX.Element[] | undefined => {
      if (isValidElement(child)) {
        const prefixedName = `${prefix}.${child.props.name}`
        const prefixedProps = {
          ...child.props,
          name: prefixedName,
          key: prefixedName,
          methods
        }
        return cloneElement(child as any, prefixedProps as any)
      }
    }

    return (
      <Box sx={{display: 'flex', marginTop: '12px'}}>
        <Fab
          sx={{
            backgroundColor: red[500],
            color: common.white,
            margin: '12px 12px 0 0'
          }}
          size="small"
          onClick={onDelete}
        >
          <Icon>remove</Icon>
        </Fab>
        <Box sx={{ display: 'flex', flexFlow: 'row wrap', flex: '1' }}>
          { children.map(renderChild) }
        </Box>
      </Box>
    )
  }
  