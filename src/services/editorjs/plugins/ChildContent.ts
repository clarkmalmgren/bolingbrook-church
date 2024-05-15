import { TypeToName } from '@/components/admin/EditorTypeFields'
import { ContentService } from '@/services/ContentService'
import { StagedContentService } from '@/services/StagedContentService'
import { API, BlockAPI, BlockTool, BlockToolConstructorOptions, ToolboxConfigEntry } from '@editorjs/editorjs'

export type ChildContentData = {
  ref?: string
}

async function appendChildContents(el: HTMLSelectElement, value?: string): Promise<void> {
  const published = await ContentService.onePromise()
  const staged = await StagedContentService.onePromise()

  let empty = document.createElement('option')
  el.appendChild(empty)

  const all = { ...published, ...staged }
  Object.values(all)
    .filter(({ meta }) => meta.type === 'button')
    .sort((a, b) => a.meta.name.localeCompare(b.meta.name))
    .forEach((c) => {
      const o = document.createElement('option')
      o.value = c.meta.id
      o.innerText = `${c.meta.name} (${TypeToName[c.meta.type]})`
      el.appendChild(o)
    })

  el.value = value || ''
}

export class ChildContent implements BlockTool {

  private static cssLoaded: boolean = false
  

  static loadStyles() {
    if (this.cssLoaded) { return }

    const style = document.createElement('style')
    style.innerHTML = styles
    document.head.appendChild(style)

    this.cssLoaded = true
  }

  static get toolbox(): ToolboxConfigEntry {
    return {
      title: 'Child'
    }
  }

  private readonly init?: ChildContentData
  private readonly block?: BlockAPI

  constructor({ data, block }: BlockToolConstructorOptions) {
    this.init = data
    this.block = block
  }

  save(block: HTMLElement): ChildContentData {
    const input = block.querySelector('select') as HTMLSelectElement
    return { ref: input.value || '' }
  }

  render(): HTMLElement {
    ChildContent.loadStyles()

    const outer = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('select')
    
    outer.classList.add('ejsp_cc__outer')
    label.classList.add('ejsp_cc__label')
    input.classList.add('ejsp_cc__input')
    input.onchange = () => this.block?.dispatchChange()

    label.innerText = 'Child Component'
    appendChildContents(input, this.init?.ref)

    outer.appendChild(label)
    outer.appendChild(input)

    return outer
  }

}

const styles = `
.ejsp_cc__outer {
  padding-bottom: 3px;
}

.ejsp_cc__label {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  font-size: 13px;
  display: block;
}

.ejsp_cc__input {
  padding: 4px 0 5px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding-top: 1px;
  padding: 8.5px 14px;
  width: 100%;
}
`
