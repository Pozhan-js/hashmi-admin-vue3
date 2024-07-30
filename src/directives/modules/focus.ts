/**
 * v-auth
 * 按钮权限指令
 */
import type { Directive, DirectiveBinding } from 'vue'

const focus: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (el.querySelector('input')) {
      el.querySelector('input')?.focus()
    }
  },
}

export default focus
