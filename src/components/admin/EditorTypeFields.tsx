import { FunctionComponent } from 'react'
import { ButtonEditor } from '../Button.editor'
import { CardEditor } from '../Card.editor'
import { CardListEditor } from '../CardList.editor'
import { HeroEditor } from '../Hero.editor'
import { RichTextEditor } from '../RichText.editor'

const entries = [ ButtonEditor, CardEditor, CardListEditor, HeroEditor, RichTextEditor ]

export const TypeToName: Record<string, string> = {}
export const DropdownAvailableTypes: { value: string; label: string; }[] = []
export const TypeToForm: Record<string, () => JSX.Element> = {}

entries
  .sort((a, b) => a.name.localeCompare(b.name))
  .forEach(({key, name, form}) => {
    TypeToName[key] = name
    DropdownAvailableTypes.push({ value: key, label: name })
    TypeToForm[key] = form
  })


export const TypeSpecificFields: FunctionComponent<{ type: string }> =
  ({ type }) => TypeToForm[type]?.() || null
