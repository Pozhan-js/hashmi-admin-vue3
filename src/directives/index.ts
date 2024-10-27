/*
 * @Author: 朽木白
 * @Date: 2023-03-14 11:31:52
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-14 11:46:57
 * @Description: 指令
 */
import { App } from 'vue'
import auth from './modules/auth'
import focus from './modules/focus'
import adaptive from './web/adaptive'
import tooltip from './web/tooltip'

const directivesList: any = {
  // Custom directives
  auth,
  focus,
  adaptive,
  tooltip,
}
const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
