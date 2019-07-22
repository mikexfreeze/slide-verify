/* create by Micheal Xiao 2019/7/19 15:56 */
const Verify = require('./Verify.pug');

export default class SlideVerify {
  init = (elementId) => {
    let conEl = document.getElementById(elementId)
    conEl.innerHTML = Verify({name: 'Timothy'})
  }
}