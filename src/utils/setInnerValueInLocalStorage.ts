function setInnerValueInLocalStorage(
  localStorageValue: { data: {}, isValid: boolean },
  localStorageKey: string,
  isFirstRender: boolean,
  onChangeData: (localStorageValue: { data: {}, isValid: boolean }) => void
){
  if (!isFirstRender) {
    localStorage.setItem(`${localStorageKey}`, JSON.stringify(localStorageValue.data))
    onChangeData(localStorageValue)
  }
}

export default setInnerValueInLocalStorage;