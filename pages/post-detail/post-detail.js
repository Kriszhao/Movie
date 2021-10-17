// pages/post-detail/post-detail.js
import {postList} from '../../data/data';
const app = getApp()

//缓存 localstorage
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postData:{},
    collected:false,
    isPlaying:false,
    _pid:null,
    _postsCollected:{},
    _mgr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData=postList[options.pid];
    this.data._pid=options.pid;
    const postsCollected=wx.getStorageSync('posts_collected');
    this.data._postsCollected = postsCollected;
    let collected=postsCollected[this.data._pid];
    if(collected===undefined){
      //如果是undefined  说明文章从来没被收藏过
      collected=false
    }
    console.log(collected)
    this.setData({
      postData,
      collected,
      isPlaying:this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    // mgr.onPlay(this.onMusicStart)
    // mgr.onStop(this.onMusicStop)
    // mgr.onPause(this.onMusicStop)
  },

  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic && app.gIsPlayingPostId === this.data._pid){
        return true
    }
    return false
  },

  onMusicStart(event){
    const mgr = this.data._mgr
    // mgr.onPlay(()=>{
    //   console.log(123)
    // })
    const music = postList[this.data._pid].music

    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg

    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid
    this.setData({
      isPlaying:true
    })
  },

  onMusicStop(event){
    const mgr = this.data._mgr
    mgr.pause()
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    // 音乐停止 - start
    // 音乐播放 - stop
    this.setData({
      isPlaying:false
    })
  },

  async onShare(event){
    const result = await wx.showActionSheet({
      itemList:['分享到QQ','分享到微信','分享到朋友圈'],
    })
    // console.log(result)
    if(result.tapIndex==0){
      console.log('分享到QQ')
    }
  },

  async onCollect(event){
      const postsCollected = this.data._postsCollected
      wx.getStorageSync('key')
      postsCollected[this.data._pid] = !this.data.collected
      this.setData({
        collected:!this.data.collected
      })
      wx.setStorageSync('posts_collected', postsCollected)
    
    //轻提示
    wx.showToast({
      title: this.data.collected?'收藏成功':'取消收藏',
    })
    //模态对话框
    // const result = await wx.showModal({
    //   title: '是否收藏这篇文章',
    // })
    // if(result.confirm){
    //   const postsCollected = this.data._postsCollected
    //   wx.getStorageSync('key')
    //   postsCollected[this.data._pid] = !this.data.collected
    //   this.setData({
    //     collected:!this.data.collected
    //   })
    //   wx.setStorageSync('posts_collected', postsCollected)
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})