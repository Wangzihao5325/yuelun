package com.yuelun.ylsdk;

import java.security.PublicKey;

public class CApiClient {
    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("apiclient");
    }


    /**
     * A native method that is implemented by the 'native-lib' native library,
     * which is packaged with this application.
     */
    public static native void CurlInit();

    /**
     * 获取app配置信息，协商ip
     * @return
     */
    public static native String YuelunGetNewConfig();
    /**
     * 发送验证码传入手机号，请求成功后会在手机收到验证码
     * @param strphone 手机号
     * @return
     */
    public static native String YuelunSendPhoneCode(String strphone);

    /**
     * 移动端登录
     * @param strphone 登录手机号
     * @param strcode 验证码
     * @param strplatforminfo 平台
     * @param strversion 软件版本号
     * @return
     */
    public static native String YuelunPhoneLogin(String strphone,String strcode,String strplatforminfo,String strversion);

    /**
     * 连接服务器验证信心，下发加速需要使用的数据
     * @param strsession_id 用户登录session_id
     * @param strgame_id 加速游戏id
     * @param strserver_id 加速使用服务器id
     * @return
     */
    public static native String YuelunConnectServer(String strsession_id,String strgame_id,String strserver_id);

    /**
     * 停止加速的时候，断开加速请求
     * @param strsession_id 户登录session_id
     * @param strserver_id  加速使用服务器id
     * @return
     */
    public static native String YuelunDisConnectServer(String strsession_id,String strserver_id);

    /**
     * 根据需要加速的游戏id，获取游戏路由策略等详情
     * @param strsession_id 用户登录session_id
     * @param strgame_id    要加速的游戏id
     * @param strgame_token  token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
     * @return
     */
    public static native String YuelunGetGameInfoById(String strsession_id,String strgame_id,String strgame_token);

    /**
     * 获取所有的游戏信息，包括游戏id,游戏名，游戏图标路径，下载路径等
     * @param strsession_id 传入用户登录的session_id
     * @param strlist_token token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
     * @return
     */
    public static native String YuelunGetAllGameConfig(String strsession_id,String strlist_token);

    /**
     * 退出登录
     * @param strsession_id 用户登录session_id
     * @return
     */
    public static native String YuelunPhoneLoginout(String strsession_id);

    /**
     * 心跳包检查
     * @param strsession_id 用户登录session_id
     * @param strgame_id 可以为空，若有加速游戏则传游戏id
     * @param strserver_id 可以为空，若有加速游戏则传当前使用服务器id列表
     * @return
     */
    public static native String YuelunCheckHear(String strsession_id,String strgame_id,String strserver_id);

    /**
     * 获取公告信息
     * @param strpages 页码，不传默认第一页
     * @param strlimits 页数，不传默认每页10条
     * @return
     */
    public static native String YuelunGetNewsList(String strpages,String strlimits);

    /**
     * 获取广告接口
     * @return
     */
    public static native String YuelunGetAdList();

    /**
     * 修改用户头像，昵称，手机号，修改哪个传哪个，不修改可以为空
     * @param strsession_id 用户session_id
     * @param strphone_num 用户手机号
     * @param strcode 验证码
     * @param strusername 要修改的用户名
     * @param strhead_png 要修改的的头像图片文件
     * @return
     */
    public static native String YuelunModifUserInfo(String strsession_id,String strphone_num,String strcode,String strusername,String strhead_png);

    /**
     * 获取用户信息接口
     * @param strsession_id 用户登录session_id
     * @return
     */
    public static native String YuelunGetUserInfo(String strsession_id);

    /**
     * 获取玩家收藏列表
     * @param strsession_id 用户登录session_id
     * @return
     */
    public static native String YuelunGetCollection(String strsession_id);

    /**
     * 更新玩家收藏列表
     * @param strsession_id 用户登录session_id
     * @param strgameids 收藏游戏ID （1,2,3,4,5）字符串
     * @return
     */
    public static native String YuelunSverCollection(String strsession_id,String strgameids);

    /**
     * 玩家意见反馈
     * @param strsession_id 用户登录session_id
     * @param strcontent 意见反馈内容
     * @param strcontact 联系方式
     * @return
     */
    public static native String YuelunSaveFeedBack(String strsession_id,String strcontent,String strcontact);
    /**
     *搜索游戏接口
     * @param strsession_id 用户登录session_id
     * @param strgame_name  游戏名称
     * @param strtype_name 游戏类型（国内，海外）具体值根据获取游戏列表接口返回字段types传值
     * @param strclassification 游戏分类（国内，海外）具体值根据获取游戏列表接口返回字段classifications传值
     * @return
     */
    public static native String YuelunSearchGamelist(String strsession_id, String strgame_name, String strtype_name, String strclassification);
}
