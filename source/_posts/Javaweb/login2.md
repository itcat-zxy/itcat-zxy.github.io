---
title: 登录(二) -- 过滤器，拦截器
tags:
  - java
  - filter
  - interceptor
category: filter
keywords: 'Java,jwt'
description: 登录的请求过滤器，拦截器
cover: 'https://cdn.staticaly.com/gh/itcat-zxy/Image@main/blog/12.5i5frzm2sg00.jpg'
abbrlink: filter
date: 2023-05-14 20:11:12
top_img:
---



## 1. 登录校验-Filter

### 1.1 分析

使用过滤器Filter来完成 登录校验功能。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230107095010089.jpg)

登录校验的基本流程：

- 要进入到后台管理系统，我们必须先完成登录操作，此时就需要访问登录接口login。
- 登录成功之后，在服务端生成一个JWT令牌，并返回给前端存储。
- 后续的每一次请求都会将JWT令牌携带到服务端，要想去访问对应的业务功能，必须先要校验令牌的有效性。
- 使用登录校验的过滤器，在过滤器当中来校验令牌的有效性。如果令牌存在，并且它是有效的，才会放行去访问对应的web资源，执行相应的业务操作。


1. 所有的请求，拦截到了之后，都需要校验令牌吗？
   - 答案：**登录请求例外**

2. 拦截到请求后，什么情况下才可以放行，执行业务操作？
   - 答案：**有令牌，且令牌校验通过(合法)；否则都返回未登录错误结果**



### 1.2 具体流程

完成登录校验，利用Filter过滤器实现，而Filter过滤器的流程步骤：

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112122130564.jpg) 



基于上面的业务流程，我们分析出具体的操作步骤：

1. 获取请求url
2. 判断请求url中是否包含login，如果包含，说明是登录操作，放行
3. 获取请求头中的令牌（token）
4. 判断令牌是否存在，如果不存在，返回错误结果（未登录）
5. 解析token，如果解析失败，返回错误结果（未登录）
6. 放行



### 1.3 代码实现

分析清楚了以上的问题后，我们就参照接口文档来开发登录功能了，登录接口描述如下：



- 基本信息

```
  请求路径：/login
  
  请求方式：POST
  
  接口描述：该接口用于员工登录Tlias智能学习辅助系统，登录完毕后，系统下发JWT令牌。 
```

- 请求参数

  参数格式：application/json

  参数说明：

  | 名称     | 类型   | 是否必须 | 备注   |
  | -------- | ------ | -------- | ------ |
  | username | string | 必须     | 用户名 |
  | password | string | 必须     | 密码   |

  请求数据样例：

```json
  {
  	"username": "jinyong",
      "password": "123456"
  }
```

- 响应数据

  参数格式：application/json

  参数说明：

  | 名称 | 类型   | 是否必须 | 默认值 | 备注                     |
  | ---- | ------ | -------- | ------ | ------------------------ |
  | code | number | 必须     |        | 响应码, 1 成功 ; 0  失败 |
  | msg  | string | 非必须   |        | 提示信息                 |
  | data | string | 必须     |        | 返回的数据 , jwt令牌     |

  响应数据样例：

```json
  {
    "code": 1,
    "msg": "success",
    "data": "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi6YeR5bq4IiwiaWQiOjEsInVzZXJuYW1lIjoiamlueW9uZyIsImV4cCI6MTY2MjIwNzA0OH0.KkUc_CXJZJ8Dd063eImx4H9Ojfrr6XMJ-yVzaWCVZCo"
  }
```

- 备注说明

  用户登录成功后，系统会自动下发JWT令牌，然后在后续的每次请求中，都需要在请求头header中携带到服务端，请求头的名称为 token ，值为 登录时下发的JWT令牌。

  如果检测到用户未登录，则会返回如下固定错误信息：

```json
  {
  	"code": 0,
  	"msg": "NOT_LOGIN",
  	"data": null
  }
```



## 登录校验过滤器：LoginCheckFilter**

```java
@Slf4j
@WebFilter(urlPatterns = "/*") //拦截所有请求
public class LoginCheckFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        //前置：强制转换为http协议的请求对象、响应对象 （转换原因：要使用子类中特有方法）
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        //1.获取请求url
        String url = request.getRequestURL().toString();
        log.info("请求路径：{}", url); //请求路径：http://localhost:8080/login


        //2.判断请求url中是否包含login，如果包含，说明是登录操作，放行
        if(url.contains("/login")){
            chain.doFilter(request, response);//放行请求
            return;//结束当前方法的执行
        }


        //3.获取请求头中的令牌（token）
        String token = request.getHeader("token");
        log.info("从请求头中获取的令牌：{}",token);


        //4.判断令牌是否存在，如果不存在，返回错误结果（未登录）
        if(!StringUtils.hasLength(token)){
            log.info("Token不存在");

            Result responseResult = Result.error("NOT_LOGIN");
            //把Result对象转换为JSON格式字符串 (fastjson是阿里巴巴提供的用于实现对象和json的转换工具类)
            String json = JSONObject.toJSONString(responseResult);
            response.setContentType("application/json;charset=utf-8");
            //响应
            response.getWriter().write(json);

            return;
        }

        //5.解析token，如果解析失败，返回错误结果（未登录）
        try {
            JwtUtils.parseJWT(token);
        }catch (Exception e){
            log.info("令牌解析失败!");

            Result responseResult = Result.error("NOT_LOGIN");
            //把Result对象转换为JSON格式字符串 (fastjson是阿里巴巴提供的用于实现对象和json的转换工具类)
            String json = JSONObject.toJSONString(responseResult);
            response.setContentType("application/json;charset=utf-8");
            //响应
            response.getWriter().write(json);

            return;
        }

        //6.放行
        chain.doFilter(request, response);

    }
}
```

在上述过滤器的功能实现中，使用到了一个第三方json处理的工具包fastjson。需要引入如下依赖：

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.76</version>
</dependency>
```



重新启动服务来做一个测试：

> 测试前先把之前所编写的测试使用的过滤器，暂时注释掉。直接将@WebFilter注解给注释掉即可。

- 测试1：未登录是否可以访问部门管理页面

  首先关闭浏览器，重新打开浏览器，在地址栏中输入：http://localhost:9528/#/system/dept

  由于用户没有登录，登录校验过滤器返回错误信息，前端页面根据返回的错误信息结果，自动跳转到登录页面了

  ![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230105085212629.jpg)

  

- 测试2：先进行登录操作，再访问部门管理页面

  登录校验成功之后，可以正常访问相关业务操作页面

  
  
  
  
### 2.5.3 登录校验- Interceptor

通过拦截器来完成案例当中的登录校验功能。



登录校验的业务逻辑以及操作步骤 , 和登录校验Filter过滤器当中的逻辑是完全一致的。只需要把这个技术方案由原来的过滤器换成拦截器interceptor。



**登录校验拦截器**

```java
//自定义拦截器
@Component //当前拦截器对象由Spring创建和管理
@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {
    //前置方式
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle .... ");
        //1.获取请求url
        //2.判断请求url中是否包含login，如果包含，说明是登录操作，放行

        //3.获取请求头中的令牌（token）
        String token = request.getHeader("token");
        log.info("从请求头中获取的令牌：{}",token);

        //4.判断令牌是否存在，如果不存在，返回错误结果（未登录）
        if(!StringUtils.hasLength(token)){
            log.info("Token不存在");

            //创建响应结果对象
            Result responseResult = Result.error("NOT_LOGIN");
            //把Result对象转换为JSON格式字符串 (fastjson是阿里巴巴提供的用于实现对象和json的转换工具类)
            String json = JSONObject.toJSONString(responseResult);
            //设置响应头（告知浏览器：响应的数据类型为json、响应的数据编码表为utf-8）
            response.setContentType("application/json;charset=utf-8");
            //响应
            response.getWriter().write(json);

            return false;//不放行
        }

        //5.解析token，如果解析失败，返回错误结果（未登录）
        try {
            JwtUtils.parseJWT(token);
        }catch (Exception e){
            log.info("令牌解析失败!");

            //创建响应结果对象
            Result responseResult = Result.error("NOT_LOGIN");
            //把Result对象转换为JSON格式字符串 (fastjson是阿里巴巴提供的用于实现对象和json的转换工具类)
            String json = JSONObject.toJSONString(responseResult);
            //设置响应头
            response.setContentType("application/json;charset=utf-8");
            //响应
            response.getWriter().write(json);

            return false;
        }

        //6.放行
        return true;
    }
```

**注册配置拦截器**

```java
@Configuration  
public class WebConfig implements WebMvcConfigurer {
    //拦截器对象
    @Autowired
    private LoginCheckInterceptor loginCheckInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
       //注册自定义拦截器对象
        registry.addInterceptor(loginCheckInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/login");
    }
}

```



登录校验的拦截器编写完成后，接下来我们就可以重新启动服务来做一个测试： （**关闭登录校验Filter过滤器**）

- 测试1：未登录是否可以访问部门管理页面

  首先关闭浏览器，重新打开浏览器，在地址栏中输入：http://localhost:9528/#/system/dept

  由于用户没有登录，校验机制返回错误信息，前端页面根据返回的错误信息结果，自动跳转到登录页面了
  
  
  

 
