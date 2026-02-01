import http from "@utils/request";
import { UserRuleForm , PhoneCodeForm , PhoneRuleForm } from '@interface/login'
import { ILoginRequest } from "@interface/login";


//图形验证码
export const captchaImage = ( params:{
	key:string
} ):Promise<ArrayBuffer>=>{
	return http.get<ArrayBuffer>('/captcha/image',params,{responseType:'arraybuffer'})
    // return http({
    // 	url:'/captcha/image',
	// 	responseType:'arraybuffer',
	// 	params
    // })
}

//用户登录
export const loginByJson = ( data:UserRuleForm ):Promise<ILoginRequest>=>{
	return http.post<ILoginRequest>('/u/loginByJson',data)
    // return http({
    // 	url:'/u/loginByJson',
    // 	method:'post',
	// 	data
    // })
}

//登录动态验证码
export const loginCaptcha = ( data:PhoneCodeForm ):Promise<ILoginRequest>=>{
	return http.get<ILoginRequest>('/captcha/sendRegisterOrLoginCaptcha',data)
    // return http({
    // 	url:'/captcha/sendRegisterOrLoginCaptcha',
	// 	params:data
    // })
}

//手机验证码登录
export const loginByMobile = ( data:PhoneRuleForm ):Promise<ILoginRequest>=>{
	return http.post<ILoginRequest>('/u/loginByMobile',data)
    // return http({
    // 	url:'/u/loginByMobile',
    // 	method:'post',
	// 	data
    // })
}
