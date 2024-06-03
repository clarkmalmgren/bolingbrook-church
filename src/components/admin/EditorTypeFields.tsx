import { FunctionComponent } from 'react'
import { ButtonEditor } from '../Button.editor'
import { CardEditor } from '../Card.editor'
import { CardListEditor } from '../CardList.editor'
import { FlexEditor } from '../Flex.editor'
import { GridEditor } from '../Grid.editor'
import { HeroEditor } from '../Hero.editor'
import { PageEditor } from '../Page.editor'
import { RichTextEditor } from '../RichText.editor'
import { GraphicSectionEditor } from '../GraphicSection.editor'
import { IframeEditor } from '../Iframe.editor'
import { UserFormEditor } from '../UserForm.editor'
import { SectionEditor } from '../Section.editor'

export type LabeledType = {
  value: string
  label: string
}

const entries = [
  ButtonEditor,
  CardEditor,
  CardListEditor,
  FlexEditor,
  GraphicSectionEditor,
  GridEditor,
  HeroEditor,
  IframeEditor,
  PageEditor,
  RichTextEditor,
  SectionEditor,
  UserFormEditor
]

export const TypeToName: Record<string, string> = {}
export const DropdownAvailableTypes: LabeledType[] = []
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

export function filteredTypes(only?: string[]): LabeledType[] {
  if (typeof only === 'undefined') {
    return DropdownAvailableTypes
  } else {
    return DropdownAvailableTypes.filter(t => only.includes(t.value))
  }
}
