document.addEventListener('DOMContentLoaded', () => {
  function setHtmlElementHeight() {
    document.documentElement.style.height = `${window.innerHeight}px`
  }
  setHtmlElementHeight()
  window.addEventListener('resize', setHtmlElementHeight)
})
