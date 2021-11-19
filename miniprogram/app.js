//app.js
const {
  envList
} = require('envList.js')

import TimerState from './config/timerState'
// import { CLOUD_ENV_ID } from './config'

App({
  onLaunch: async function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      console.log(envList[1].envId)
      wx.cloud.init({
        env: envList[1].envId,
        traceUser: true,
      })
      wx.getSystemInfo({
        success: e => {
          this.globalData.StatusBar = e.statusBarHeight;
          let custom = wx.getMenuButtonBoundingClientRect();
          this.globalData.Custom = custom;
          this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        }
      })

      var openid = wx.getStorageSync('openid');
      if (openid) {
        this.globalData.openid = openid
      } else {
        wx.cloud.callFunction({
          name: 'quickstartFunctions',
          config: {
            env: envList[1].envId
          },
          data: {
            type: 'getOpenId'
          }
        }).then((resp) => {
          this.globalData.openid = resp.result.openid
          wx.setStorageSync('openid', resp.result.openid);
          wx.hideLoading()
        }).catch((e) => {
          console.log(e)
          wx.hideLoading()
        })

      }
      this.updateManager();
      // 如果是2.10.4以上的基础库
      if (wx.getUserProfile) {
        this.globalData.isAuth = await this.hasUserInfo();
        if (this.isAuthCB) {
          this.isAuthCB()
        }
      } else {
        // 获取用户授权信息(旧版获取授权)
        wx.getSetting({
          success: res => {
            this.globalData.isAuth = res.authSetting['scope.userInfo'];
            // 添加回调函数isAuthCB(名字自定义)，有则执行
            if (this.isAuthCB) {
              this.isAuthCB(res)
            }
          }
        })
      }
    }
    this.data = {
      timerId: -1,
      timerState: TimerState.NONE,
      goalId: '',
      goalTitle: '',
      duration: 0,
      beginDate: 0,
      pauseDate: 0,
      pauseDuration: 0
    }

  },
  startTimer(goalId, goalTitle, onCount) {
    const { data } = this
    const { timerState, timerId } = data

    if (timerState === TimerState.NONE) {
      data.goalId = goalId
      data.goalTitle = goalTitle
      data.beginDate = Date.now()
    } else if (timerState === TimerState.PAUSE) {
      data.pauseDuration = data.pauseDuration + (Date.now() - data.pauseDate)
      data.pauseDate = 0
    }

    data.timerState = TimerState.ONGOING

    if (timerId !== -1) {
      clearInterval(timerId)
    }

    const { beginDate, pauseDuration } = data

    data.duration = Date.now() - beginDate - pauseDuration
    onCount(data.duration)
    const newTimerId = setInterval(() => {
      data.duration = Date.now() - beginDate - pauseDuration
      onCount(data.duration)
    }, 1000)
    this.data.timerId = newTimerId
  },

  pauseTimer() {
    this.data.pauseDate = Date.now()
    clearInterval(this.data.timerId)
    this.data.timerId = -1
    this.data.timerState = TimerState.PAUSE
  },

  stopTimer() {
    clearInterval(this.data.timerId)
    this.data.timerId = -1
    this.data.timerState = TimerState.NONE
    this.data.goalId = ''
    this.data.goalTitle = ''
    this.data.duration = 0
    this.data.pauseDuration = 0
    this.data.beginDate = 0
    this.data.pauseDate = 0
  },
  //获取用户授权信息
  hasUserInfo: async function () {
    if (this.globalData.userInfo && this.globalData.userInfo.nickName && this.globalData.userInfo.avatarUrl) return true

    let res = await await wx.cloud.callFunction({
      name: 'get_user'
    })
    let data = res.result.data && res.result.data.length > 0 ? res.result.data[0] : {};
    if (data.nickName && data.avatarUrl) {
      this.globalData.userInfo = data;
      return true
    } else {
      return false
    }
  },
  /**
   * 小程序主动更新
   */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '有新版本',
        content: '新版本已经准备好，即将重启',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },
  globalData: {
    openid: "",
    emoji: '😍',
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ]
  }
})