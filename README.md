[ENGLISH](./README_EN.md)

<h1 align="center">VolumeControl</h1>

<p align="center">
    <a href="https://github.com/jiaming743/audioFft/blob/master/LICENSE"><img src="https://img.shields.io/github/license/jiaming743/audioFft.svg" alt="LICENSE" /> </a>
    <a href="https://www.npmjs.com/package/@jiaminghi/audio-fft"><img src="https://img.shields.io/npm/v/@jiaminghi/audio-fft.svg" alt="LICENSE" /> </a>
</p>
### 基于JS开发的可对音量进度条的拖动（支持手机端）、点击设置音量的插件

- 传入标签ID及设置音量的回调方法来获取设置后的音量值。
- js引入方式则需注掉export default 等导出方法。
- import 引入需使用export 导出使用。

### 使用方法

```html
<body>
    <span class="volume_bar">
        <div id="scrollBar" class="scrollBar">
            <div class="bar"></div>
            <div class="mask"></div>
        </div>
    </span>
</body>
<style>
    //样式不再展示
</style>
<script src="./volumeControl.js" ></script>
<script>
    function getVolumeVal(value){
        console.log('组件设置的值：',value)
    }
    const volumeControl = new VolumeControl("scrollBar",getVolumeVal)
    //设置音量的百分比
    volumeControl.setVolumeVal(50)
</script>
```

![](Demo\image.png)

Demo演示效果请移步Demo文件夹