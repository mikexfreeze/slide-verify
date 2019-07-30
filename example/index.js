/* create by Micheal Xiao 2019/7/30 10:56 */
import SlideVerify from '../dist/slide-verify'

let Slide = new SlideVerify({
  elementId: "root",
  onSuccess: () => {console.log("success")},
  onFail: () => {console.log("fail")},
  onRefresh: () => {console.log("refresh")},
})
