
// 使用方法
// let volumeControl = new volumeControl(scrollBarId,"getVoumeVal")
// getVoumeVal 这个函数可监听插件 拖动及点击动作完成后 的数值进行业务处理.
// 注意：new的时候需保证dom节点加载完成，vue可在$nextTick方法中使用new方法。
// setVolumeVal(50) 向控制插件设置音量值（0-100）

//当前方式为导出，全局引入需注掉 尾部的export 
interface VolumeControl{
    scrollBarId:string
    bar:any
    mask:any
    setVolumeCb:any,
    boxWidth:any
}
class VolumeControl{
    constructor(scrollBarId:string,setVolumeCb,){
        //滑动控件整体的ID 里包括bar(滑动控件的标签)，mask(进度条控件)
        this.scrollBarId = scrollBarId
        //bar对象
        this.bar = undefined
        //mask 进度条对象
        this.mask = undefined
        //拖动及点击动作完成后 的回调事件
        this.setVolumeCb = setVolumeCb
        //可拖动或点击的范围长度
        this.boxWidth  = undefined
        this._init()
    }
    _init(){
        let self = this
        var scrollBar:any = document.getElementById(this.scrollBarId);
        var bar:any = scrollBar.children[0];
        var mask:any = scrollBar.children[1];
        let boxWidth = parseInt(<any>(scrollBar.offsetWidth - bar.offsetWidth/2))
        this.bar = bar
        this.mask = mask
        this.boxWidth = boxWidth
        //点击选择
        scrollBar.onmousedown = function (event) {
            event.preventDefault();
            let scrollBarOffsetX:any = event.offsetX
            if (scrollBarOffsetX < 0) {
                scrollBarOffsetX = 0;
            } else if (scrollBarOffsetX > (boxWidth+bar.offsetWidth/2)) {
                scrollBarOffsetX = boxWidth+bar.offsetWidth/2;
            }
            bar.style.left =  scrollBarOffsetX+'px'
            mask.style.width = scrollBarOffsetX+'px' 
            scrollBar.onmouseup = function (e) {
                e.preventDefault();
                scrollBar.onmouseup = null
                //计算点击后的百分比
                let VolumeCountVal = parseInt(<any>(parseInt(scrollBarOffsetX)/(boxWidth+bar.offsetWidth/2)*100))
                //点击离开事件
                VolumeCountVal > 0 && self.setVolumeColor(false)
                //抛出音量值
                self.setVolumeCb(VolumeCountVal)
             }
        }
        //滑动选择 -touch模式
        // bar.onmousedown = function (event) {
        //     event.stopPropagation()
        //     event.preventDefault()
        //     return
        // }
        // bar.addEventListener('touchstart', function (e) {
        //     var ev = e || window.event;
        //     var touch = ev.targetTouches[0];
        //     console.log(ev,touch);
        //     // oL = touch.clientX - bar.offsetLeft;
        //     // oT = touch.clientY - bar.offsetTop;
        //     bar.addEventListener('touchmove', defaultEvent, false)

        // });
        // //阻止默认事件
        // function defaultEvent(e) {
        //     e.preventDefault();
        // }
        // bar.addEventListener('touchmove', function (e) {
        //     var touch = e.targetTouches[0];
        //     bar.style.left =(touch.clientX-15) + 'px';
        //     var documentEvent = event || window.event;
        //     that.style.left = documentEvent.clientX - leftVal + 'px';
        //     var val = parseInt(that.style.left); // 上面初始化过，所以这里可以直接操作行内样式
        //     if (val < 0) {
        //         that.style.left = 0;
        //     }
        //     else if (val > (boxWidth + self.bar.offsetWidth / 2)) {
        //         that.style.left = (boxWidth + self.bar.offsetWidth / 2) + 'px';
        //     }
        //     mask.style.width = that.style.left; //遮盖盒子的宽度
        // });
        // bar.addEventListener('touchend', function () {
            // let barStyleLeft = parseInt(bar.style.left)+''==='NaN'?scrollBar.offsetWidth/2:parseInt(bar.style.left)
        //     var VolumeCountVal = parseInt((barStyleLeft / (boxWidth + bar.offsetWidth / 2) * 100));
        //     //滑动离开事件
        //     //抛出音量值
        //     VolumeCountVal > 0 && self.setVolumeColor(false)
        //     self.setVolumeCb(VolumeCountVal);
        //     document.removeEventListener("touchmove", defaultEvent);
        // });

        //滑动选择-鼠标模式
        bar.onmousedown = function (event) {
            event.stopPropagation();
            var event = event || window.event;
            var leftVal = event.clientX -this.offsetLeft; //考虑多重盒子
            var that = this;
            document.onmousemove = function (event) {
                let documentEvent:any = event || window.event;
                that.style.left = documentEvent.clientX - leftVal + 'px';
                var val = parseInt(that.style.left); // 上面初始化过，所以这里可以直接操作行内样式
                if (val < 0) {
                    that.style.left = 0;
                } else if (val > (boxWidth+self.bar.offsetWidth/2)) {
                    that.style.left = (boxWidth+self.bar.offsetWidth/2)+'px';
                }
                mask.style.width = that.style.left; //遮盖盒子的宽度
            }

            document.onmouseup = function () {
                let VolumeCountVal  = parseInt(<any>(parseInt(that.style.left)/(boxWidth+bar.offsetWidth/2)*100))
                //滑动离开事件
                VolumeCountVal>0&&self.setVolumeColor(false)
                //抛出音量值
                self.setVolumeCb(VolumeCountVal)
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
    //设置音量的值 
    setVolumeVal(value){
        this.bar.style.left =  this.boxWidth/100*value+'px'
        this.mask.style.width = this.boxWidth/100*value+'px' 
    }
    //设置音量柱的颜色
    setVolumeColor(boolean) {
        //false 则设置灰色
        this.mask.style.backgroundColor = boolean ? '#037c57' : '#05FAAF'
    };
}
export default VolumeControl