export function checkMobile(): boolean{
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    return true
  }else{
    // false for not mobile device
    return false
  }
}

export function getRandomNumberByRange(start: number, end: number) {
  return Math.round(Math.random() * (end - start) + start)
}


export function addClass(tag: { classList: { add: (arg0: any) => void; }; }, className: string) {
  tag.classList.add(className)
}

export function removeClass(tag: { classList: { remove: (arg0: any) => void; }; }, className: string) {
  tag.classList.remove(className)
}