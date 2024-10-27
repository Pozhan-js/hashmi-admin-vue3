import type {
  CSSProperties,
  ObjectDirective,
  DirectiveBinding,
  h,
  render,
} from 'vue'
// import { ElTooltip, ElTag, ElText } from 'element-plus'
// import type { Directive } from 'vue'
// import { QuestionFilled } from '@element-plus/icons-vue'

// const tooltip: Directive = {
//   mounted(el: HTMLElement, binding: DirectiveBinding) {
//     const message = binding.value.message
//     const placement = binding.value.placement || 'top'
//     const effect = binding.value.effect || 'light'
//     const position = binding.value.position || 'left'
//     if (binding.value.message) {
//       const vnode = h(
//         ElTooltip,
//         { content: message, placement, effect },
//         h(QuestionFilled, { style: { width: '16px' } }),
//       )

//       const dom = document.createElement('span')
//       if (position === 'left') el.prepend(dom)
//       else el.append(dom)

//       render(vnode, dom)
//     }
//   },
// }

// const tooltip: Directive = {
//   mounted(el: HTMLElement, binding: DirectiveBinding) {
//     const message = binding.value.message || ''
//     const placement = binding.value.placement || 'top'
//     const effect = binding.value.effect || 'light'

//     // 设置元素样式：文本超出时显示省略号
//     el.style.whiteSpace = 'nowrap'
//     el.style.overflow = 'hidden'
//     el.style.textOverflow = 'ellipsis'

//     // 检测内容是否溢出
//     const isOverflow = () => {
//       return el.scrollWidth > el.clientWidth
//     }

//     // 创建一个函数来显示 Tooltip
//     const showTooltip = () => {
//       // 如果文本内容超出宽度才显示 Tooltip
//       if (isOverflow()) {
//         const vnode = h(
//           ElTooltip,
//           { content: message, placement, effect },
//           h('span', {}, el.innerText),
//         )

//         const dom = document.createElement('span')
//         el.appendChild(dom)
//         render(vnode, dom)
//       }
//     }

//     // 监听鼠标移入事件，显示完整内容
//     el.addEventListener('mouseenter', showTooltip)

//     // 监听鼠标移出事件，移除 Tooltip
//     el.addEventListener('mouseleave', () => {
//       // 移除之前渲染的 Tooltip
//       const dom = el.querySelector('span')
//       if (dom) {
//         unmountComponentAtNode(dom) // 如果你使用 Vue 3 的 render 函数，手动卸载组件
//         dom.remove()
//       }
//     })
//   },
// }

// const tooltip: Directive = {
//   mounted(el: HTMLElement, binding: DirectiveBinding) {
//     const message = binding.value.message || ''
//     const placement = binding.value.placement || 'top'
//     const effect = binding.value.effect || 'light'

//     // 设置元素样式：文本超出时显示省略号
//     el.style.whiteSpace = 'nowrap'
//     el.style.overflow = 'hidden'
//     el.style.textOverflow = 'ellipsis'

//     // 检测内容是否溢出
//     const isOverflow = () => {
//       console.log('超过', el.scrollWidth, el.clientWidth)

//       return el.scrollWidth > el.clientWidth
//     }

//     // 创建一个函数来显示 Tooltip
//     // 创建一个 Tooltip 容器
//     let dom: HTMLElement | null = null

//     // 显示 Tooltip
//     const showTooltip = () => {
//       // 如果文本内容超出宽度才显示 Tooltip
//       if (isOverflow() && !dom) {
//         const vnode = h(
//           ElTooltip,
//           { content: message, placement, effect },
//           {
//             default: () => h('span', {}, el.innerText), // 使用函数形式的插槽
//           },
//         )

//         dom = document.createElement('span')
//         el.appendChild(dom)
//         render(vnode, dom) // 渲染 Tooltip
//       }
//     }
//     // 监听鼠标移入事件，显示完整内容
//     el.addEventListener('mouseenter', showTooltip)

//     // 监听鼠标移出事件，移除 Tooltip
//     el.addEventListener('mouseleave', () => {
//       if (dom) {
//         render(null, dom) // 通过传递 null 卸载渲染的 Tooltip 组件
//         dom.remove() // 移除 DOM 节点
//         dom = null // 释放引用
//       }
//     })
//   },
// }

// const tooltip: Directive = {
//   mounted(el: HTMLElement, binding: DirectiveBinding) {
//     const message = binding.value.message
//     const placement = binding.value.placement || 'left'
//     const effect = binding.value.effect || 'light'
//     const position = binding.value.position || 'left'
//     const text = binding.value.text || 'Tooltip Text' // 默认显示的文本内容

//     //     // 设置元素样式：文本超出时显示省略号

//     if (binding.value.message) {
//       const vnode = h(
//         ElTooltip,
//         { content: message, placement, effect },
//         h('span', { style: { cursor: 'pointer' } }, text), // 显示文本而不是图标
//       )

//       const dom = document.createElement('span')
//       if (position === 'left') el.prepend(dom)
//       else el.append(dom)

//       render(vnode, dom)
//     }
//   },
// }

// directives/tooltip.ts

// let tooltipDom: HTMLElement

// const tooltip: Directive = {
//   mounted(el: HTMLElement, bindings: DirectiveBinding) {
//     bindEvent(el, bindings)
//   },
//   updated(el: HTMLElement, bindings: DirectiveBinding) {
//     bindEvent(el, bindings)
//   },
//   unmounted() {
//     removeTooltip()
//   },
// }

// function bindEvent(el: HTMLElement, bindings: DirectiveBinding) {
//   // 先移除上一次绑定的事件
//   el.removeEventListener('mouseenter', handleMouseEnter)
//   el.removeEventListener('mouseleave', removeTooltip)

//   if (bindings.value === false) {
//     return
//   }
//   // 给当前元素设置超出隐藏
//   el.style.overflow = 'hidden'
//   el.style.textOverflow = 'ellipsis'
//   el.style.whiteSpace = 'nowrap'

//   // 如果超出，绑定鼠标移入移出事件
//   if (el.scrollWidth > el.offsetWidth) {
//     el.addEventListener('mouseenter', handleMouseEnter)
//     // 鼠标移出 将提示信息移除
//     el.addEventListener('mouseleave', removeTooltip)
//   }
// }

// /** 鼠标移入事件 */
// function handleMouseEnter(e) {
//   if (!tooltipDom) {
//     // 创建浮层元素
//     tooltipDom = document.createElement('div')
//     // 将浮层插入到body中
//     document.body.appendChild(tooltipDom)
//   }
//   const maxWidth = 300
//   let cssText = `
//           max-width: ${maxWidth}px;
//           overflow: auto;
//           position: fixed;
//           background: #262627;
//           color: #fff;
//           border-radius: 4px;
//           line-height: 20px;
//           padding: 10px;
//           display: block;
//           font-size: 12px;
//           z-index: 99999;
//           word-break: break-all;
//         `
//   // 根据鼠标移入位置判断浮层位于左侧还是右侧，避免遮挡
//   if (window.innerWidth - e.clientX < maxWidth) {
//     cssText += `right:${window.innerWidth - e.clientX}px;`
//   } else {
//     cssText += `left:${e.clientX + 20}px;`
//   }
//   // 根据鼠标移入位置判断浮层位于上方还是下方，避免遮挡
//   if (window.innerHeight - e.clientY < 600) {
//     cssText += `bottom:${window.innerHeight - e.clientY}px;`
//   } else {
//     cssText += `top:${e.clientY}px;`
//   }

//   tooltipDom.style.cssText = cssText
//   // 浮层中的文字
//   tooltipDom.innerHTML = e.currentTarget.innerText
// }

// function removeTooltip() {
//   // 隐藏浮层
//   if (tooltipDom) {
//     tooltipDom.style.display = 'none'
//   }
// }

interface IValue {
  width?: number
  line?: number
}

interface IOptions {
  [key: string]: CSSProperties
}

const cssProperties: IOptions = {
  single: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  multiple: {
    display: '-webkit-box',
    overflow: 'hidden',
    wordBreak: 'break-all',
  },
}

const tooltip: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<Array<IValue>>) {
    console.log(binding)

    const { value = [100, 2], arg = 'single' } = binding
    const [width, line] = value
    Object.entries(cssProperties[arg]).forEach(([key, value]) => {
      el.style[key] = value
    })
    el.style.width = `${width}px`
    if (arg === 'multiple') {
      el.style.webkitLineClamp = `${line}`
      el.style.webkitBoxOrient = 'vertical'
    }
  },
}

export default tooltip
