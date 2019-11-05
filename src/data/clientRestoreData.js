const clientRestoreData = () => {
  const element = document.getElementById('data')

  if (element && element.textContent) {
    return JSON.parse(element.textContent.replace(/&lt;/g, '<'))
  } else {
    return {}
  }
}

export { clientRestoreData }
