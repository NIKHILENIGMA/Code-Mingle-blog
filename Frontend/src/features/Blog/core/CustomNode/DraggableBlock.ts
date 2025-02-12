import { Extension } from '@tiptap/core'
import { NodeView } from '@tiptap/pm/view'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { Plugin } from '@tiptap/pm/state'
import { GripVertical } from 'lucide-react'
import { createRoot } from 'react-dom/client'
import React from 'react'

export interface DraggableBlockOptions {
  dragHandleClass?: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    draggableBlock: {
      toggleDraggable: () => ReturnType
    }
  }
}

const DraggableBlock = Extension.create<DraggableBlockOptions>({
  name: 'draggableBlock',

  draggable: true, 
  addOptions() {
    return {
      dragHandleClass: 'drag-handle',
    }
  },

  addProseMirrorPlugins() {
    let dragging: HTMLElement | null = null

    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            dragstart: (_, event) => {
              if (!(event.target instanceof HTMLElement)) return false

              const dragHandle = event.target.closest(`.${this.options.dragHandleClass}`)
              if (!dragHandle) return false

              const blockElement = dragHandle.closest('[data-type]')
              if (!blockElement) return false

              blockElement.classList.add('opacity-50')
              dragging = blockElement as HTMLElement
              event.dataTransfer?.setData('text', blockElement.getAttribute('data-type') || '')

              return true
            },

            drop: (view, event) => {
              if (!dragging) return false

              event.preventDefault()
              dragging.classList.remove('opacity-50')

              const pos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              })

              if (!pos) return false

              const tr = view.state.tr
              const sourcePos = view.posAtDOM(dragging, 0)
              
              if (sourcePos === null) return false

              const sourceNode = view.state.doc.nodeAt(sourcePos)
              if (!sourceNode) return false

              const from = sourcePos
              const to = from + sourceNode.nodeSize

              tr.delete(from, to)
              tr.insert(pos.pos, sourceNode)
              
              view.dispatch(tr)
              dragging = null

              return true
            },
            
            dragend: () => {
              if (dragging) {
                dragging.classList.remove('opacity-50')
                dragging = null
              }
              return false
            },
          },
        },
      }),
    ]
  },

  addNodeView() {
    return (node: ProseMirrorNode): NodeView => {
      const dom = document.createElement('div')
      dom.setAttribute('data-type', node.type.name)
      dom.className = 'group relative pl-8 hover:bg-gray-50 rounded transition-colors duration-200'

      const dragHandle = document.createElement('div')
      dragHandle.className = `${this.options.dragHandleClass} absolute left-0 top-1/2 -translate-y-1/2 p-2 
        cursor-move opacity-0 group-hover:opacity-100 transition-opacity duration-200
        hover:bg-gray-200 rounded flex items-center justify-center`
      dragHandle.contentEditable = 'false'
      dragHandle.draggable = true

      // Create a container for the Lucide icon
      const iconContainer = document.createElement('div')
      dragHandle.appendChild(iconContainer)

      // Render the Lucide icon using React
      const root = createRoot(iconContainer)
      root.render(React.createElement(GripVertical, { size: 24 }))

      const content = document.createElement('div')
      content.className = 'content py-1'

      dom.appendChild(dragHandle)
      dom.appendChild(content)

      return {
        dom,
        contentDOM: content,
        destroy: () => {
          root.unmount()
        },
      }
    }
  },
})

export default DraggableBlock