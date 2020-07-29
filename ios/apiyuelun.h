#include <string>
void CurlInit();
/**
* 发送验证码传入手机号，请求成功后会在手机收到验证码
* @param strphone 手机号
* @return
*/
char* YuelunGetNewConfig(std::string& strResponseData);
char*  YuelunSendPhoneCode(std::string strphone);
/**
* 移动端登录
* @param strphone 登录手机号
* @param strcode 验证码
* @param strplatforminfo 平台
* @param strversion 软件版本号
* @return
*/
std::string YuelunPhoneLogin(std::string strphone, std::string strcode, std::string strplatforminfo, std::string strversion);
/**
* 连接服务器验证信心，下发加速需要使用的数据
* @param strsession_id 用户登录session_id
* @param strgame_id 加速游戏id
* @param strserver_id 加速使用服务器id
* @return
*/
std::string YuelunConnectServer(std::string strsession_id, std::string strgame_id, std::string strserver_id);
/**
* 停止加速的时候，断开加速请求
* @param strsession_id 户登录session_id
* @param strserver_id  加速使用服务器id
* @return
*/
std::string YuelunDisConnectServer(std::string strsession_id, std::string strserver_id);
/**
* 根据需要加速的游戏id，获取游戏路由策略等详情
* @param strsession_id 用户登录session_id
* @param strgame_id    要加速的游戏id
* @param strgame_token  token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
* @return
*/
std::string YuelunGetGameInfoById(std::string strsession_id, std::string strgame_id, std::string strgame_token);
/**
* 获取所有的游戏信息，包括游戏id,游戏名，游戏图标路径，下载路径等
* @param strsession_id 传入用户登录的session_id
* @param strlist_token token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
* @return
*/
std::string YuelunGetAllGameConfig(std::string strsession_id, std::string strlist_token);
/**
* 退出登录
* @param strsession_id 用户登录session_id
* @return
*/
std::string YuelunPhoneLoginout(std::string strsession_id);
/**
* 心跳包检查
* @param strsession_id 用户登录session_id
* @param strgame_id 可以为空，若有加速游戏则传游戏id
* @param strserver_id 可以为空，若有加速游戏则传当前使用服务器id列表
* @return
*/
std::string YuelunCheckHear(std::string strsession_id, std::string strgame_id, std::string strserver_id);
/**
* 获取公告信息
* @param strpages 页码，不传默认第一页
* @param strlimits 页数，不传默认每页10条
* @return
*/
std::string YuelunGetNewsList(std::string strpage, std::string strlimit);
/**
* 获取广告接口
* @return
*/
std::string YuelunGetAdList();
/**
* 修改用户头像，昵称，手机号，修改哪个传哪个，不修改可以为空
* @param strsession_id 用户session_id
* @param strphone_num 用户手机号
* @param strcode 验证码
* @param strusername 要修改的用户名
* @param strhead_png 要修改的的头像图片文件
* @return
*/
std::string YuelunModifyUserInfo(std::string strsession_id,std::string strphome_num,std::string strcode,std::string strusername,std::string strhead_png);

/**
* 获取用户信息接口
* @param strsession_id 用户登录session_id
* @return
*/
std::string YuelunGetUserInfo(std::string strsession_id);
/**
* 获取玩家收藏列表
* @param strsession_id 用户登录session_id
* @return
*/
std::string YuelunGetCollection(std::string strsession_id);
/**
* 更新玩家收藏列表
* @param strsession_id 用户登录session_id
* @param strgameids 收藏游戏ID （1,2,3,4,5）字符串
* @return
*/
std::string YuelunSverCollection(std::string strsession_id, std::string strgameids);
/**
* 玩家意见反馈
* @param strsession_id 用户登录session_id
* @param strcontent 意见反馈内容
* @param strcontact 联系方式
* @return
*/
std::string YuelunSaveFeedBack(std::string strsession_id, std::string strcontent, std::string strconntact);