const isValidImageType = (type: string): boolean => {
  return type === 'NATURE' || type === 'PORTRAIT'
}

export { isValidImageType }
