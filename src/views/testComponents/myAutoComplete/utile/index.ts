const debounce = (fn: Function, delay: number) => {
  let timer: any = null

  function _executor(...args: any) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  _executor.cancel = () => {
    clearTimeout(timer)
  }

  return _executor
}

export { debounce }
