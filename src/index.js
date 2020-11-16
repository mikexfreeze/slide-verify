/* create by Micheal Xiao 2019/7/19 17:53 */
import SlideVerify from './slide-verify'


const Slide = new SlideVerify({
  elementId: "root",
  onSuccess: () => {console.log("success")},
  onFail: () => {console.log("fail")},
  onRefresh: () => {console.log("refresh")},
})
