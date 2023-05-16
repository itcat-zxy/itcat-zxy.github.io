---
title: 登录(一) -- JWT
tags:
  - java
  - jwt
category: jwt
keywords: 'Java,jwt'
description: 登陆功能实现
cover: 'https://cdn.staticaly.com/gh/itcat-zxy/Image@main/blog/3420AD85DF7083E86AC1AC1D6E18BDEE.jpg'
abbrlink: jwt1
date: 2023-05-14 20:11:12
top_img:
---


# 案例-登录认证

登录认证。用户必须登录之后，才可以访问后台系统中的功能。

## 1. 登录功能

### 1.1 需求
![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230105085404855.jpg)

在登录界面中，我们可以输入用户的用户名以及密码，然后点击 "登录" 按钮就要请求服务器，服务端判断用户输入的用户名或者密码是否正确。如果正确，则返回成功结果，前端跳转至系统首页面。



### 1.2 接口文档

我们参照接口文档来开发登录功能

- 基本信息

  ~~~
  请求路径：/login
  
  请求方式：POST
  
  接口描述：该接口用于员工登录Tlias智能学习辅助系统，登录完毕后，系统下发JWT令牌。 
  ~~~

- 请求参数

  参数格式：application/json

  参数说明：

  | 名称     | 类型   | 是否必须 | 备注   |
  | -------- | ------ | -------- | ------ |
  | username | string | 必须     | 用户名 |
  | password | string | 必须     | 密码   |

  请求数据样例：

  ~~~json
  {
  	"username": "jinyong",
      "password": "123456"
  }
  ~~~

- 响应数据

  参数格式：application/json

  参数说明：

  | 名称 | 类型   | 是否必须 | 默认值 | 备注                     | 其他信息 |
  | ---- | ------ | -------- | ------ | ------------------------ | -------- |
  | code | number | 必须     |        | 响应码, 1 成功 ; 0  失败 |          |
  | msg  | string | 非必须   |        | 提示信息                 |          |
  | data | string | 必须     |        | 返回的数据 , jwt令牌     |          |

  响应数据样例：

  ```json
  {
    "code": 1,
    "msg": "success",
    "data": "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi6YeR5bq4IiwiaWQiOjEsInVzZXJuYW1lIjoiamlueW9uZyIsImV4cCI6MTY2MjIwNzA0OH0.KkUc_CXJZJ8Dd063eImx4H9Ojfrr6XMJ-yVzaWCVZCo"
  }
  ```



### 1.3 思路分析

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230105175310401.jpg)

登录服务端的核心逻辑：接收前端请求传递的用户名和密码 ，然后再根据用户名和密码查询用户信息，如果用户信息存在，则说明用户输入的用户名和密码正确。如果查询到的用户不存在，则说明用户输入的用户名和密码错误。



### 1.4 功能开发

**LoginController**

```java
@RestController
public class LoginController {

    @Autowired
    private EmpService empService;

    @PostMapping("/login")
    public Result login(@RequestBody Emp emp){
        Emp e = empService.login(emp);
	    return  e != null ? Result.success():Result.error("用户名或密码错误");
    }
}
```

**EmpService**

```java
public interface EmpService {

    /**
     * 用户登录
     * @param emp
     * @return
     */
    public Emp login(Emp emp);

    //省略其他代码...
}
```

**EmpServiceImpl**

```java
@Slf4j
@Service
public class EmpServiceImpl implements EmpService {
    @Autowired
    private EmpMapper empMapper;

    @Override
    public Emp login(Emp emp) {
        //调用dao层功能：登录
        Emp loginEmp = empMapper.getByUsernameAndPassword(emp);

        //返回查询结果给Controller
        return loginEmp;
    }   
    
    //省略其他代码...
}
```

**EmpMapper**

```java
@Mapper
public interface EmpMapper {

    @Select("select id, username, password, name, gender, image, job, entrydate, dept_id, create_time, update_time " +
            "from emp " +
            "where username=#{username} and password =#{password}")
    public Emp getByUsernameAndPassword(Emp emp);
    
    //省略其他代码...
}
```



### 1.5 测试

功能开发完毕后，我们就可以启动服务，打开postman进行测试了。 

发起POST请求，访问：http://localhost:8080/login

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20220907132229245.jpg) 

postman测试通过了，结合前端工程进行联调测试。



## 2. 登录校验

### 2.1 问题分析

但是当我们在浏览器中新的页面上输入地址：`http://localhost:9528/#/system/dept`，发现没有登录仍然可以进入到后端管理系统页面。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20220907133329021.jpg)



> 而真正的登录功能应该是：登陆后才能访问后端系统页面，不登陆则跳转登陆页面进行登陆。

因为针对于我们当前所开发的部门管理、员工管理以及文件上传等相关接口来说，我们在服务器端并没有做任何的判断，没有去判断用户是否登录了。所以需要登录校验。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230105180811717.jpg)



什么是登录校验？

- 所谓登录校验，指的是我们在服务器端接收到浏览器发送过来的请求之后，首先我们要对请求进行校验。先要校验一下用户登录了没有，如果用户已经登录了，就直接执行对应的业务操作就可以了；如果用户没有登录，此时就不允许他执行相关的业务操作，直接给前端响应一个错误的结果，最终跳转到登录页面，要求他登录成功之后，再来访问对应的数据。

前面在讲解HTTP协议的时候，我们提到HTTP协议是无状态协议。什么又是无状态的协议？

无状态：是每一次请求都是独立的，下一次请求并不会携带上一次请求的数据。而浏览器与服务器之间进行交互，基于HTTP协议也就意味着现在我们通过浏览器来访问了登陆这个接口，实现了登陆的操作，接下来我们在执行其他业务操作时，服务器也并不知道这个员工到底登陆了没有。因为HTTP协议是无状态的，两次请求之间是独立的，所以是无法判断这个员工到底登陆了没有。



![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230105194710533.jpg)

那应该怎么来实现登录校验的操作呢？具体的实现思路可以分为两部分：

1. 在员工登录成功后，需要将用户登录成功的信息存起来，记录用户已经登录成功的标记。
2. 在浏览器发起请求时，需要在服务端进行统一拦截，拦截后进行登录校验。

而统一拦截技术现实方案也有两种：

1. Servlet规范中的Filter过滤器
2. Spring提供的interceptor拦截器





### 2.2 会话技术

#### 2.2.1 会话跟踪

会话跟踪技术有两种：

1. Cookie（客户端会话跟踪技术）
   - 数据存储在客户端浏览器当中
2. Session（服务端会话跟踪技术）
   - 数据存储在储在服务端
3. 令牌技术



#### 2.2.2 会话跟踪方案

##### 2.2.2.1 方案一 - Cookie

cookie 是客户端会话跟踪技术，它是存储在客户端浏览器的，我们使用 cookie 来跟踪会话，我们就可以在浏览器第一次发起请求来请求服务器的时候，我们在服务器端来设置一个cookie。

比如第一次请求了登录接口，登录接口执行完成之后，我们就可以设置一个cookie，在 cookie 当中我们就可以来存储用户相关的一些数据信息。比如我可以在 cookie 当中来存储当前登录用户的用户名，用户的ID。

服务器端在给客户端在响应数据的时候，会**自动**的将 cookie 响应给浏览器，浏览器接收到响应回来的 cookie 之后，会**自动**的将 cookie 的值存储在浏览器本地。接下来在后续的每一次请求当中，都会将浏览器本地所存储的 cookie **自动**地携带到服务端。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112101901417.jpg) 

接下来在服务端我们就可以获取到 cookie 的值。我们可以去判断一下这个 cookie 的值是否存在，如果不存在这个cookie，就说明客户端之前是没有访问登录接口的；如果存在 cookie 的值，就说明客户端之前已经登录完成了。这样我们就可以基于 cookie 在同一次会话的不同请求之间来共享数据。



介绍流程的时候，用了 3 个自动：

- 服务器会 **自动** 的将 cookie 响应给浏览器。

- 浏览器接收到响应回来的数据之后，会 **自动** 的将 cookie 存储在浏览器本地。

- 在后续的请求当中，浏览器会 **自动** 的将 cookie 携带到服务器端。

  

**为什么这一切都是自动化进行的？**

是因为 cookie 它是 HTP 协议当中所支持的技术，而各大浏览器厂商都支持了这一标准。在 HTTP 协议官方给我们提供了一个响应头和请求头：

- 响应头 Set-Cookie ：设置Cookie数据的

- 请求头 Cookie：携带Cookie数据的

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112101804878.jpg) 



**代码测试**

```java
@Slf4j
@RestController
public class SessionController {

    //设置Cookie
    @GetMapping("/c1")
    public Result cookie1(HttpServletResponse response){
        response.addCookie(new Cookie("login_username","itheima")); //设置Cookie/响应Cookie
        return Result.success();
    }
	
    //获取Cookie
    @GetMapping("/c2")
    public Result cookie2(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if(cookie.getName().equals("login_username")){
                System.out.println("login_username: "+cookie.getValue()); //输出name为login_username的cookie
            }
        }
        return Result.success();
    }
}    
```



A. 访问c1接口，设置Cookie，http://localhost:8080/c1

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112105410076.jpg) 

我们可以看到，设置的cookie，通过**响应头Set-Cookie**响应给浏览器，并且浏览器会将Cookie，存储在浏览器端。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112105538131.jpg) 



B. 访问c2接口 http://localhost:8080/c2，此时浏览器会自动的将Cookie携带到服务端，是通过**请求头Cookie**，携带的。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112105658486.jpg) 




**优缺点**

- 优点：HTTP协议中支持的技术（像Set-Cookie 响应头的解析以及 Cookie 请求头数据的携带，都是浏览器自动进行的，是无需我们手动操作的）
- 缺点：
  - 移动端APP(Android、IOS)中无法使用Cookie
  - 不安全，用户可以自己禁用Cookie
  - Cookie不能跨域



##### 2.2.2.2 方案二 - Session

Session存储在服务器端的会话跟踪技术，而 Session 的底层其实就是基于 Cookie 来实现的。

 

**代码测试**

```java
@Slf4j
@RestController
public class SessionController {

    @GetMapping("/s1")
    public Result session1(HttpSession session){
        log.info("HttpSession-s1: {}", session.hashCode());

        session.setAttribute("loginUser", "tom"); //往session中存储数据
        return Result.success();
    }

    @GetMapping("/s2")
    public Result session2(HttpServletRequest request){
        HttpSession session = request.getSession();
        log.info("HttpSession-s2: {}", session.hashCode());

        Object loginUser = session.getAttribute("loginUser"); //从session中获取数据
        log.info("loginUser: {}", loginUser);
        return Result.success(loginUser);
    }
}
```



A. 访问 s1 接口，http://localhost:8080/s1

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112111004447.jpg) 

请求完成之后，在响应头中，就会看到有一个Set-Cookie的响应头，里面响应回来了一个Cookie，就是JSESSIONID，这个就是服务端会话对象 Session 的ID。



B. 访问 s2 接口，http://localhost:8080/s2

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112111137207.jpg) 

接下来，在后续的每次请求时，都会将Cookie的值，携带到服务端，那服务端呢，接收到Cookie之后，会自动的根据JSESSIONID的值，找到对应的会话对象Session。



那经过这两步测试，大家也会看到，在控制台中输出如下日志：

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112111328117.jpg) 

两次请求，获取到的Session会话对象的hashcode是一样的，就说明是同一个会话对象。而且，第一次请求时，往Session会话对象中存储的值，第二次请求时，也获取到了。 那这样，我们就可以通过Session会话对象，在同一个会话的多次请求之间来进行数据共享了。



**优缺点**

- 优点：Session是存储在服务端的，安全
- 缺点：
  - 服务器集群环境下无法直接使用Session
  - 移动端APP(Android、IOS)中无法使用 Cookie
  - 用户可以自己禁用Cookie，Session 也就失效了
  - Cookie不能跨域



##### 2.2.2.3 方案三 - 令牌技术

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230112102022634.jpg) 

通过令牌技术来跟踪会话，在请求登录接口的时候，如果登录成功，我就可以生成一个令牌，令牌就是用户的合法身份凭证。响应数据时，直接将令牌响应给前端。

前端程序接收令牌后，需要将令牌 存储在 cookie 中， 将共享的数据存储在令牌

在后续的每一次请求当中，都将令牌携带到服务端 校验令牌的有效性。

**优缺点**

- 优点：
  - 支持PC端、移动端
  - 解决集群环境下的认证问题
  - 减轻服务器的存储压力（无需在服务器端存储）
- 缺点：需要自己实现（包括令牌的生成、令牌的传递、令牌的校验）


### 2.3 JWT令牌

#### 2.3.1 介绍

JWT全称：JSON Web Token  （官网：https://jwt.io/）

- 定义了用于在通信双方以json数据格式安全的传输信息。由于数字签名的存在，这些信息是可靠的。

  
JWT的组成： （JWT令牌由三个部分组成，三个部分之间使用英文的点来分割）

- 第一部分：Header(头）， 记录令牌类型、签名算法等。 例如：{"alg":"HS256","type":"JWT"}

- 第二部分：Payload(有效载荷），携带一些自定义信息、默认信息等。 例如：{"id":"1","username":"Tom"}

- 第三部分：Signature(签名算法），防止Token被篡改，确保安全性。将header、payload，并加入指定秘钥

  >签名的目的就是为了防jwt令牌被篡改，因为jwt令牌最后一个部分数字签名的存在，所以整个jwt令牌是非常安全可靠的。jwt令牌被篡改了，整个令牌在校验的时候都会失败。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230106085442076.jpg)

> 对Json格式进行 Base64编码：基于64个可打印的字符来表示二进制数据的编码方式。所使用的64个字符分别是A到Z、a到z、 0- 9，一个加号，一个斜杠，加起来就是64个字符。任何数据经过base64编码之后，最终就会通过这64个字符来表示。当然还有一个符号，那就是等号。等号它是一个补位的符号

 

JWT令牌最典型的应用场景就是登录认证：

1. 在浏览器发起请求来执行登录操作，如果登录成功之后，将生成的 jwt令牌返回给前端。
2. 前端拿到jwt令牌之后，会将jwt令牌存储起来。后续的每一次请求中都会将jwt令牌携带到服务端。
3. 服务端统一拦截请求之后，判断请求是否携带令牌，并校验令牌是否是有效。



#### 2.3.2 生成和校验

实现JWT令牌的生成。需要先引入JWT的依赖：

```xml
<!-- JWT依赖-->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

> 在引入完JWT来赖后，就可以调用工具包中提供的API来完成JWT令牌的生成和校验， 工具类：Jwts



生成JWT代码实现：

```java
@Test
public void genJwt(){
    Map<String,Object> claims = new HashMap<>();
    claims.put("id",1);
    claims.put("username","Tom");
    
    String jwt = Jwts.builder()
        .setClaims(claims) //自定义内容(载荷)          
        .signWith(SignatureAlgorithm.HS256, "itheima") //签名算法        
        .setExpiration(new Date(System.currentTimeMillis() + 24*3600*1000)) //有效期   
        .compact();
    
    System.out.println(jwt);
}
```

运行测试方法：

```
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjcyNzI5NzMwfQ.fHi0Ub8npbyt71UqLXDdLyipptLgxBUg_mSuGJtXtBk
```



实现了JWT令牌的生成，使用Java代码来校验JWT令牌(解析生成的令牌)：

```java
@Test
public void parseJwt(){
    Claims claims = Jwts.parser()
        .setSigningKey("jodio")//指定签名密钥（必须保证和生成令牌时使用相同的签名密钥）  
	    .parseClaimsJws("eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjcyNzI5NzMwfQ.fHi0Ub8npbyt71UqLXDdLyipptLgxBUg_mSuGJtXtBk")
        .getBody();
    System.out.println(claims);
}
```

运行测试方法：

```
{id=1, exp=1672729730}
```



继续测试：指定令牌的过期时间，修改为1分钟

```java
@Test
public void genJwt(){
    Map<String,Object> claims = new HashMap<>();
    claims.put("id",1);
    claims.put("username","Tom");
    String jwt = Jwts.builder()
        .setClaims(claims) //自定义内容(载荷)          
        .signWith(SignatureAlgorithm.HS256, "jodio") //签名算法        
        .setExpiration(new Date(System.currentTimeMillis() + 60*1000)) //有效期60秒   
        .compact();
    
    System.out.println(jwt);
    //输出结果：eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjczMDA5NzU0fQ.RcVIR65AkGiax-ID6FjW60eLFH3tPTKdoK7UtE4A1ro
}

@Test
public void parseJwt(){
    Claims claims = Jwts.parser()
        .setSigningKey("jodio")//指定签名密钥
		.parseClaimsJws("eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjczMDA5NzU0fQ.RcVIR65AkGiax-ID6FjW60eLFH3tPTKdoK7UtE4A1ro")
        .getBody();

    System.out.println(claims);
}
```

等待1分钟之后运行测试方法发现也报错了，说明：JWT令牌过期后，令牌就失效了，解析的为非法令牌。



#### 2.3.3 登录下发令牌

1. 生成令牌
   - 在登录成功之后来生成一个JWT令牌，并且把这个令牌直接返回给前端
2. 校验令牌
   - 拦截前端请求，从请求中获取到令牌，对令牌进行解析校验



首先来完成：登录成功之后生成JWT令牌，返回给前端，接口文档说明。

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







**1. JWT工具类 -  放在utils包下**

```java
public class JwtUtils {

    private static String signKey = "itheima";//签名密钥
    private static Long expire = 43200000L; //有效时间

    /**
     * 生成JWT令牌
     * @param claims JWT第二部分负载 payload 中存储的内容
     * @return
     */
    public static String generateJwt(Map<String, Object> claims){
        String jwt = Jwts.builder()
                .addClaims(claims)//自定义信息（有效载荷）
                .signWith(SignatureAlgorithm.HS256, signKey)//签名算法（头部）
                .setExpiration(new Date(System.currentTimeMillis() + expire))//过期时间
                .compact();
        return jwt;
    }

    /**
     * 解析JWT令牌
     * @param jwt JWT令牌
     * @return JWT第二部分负载 payload 中存储的内容
     */
    public static Claims parseJWT(String jwt){
        Claims claims = Jwts.parser()
                .setSigningKey(signKey)//指定签名密钥
                .parseClaimsJws(jwt)//指定令牌Token
                .getBody();
        return claims;
    }
}
```



**2. 登录成功，生成JWT令牌并返回**

```java
@RestController
@Slf4j
public class LoginController {
    //依赖业务层对象
    @Autowired
    private EmpService empService;

    @PostMapping("/login")
    public Result login(@RequestBody Emp emp) {
        //调用业务层：登录功能
        Emp loginEmp = empService.login(emp);

        //判断：登录用户是否存在
        if(loginEmp !=null ){
            //自定义信息
            Map<String , Object> claims = new HashMap<>();
            claims.put("id", loginEmp.getId());
            claims.put("username",loginEmp.getUsername());
            claims.put("name",loginEmp.getName());

            //使用JWT工具类，生成身份令牌
            String token = JwtUtils.generateJwt(claims);
            return Result.success(token);
        }
        return Result.error("用户名或密码错误");
    }
}
```



重启服务，打开postman测试登录接口：

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230106212805480.jpg)

浏览器进行前后端联调：F12网络请求

> 登录请求完成后，F12网络请求，JWT令牌已经响应给了前端，前端将JWT令牌存储在浏览器的 Application 本地存储空间local storage中。

发起一个查询部门数据的请求，请求头中包含 token(JWT令牌)，后续的请求，都会将令牌携带到服务端。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaweb/image-20230106214331443.jpg)



