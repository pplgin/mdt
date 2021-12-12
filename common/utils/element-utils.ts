/**
 * 选中input text内容 并且copy到剪切板
 * @param current
 */
export function selectTextAndCopy(current: HTMLInputElement): boolean {
  try {
    current.focus();
    current.select();
    return document.execCommand('copy');
  } catch {
    return false;
  }
}
/**
 * 清除选中input text内容
 */
export function clearInputSelections(): boolean {
  try {
    // 获取选中
    const selection = window.getSelection();

    if (!selection) return false;
    // 清除选中
    selection.removeAllRanges();
    return true;
  } catch {
    return false;
  }
}
