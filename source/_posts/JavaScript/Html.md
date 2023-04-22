---
title: Html基础
tags:
  - java
  - html
category: html
keywords: 'Java,html'
description: 学习前端 html基础
cover: 'https://cdn.staticaly.com/gh/itcat-zxy/Image@main/blog/k7o551.5o8wx899xvg0.jpg'
abbrlink: html_base
date: 2023-04-22 20:11:12
top_img:
---



> 阶段目标：掌握HTML、CSS常用布局技巧，能够独立制作网页。

# HTML 基础

> 目标：掌握标签基本语法，能够独立布局文章页。


### 核心技术点

* 网页组成

* 排版标签

* 多媒体标签及属性

* 综合案例一 - 个人简介

  ![1680242340931](assets/1680242340931.png)

* 综合案例二 - Vue 简介

  ![1680242362352](assets/1680242362352.png)

  

## 02-标签语法

HTML 超文本标记语言——HyperText Markup Language。 

* 超文本：链接
* 标记：标签，带尖括号的文本

![1680242502155](assets/1680242502155.png)

### 标签结构

* 标签要成对出现，中间包裹内容
* <>里面放英文字母（标签名）
* 结束标签比开始标签多 /
* 标签分类：双标签和单标签

```html
<strong>需要加粗的文字<strong>
<br>
<hr>
```



![1680242555328](assets/1680242555328.png)

## 03-HTML骨架

* html：整个网页
* head：网页头部，用来存放给浏览器看的信息，例如 CSS
  * title：网页标题
* body：网页主体，用来存放给用户看的信息，例如图片、文字

```html
<html>
  <head>
    <title>网页标题</title>
  </head>
  <body>
    网页主体
  </body>
</html>
```

> 提示
>
> VS Code 可以快速生成骨架：在 HTML 文件（.html）中，!（英文）配合 Enter / Tab 键

## 04-标签的关系

> 作用：明确标签的书写位置，让代码格式更整齐

* 父子关系（嵌套关系）：子级标签换行且缩进（Tab键）

  ![1680255766672](assets/1680255766672.png)

* 兄弟关系（并列关系）：兄弟标签换行要对齐

  ![1680255775150](assets/1680255775150.png)

  

## 05-注释

概念：注释是对代码的解释和说明，能够提高程序的可读性，方便理解、查找代码。

注释不会再浏览器中显示。

在 VS Code 中，**添加 / 删除**注释的快捷键：**Ctrl + /** 

```html
<!-- 我是 HTML 注释 -->
```

## 06-标题标签

一般用在新闻标题、文章标题、网页区域名称、产品名称等等。 

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

显示特点：

* 文字加粗
* 字号逐渐减小
* 独占一行（换行）

> 经验
>
> 1. h1 标签在一个网页中只能用一次，用来放新闻标题或网页的 logo
> 2. h2 ~ h6 没有使用次数的限制

## 07-段落标签

一般用在新闻段落、文章段落、产品描述信息等等。 

```html
<p>段落</p>
```

显示特点：

* 独占一行
* 段落之间存在间隙

## 08-换行和水平线

* 换行：br
* 水平线：hr

```html
<br>
<hr>
```

## 09-文本格式化标签

作用：为文本添加特殊格式，以突出重点。常见的文本格式：加粗、倾斜、下划线、删除线等。 

![1680314078647](assets/1680314078647.png)

> 提示：strong、em、ins、del 标签自带强调含义（语义）。 

## 10-图像标签

作用：在网页中插入图片

```html
<img  src="图片的 URL">
```

src用于指定图像的位置和名称，是 <img> 的必须属性。 

### 图像属性

![1680314152822](assets/1680314152822.png)

### 属性语法

* 属性名="属性值"
* 属性写在尖括号里面，标签名后面，标签名和属性之间用空格隔开，不区分先后顺序

![1680314195951](assets/1680314195951.png)

## 11-路径

概念：路径指的是查找文件时，从**起点**到**终点**经历的**路线**。 

路径分类：

* 相对路径：从当前文件位置出发查找目标文件
* 绝对路径：从盘符出发查找目标文件
  * Windows 电脑从盘符出发
  * Mac 电脑从根目录出发

### 相对路径

查找方式：从**当前文件位置**出发查找目标文件

特殊符号：

* **/** 表示进入某个文件夹里面          → 文件夹名/
* **. ** 表示当前文件所在文件夹           → ./
* **..** 表示当前文件的上一级文件夹 → ../   

![1680314322997](assets/1680314322997.png)

### 绝对路径

查找方式：Windows 电脑从盘符出发；Mac 电脑从根目录（/）出发

```html
<img  src="C:\images\mao.jpg">
```

> 提示
>
> 1. Windows 默认是 \ ，其他系统是 /，建议统一写为 / 
> 2. 特殊的绝对路径 → 文件的在线网址：<https://www.itheima.com/images/logo.png> "，应用场景：网页底部**友情链接**

![1680314503056](assets/1680314503056.png)

## 12-超链接标签

作用：点击跳转到其他页面。 

```html
<a href="https://www.baidu.com">跳转到百度</a>
```

**href 属性值是跳转地址，是超链接的必须属性。**

超链接默认是在当前窗口跳转页面，添加 **target="_blank"** 实现**新窗口**打开页面。

拓展：开发初期，不确定跳转地址，则 href 属性值写为 **#**，表示**空链接**，页面不会跳转，在当前页面刷新一次。

```html
<a href="https://www.baidu.com/">跳转到百度</a>

<!-- 跳转到本地文件：相对路径查找 --> 
<!-- target="_blank" 新窗口跳转页面 --> 
<a href="./01-标签的写法.html" target="_blank">跳转到01-标签的写法</a>

<!-- 开发初期，不知道超链接的跳转地址，href属性值写#，表示空链接，不会跳转 -->
<a href="#">空链接</a>
```

## 13-音频

```html
<audio src="音频的 URL"></audio>
```

常用属性

![1680314629860](assets/1680314629860.png)

> 拓展：书写 HTML5 属性时，如果属性名和属性值相同，可以简写为一个单词。 

```html
<!-- 在 HTML5 里面，如果属性名和属性值完全一样，可以简写为一个单词 -->
<audio src="./media/music.mp3" controls loop autoplay></audio>
```

## 14-视频

```html
<video src="视频的 URL"></video>
```

常用属性

![1680314703735](assets/1680314703735.png)

```html
<!-- 在浏览器中，想要自动播放，必须有 muted 属性 -->
<video src="./media/vue.mp4" controls loop muted autoplay></video>
```

## 15-综合案例一-个人简介

> 网页制作思路：从上到下，先整体再局部，逐步分析制作
>
> 分析内容 → 写代码 → 保存 → 刷新浏览器，看效果

![1680314754557](assets/1680314754557.png)

```html
<h1>尤雨溪</h1>
<hr>
<p>尤雨溪，前端框架<a href="../17-综合案例二/vue简介.html">Vue.js</a>的作者，<a href="#">HTML5</a>版Clear的打造人，独立开源开发者。曾就职于Google Creative Labs和Meteor Development Group。由于工作中大量接触开源的项目<a href="#">JavaScript</a>，最后自己也走上了开源之路，现全职开发和维护<a href="#">Vue.js</a>。

</p>
<img src="./photo.jpg" alt="尤雨溪的照片" title="尤雨溪">
<h2>学习经历</h2>
<p>尤雨溪毕业于上海复旦附中，在美国完成大学学业，本科毕业于Colgate University，后在Parsons设计学院获得Design & Technology艺术硕士学位，任职于纽约Google Creative Lab。</p>
<h2>主要成就</h2>
<p>尤雨溪<strong>大学专业并非是计算机专业</strong>，在大学期间他学习专业是室内艺术和艺术史，后来读了美术设计和技术的硕士， <ins>正是在读硕士期间，他偶然接触到了JavaScript ，从此被这门编程语言深深吸引，开启了自己的前端生涯</ins> 。</p>
<p>2014年2月，开发了一个前端开发库Vue.js。Vue.js 是构建 Web 界面的 JavaScript 框架，是一个通过简洁的API提供高效的数据绑定和灵活的组件系统。</p>
<h2>社会任职</h2>
<p>2016年9月3日，在南京的JSConf上，Vue作者尤雨溪正式宣布加盟阿里巴巴Weex团队，尤雨溪称他将以技术顾问的身份加入Weex团队来做 Vue 和 Weex 的 JavaScript runtime 整合，目标是让大家能用 Vue 的语法跨三端。</p>
```

## 16-综合案例二-Vue简介

![1680314805528](assets/1680314805528.png)

```html
<h1>Vue.js</h1>
<p>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式JavaScript框架。 [5] 与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用（SPA）提供驱动。</p>
<p>其作者为<a href="../16-综合案例一/个人简介.html" target="_blank">尤雨溪</a></p>
<h2>主要功能</h2>
<p>Vue.js是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和Vue生态系统支持的库开发的复杂单页应用。</p>
<p>Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。</p>
<p>Vue.js 自身不是一个全能框架——它只聚焦于视图层。因此它非常容易学习，非常容易与其它库或已有项目整合。另一方面，在与相关工具和支持库一起使用时 [2] ，Vue.js 也能驱动复杂的单页应用。</p>
<video src="../media/vue.mp4" controls></video>
```




# 列表、表格、表单

> 目标：掌握嵌套关系标签的写法，使用列表标签布局网页

## 01-列表

作用：布局内容排列整齐的区域。

列表分类：无序列表、有序列表、定义列表。

### 无序列表

作用：布局排列整齐的**不需要规定顺序**的区域。

标签：ul 嵌套 li，ul 是无序列表，li 是列表条目。

```html
<ul>
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
  ……
</ul>
```

> 注意事项：
>
> * ul 标签里面只能包裹 li 标签
> * li 标签里面可以包裹任何内容

### 有序列表

作用：布局排列整齐的**需要规定顺序**的区域。

标签：ol 嵌套 li，ol 是有序列表，li 是列表条目。

```html
<ol>
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
  ……
</ol>
```

> 注意事项：
>
> * ol 标签里面只能包裹 li 标签
> * li 标签里面可以包裹任何内容

### 定义列表

标签：dl 嵌套 dt 和 dd，dl 是定义列表，dt 是定义列表的标题，dd 是定义列表的描述 / 详情。

```html
<dl>
  <dt>列表标题</dt>
  <dd>列表描述 / 详情</dd>
   ……
</dl>
```

![1680315652403](assets/1680315652403.png)

> 注意事项：
>
> * dl 里面只能包含dt 和 dd
> * dt 和 dd 里面可以包含任何内容

## 02-表格

网页中的表格与 Excel 表格类似，用来展示数据。 

![1680315690740](assets/1680315690740.png)

### 基本使用

标签：table 嵌套 tr，tr 嵌套 td / th。 

![1680315704565](assets/1680315704565.png)



> 提示：在网页中，**表格默认没有边框线**，使用 **border 属性**可以为表格添加边框线。 

```html
<table border="1">
  <tr>
    <th>姓名</th>
    <th>语文</th>
    <th>数学</th>
    <th>总分</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>99</td>
    <td>100</td>
    <td>199</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>98</td>
    <td>100</td>
    <td>198</td>
  </tr>
  <tr>
    <td>总结</td>
    <td>全市第一</td>
    <td>全市第一</td>
    <td>全市第一</td>
  </tr>
</table>
```

### 表格结构标签-了解

作用：用表格结构标签把内容划分区域，让表格结构更清晰，语义更清晰。

![1680315774950](assets/1680315774950.png)

> 提示：表格结构标签可以省略。

### 合并单元格

作用：将多个单元格合并成一个单元格，以合并同类信息。 

![1680315812998](assets/1680315821325.png)

合并单元格的步骤：

1. 明确合并的目标
2. 保留**最左最上**的单元格，添加属性（取值是**数字**，表示需要**合并的单元格数量**）
   * **跨行合并**，保留最上单元格，添加属性 **rowspan**
   * **跨列合并**，保留最左单元格，添加属性 **colspan**
3. 删除其他单元格

```html
<table border="1">
  <thead>
    <tr>
      <th>姓名</th>
      <th>语文</th>
      <th>数学</th>
      <th>总分</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>99</td>
      <td rowspan="2">100</td>
      <td>199</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>98</td>
      <!-- <td>100</td> -->
      <td>198</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>总结</td>
      <td colspan="3">全市第一</td>
      <!-- <td>全市第一</td>
      <td>全市第一</td> -->
    </tr>
  </tfoot>
</table>
```

> 注意：不能跨表格结构标签合并单元格（thead、tbody、tfoot）。

## 03-表单

作用：收集用户信息。

使用场景：

* 登录页面
* 注册页面
* 搜索区域

### input 标签

input 标签 type 属性值不同，则功能不同。 

```html
<input type="..." >
```

![1680315984539](assets/1680315984539.png)



### input 标签占位文本 

占位文本：提示信息，文本框和密码框都可以使用。 

```html
<input type="..." placeholder="提示信息">
```

### 单选框

常用属性

![1680316056402](assets/1680316056402.png)



```html
<input type="radio" name="gender" checked> 男
<input type="radio" name="gender"> 女
```

> 提示：name 属性值自定义。

### 上传文件 

默认情况下，文件上传表单控件只能上传一个文件，添加 multiple 属性可以实现文件多选功能。

```html
<input type="file" multiple>
```

### 多选框

多选框也叫复选框，默认选中：checked。

```html
<input type="checkbox" checked> 敲前端代码
```

### 下拉菜单

![1680316175031](assets/1680316175031.png)

标签：select 嵌套 option，select 是下拉菜单整体，option是下拉菜单的每一项。

```html
<select>
  <option>北京</option>
  <option>上海</option>
  <option>广州</option>
  <option>深圳</option>
  <option selected>武汉</option>
</select>
```

> 默认显示第一项，**selected** 属性实现**默认选中**功能。

### 文本域

作用：多行输入文本的表单控件。 

![1680316238194](assets/1680316238194.png)

```html
<textarea>默认提示文字</textarea>
```

> 注意点：
>
> * 实际开发中，使用 CSS 设置 文本域的尺寸
> * 实际开发中，一般禁用右下角的拖拽功能

### label 标签 

作用：网页中，某个标签的说明文本。 

![1680316296894](assets/1680316296894.png)

经验：用 label 标签绑定文字和表单控件的关系，增大表单控件的点击范围。 

![1680316314721](assets/1680316314721.png)

* 写法一
  * label 标签只包裹内容，不包裹表单控件
  * 设置 label 标签的 for 属性值 和表单控件的 id 属性值相同

```html
<input type="radio" id="man">
<label for="man">男</label>
```

* 写法二：使用 label 标签包裹文字和表单控件，不需要属性 

```html
<label><input type="radio"> 女</label>
```

> 提示：支持 label 标签增大点击范围的表单控件：文本框、密码框、上传文件、单选框、多选框、下拉菜单、文本域等等。 

### 按钮

```html
<button type="">按钮</button>
```

![1680316426088](assets/1680316426088.png)



```html
<!-- form 表单区域 -->
<!-- action="" 发送数据的地址 -->
<form action="">
  用户名：<input type="text">
  <br><br>
  密码：<input type="password">
  <br><br>

  <!-- 如果省略 type 属性，功能是 提交 -->
  <button type="submit">提交</button>
  <button type="reset">重置</button>
  <button type="button">普通按钮</button>
</form>
```

> 提示：按钮需配合 form 标签（表单区域）才能实现对应的功能。

## 04-语义化

### 无语义的布局标签 

作用：布局网页（划分网页区域，摆放内容）

* div：独占一行
* span：不换行

```html
<div>div 标签，独占一行</div>
<span>span 标签，不换行</span>
```

### 有语义的布局标签

![1680316535685](assets/1680316535685.png)

## 05-字符实体

![1680316551064](assets/1680316551064.png)

## 06-综合案例一-体育新闻列表 

![1680316581559](assets/1680316581559.png)

```html
<ul>
  <li>
    <img src="./images/1.jpg" alt="">
    <h3>主帅安东尼奥回西班牙休假 国青抵达海口进行隔离</h3>
  </li>
  <li>
    <img src="./images/2.jpg" alt="">
    <h3>梅州主帅：申花有强有力的教练组 球员体能水平高</h3>
  </li>
  <li>
    <img src="./images/3.jpg" alt="">
    <h3>马德兴:00后球员将首登亚洲舞台 调整心态才务实</h3>
  </li>
</ul>
```

## 07-综合案例二-注册信息

![1680316627956](assets/1680316627956.png)

```html
<h1>注册信息</h1>
<form action="">
  <!-- 表单控件 -->
  <!-- 个人信息 -->
  <h2>个人信息</h2>
  <label>姓名：</label><input type="text" placeholder="请输入真实姓名">
  <br><br>
  <label>密码：</label><input type="password" placeholder="请输入密码">
  <br><br>
  <label>确认密码：</label><input type="password" placeholder="请输入确认密码">
  <br><br>
  <label>性别：</label>
  <label><input type="radio" name="gender"> 男</label>
  <label><input type="radio" name="gender" checked> 女</label>
  <br><br>
  <label>居住城市：</label>
  <select>
    <option>北京</option>
    <option>上海</option>
    <option>广州</option>
    <option>深圳</option>
    <option>武汉</option>
  </select>
  <!-- 教育经历 -->
  <h2>教育经历</h2>
  <label>最高学历：</label>
  <select>
    <option>博士</option>
    <option>硕士</option>
    <option>本科</option>
    <option>大专</option>
  </select>
  <br><br>
  <label>学校名称：</label><input type="text">
  <br><br>
  <label>所学专业：</label><input type="text">
  <br><br>
  <label>在校时间：</label>
  <select>
    <option>2015</option>
    <option>2016</option>
    <option>2017</option>
    <option>2018</option>
  </select>
  --
  <select>
    <option>2019</option>
    <option>2020</option>
    <option>2021</option>
    <option>2022</option>
  </select>
  <!-- 工作经历 -->
  <h2>工作经历</h2>
  <label>公司名称：</label><input type="text">
  <br><br>
  <label>工作描述：</label>
  <br>
  <textarea></textarea>
  <br><br>
  <!-- 协议 和 按钮 -->
  <input type="checkbox"><label>已阅读并同意以下协议：</label>
  <ul>
    <li><a href="#">《用户服务协议》</a></li>
    <li><a href="#">《隐私政策》</a></li>
  </ul>
  <br><br>
  <button>免费注册</button>
  <button type="reset">重新填写</button>
</form>
```









