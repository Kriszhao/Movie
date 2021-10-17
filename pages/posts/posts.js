// pages/posts/posts.js
// var postData=require('../../data/data');
// console.log(postData);

import {postList} from '../../data/data';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList
  },

  /**
   * 生命周期函数--监听页面加载
   *条件渲染  列表渲染
   */
  async onLoad (options) {
    //JSON
    //ES6
    console.log('onload');
    
    // wx.setStorageSync('flag', true);
    // wx.setStorageSync('flag', false);
    // wx.setStorageSync('flag1', 1);
    // wx.clearStorageSync();
    // wx.removeStorageSync('flag');
    //前端的数据库
    //Promise ES7
    //wx.request

    wx.setStorageSync('flag',2);

    const flag=await wx.getStorage({
      key: 'flag'
    })
    console.log(flag)

    this.setData({
      postList
    })
  },

  onGoToDetail(event){
    const pid=event.currentTarget.dataset.postId || event.detail.pid
    console.log(pid)
      wx.navigateTo({
        url: '/pages/post-detail/post-detail?pid='+pid
      })
  },


  onMaxImage(){
    console.log('onmaximage')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide');
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