import axios from "src/http/api"
/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 URL 独立成文件，接口分成不同的模块
 */
/**接口处理示例 */

// 排期展示页面的接口
export const ossUpdata = data => {  // 上传oss
  return axios({
    url: '/ticket/file/upload',
    method: 'post',
    data
  })
}

export const getFilmList = params => {  // 后台获取排期首页
  return axios({
    url: '/ticket/plan_display/display_template/list',
    method: 'get',
    params
  })
}

export const terminalList = data => {  // 显示用户下面的终端
  return axios({
    url: '/ticket/plan_display/terminal/page',
    method: 'post',
    data
  })
}

export const openTerminal = data => {  // 切换终端开启状态
  return axios({
    url: '/ticket/plan_display/terminal/active',
    method: 'put',
    data
  })
}

export const saveSwiperSet = data => {  // 保存轮播图的设置
  return axios({
    url: '/ticket/plan_display/display_template/edit',
    method: 'post',
    data
  })
}


export const getSwiperSet = params => {  // 轮播图设置的初始值
  return axios({
    url: '/ticket/plan_display/display_template/detail',
    method: 'get',
    params
  })
}

export const getPhotoList = params => {  // 轮播图的初始值
  return axios({
    url: '/ticket/plan_display/advertise_pic/list',
    method: 'get',
    params
  })
}
export const deletePhoto = data => {  // 删除图片
  return axios({
    url: '/ticket/plan_display/advertise_pic/delete',
    method: 'post',
    data
  })
}

export const getSwiperList = data => {  // 获取轮播图页面的详情
  return axios({
    url: '/ticket-gd/display_template/show',
    method: 'post',
    data
  })
}

export const filmLogin = data => {  // 注册终端
  return axios({
    url: '/ticket-gd/display_terminal/register',
    method: 'post',
    data
  })
}

export const templateDetail = data => {  // 模版的详细
  return axios({
    url: '/ticket-gd/display_template/plan_show',
    method: 'post',
    data
  })
}

export const templateT3Detail = data => {  // 模版的详细
  return axios({
    url: '/ticket-gd/display_template/plan_sho/page',
    method: 'post',
    data
  })
}
export const templatecinemaUid	 = params => {  // 后台模版的详细
  return axios({
    url: '/ticket/plan_display/template/show',
    method: 'get',
    params
  })
}
export default {
  // 排期展示
  ossUpdata,
  getFilmList,
  filmLogin,
  terminalList,
  openTerminal,
  getSwiperList,
  saveSwiperSet,
  getSwiperSet,
  getPhotoList,
  deletePhoto,
  templateDetail,
  templatecinemaUid,
  templateT3Detail
};