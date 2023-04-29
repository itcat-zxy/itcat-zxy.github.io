---
title: 盒子模型 & Flex布局
tags:
  - java
category: 布局网页
keywords: 'Java, Flex'
description: 学习前端 javaScript的基础知识
cover: 'https://cdn.staticaly.com/gh/itcat-zxy/Image@main/blog/o3okm7.5l9yyl8i4yc.jpg'
abbrlink: box_flex
date: 2023-04-21 20:11:12
top_img:
---



# 盒子模型

> 目标：掌握盒子模型组成部分，使用盒子模型布局网页区域

## 01-选择器

### 结构伪类选择器 

### 基本使用

作用：根据元素的**结构关系**查找元素。 

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680321408957.jpg)

```css
li:first-child {
  background-color: green;
}
```

### :nth-child(公式) 
![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680321448162.jpg)

> 提示：公式中的n取值从 **0** 开始。 

### 伪元素选择器 

作用：创建**虚拟元素**（伪元素），用来**摆放装饰性的内容**。 

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680321533901.jpg)![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680321544646.jpg)

```css
div::before {
  content: "before 伪元素";
}
div::after {
  content: "after 伪元素";
}
```

注意点：

* 必须设置 **content: ””属性**，用来 设置伪元素的内容，如果没有内容，则**引号留空**即可
* 伪元素默认是**行内**显示模式
* **权重和标签选择器相同**

## 02-PxCook 

PxCook（像素大厨） 是一款切图设计工具软件。支持PSD文件的文字、颜色、距离自动智能识别。

* 开发面板（自动智能识别）
* 设计面板（手动测量尺寸和颜色）

使用方法：创建项目 → 输入 项目名称、项目类型 Web → 单击按钮【创建项目】 → 单击按钮【添加】，导入设计稿 

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680321681695.jpg)

## 03-盒子模型

作用：布局网页，摆放盒子和内容。

### 盒子模型-组成

* 内容区域 – width & height
* 内边距 – padding（出现在内容与盒子边缘之间）
* 边框线 – border 
* 外边距 – margin（出现在盒子外面）

```css
div {
  margin: 50px;
  border: 5px solid brown;
  padding: 20px;
  width: 200px;
  height: 200px;
  background-color: pink;
}
```

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680330928735.jpg)

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680330935635.jpg)



### 边框线

#### 四个方向

属性名：**border**（bd）

属性值：边框线粗细  线条样式  颜色（不区分顺序）

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680330976390.jpg)

```css
div {
  border: 5px solid brown;
  width: 200px;
  height: 200px;
  background-color: pink;
}
```

#### 单方向边框线 

属性名：**border-方位名词**（bd+方位名词首字母，例如，bdl）

属性值：边框线粗细  线条样式  颜色（不区分顺序）

```css
div {
  border-top: 2px solid red;
  border-right: 3px dashed green;
  border-bottom: 4px dotted blue;
  border-left: 5px solid orange;
  width: 200px;
  height: 200px;
  background-color: pink;
}
```

### 内边距 

作用：设置 内容 与 盒子边缘 之间的距离。

* 属性名：padding / padding-方位名词

```css
div {
  /* 四个方向 内边距相同 */
  padding: 30px;
  /* 单独设置一个方向内边距 */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 40px;
  padding-left: 80px;
  width: 200px;
  height: 200px;
  background-color: pink;
}
```

> 提示：添加 padding 会撑大盒子。

* padding 多值写法

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680331118330.jpg)

> 技巧：从**上**开始**顺时针**赋值，当前方向没有数值则与**对面取值相同**。 

### 尺寸计算

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680331322935.jpg)

默认情况：盒子尺寸 = 内容尺寸 + border 尺寸 + 内边距尺寸

结论：给盒子加 border / padding 会撑大盒子

解决：

* 手动做减法，减掉 border / padding 的尺寸
* 內减模式：**box-sizing: border-box**

### 外边距 

作用：拉开两个盒子之间的距离

属性名：**margin**

提示：与 padding 属性值写法、含义相同

### 版心居中

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680331503466.jpg)

左右 margin 值 为 auto（盒子要有宽度）

```css
div {
  margin: 0 auto;
  width: 1000px;
  height: 200px;
  background-color: pink;
}
```

### 清除默认样式 

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680331558304.jpg)

清除标签默认的样式，比如：默认的内外边距。 

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680331580746.jpg)

```css
/* 清除默认内外边距 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* 清除列表项目符号 */
li {
  list-style: none;
}
```

### 元素溢出

作用：控制溢出元素的内容的显示方式。

属性名：**overflow**

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680331623305.jpg)

### 外边距问题

#### 合并现象

场景：**垂直**排列的兄弟元素，上下 **margin** 会**合并**

现象：取两个 margin 中的**较大值生效**

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680331672628.jpg)

```css
.one {
  margin-bottom: 50px;
}
.two {
  margin-top: 20px;
}
```

#### 外边距塌陷

场景：父子级的标签，子级的添加 **上外边距** 会产生**塌陷**问题

现象：**导致父级一起向下移动**

```css
.son {
  margin-top: 50px;
  width: 100px;
  height: 100px;
  background-color: orange;
}
```

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680333860271.jpg)

解决方法：

* 取消子级margin，父级设置padding
* 父级设置 overflow: hidden
* 父级设置 border-top

### 行内元素 – 内外边距问题 

场景：行内元素添加 margin 和 padding，无法改变元素垂直位置

解决方法：给行内元素添加 **line-height** 可以改变垂直位置

```css
span {
  /* margin 和 padding 属性，无法改变垂直位置 */
  margin: 50px;
  padding: 20px;
  /* 行高可以改变垂直位置 */
  line-height: 100px;
}
```

### 圆角

作用：设置元素的外边框为圆角。

属性名：**border-radius**

属性值：数字+px / 百分比

提示：属性值是圆角半径

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680334014390.jpg)



* 多值写法

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680334027657.jpg)

> 技巧：从左上角开始顺时针赋值，当前角没有数值则与对角取值相同。 

* 正圆形状：给正方形盒子设置圆角属性值为 **宽高的一半 / 50%**

```css
img {
  width: 200px;
  height: 200px;
  
  border-radius: 100px;
  border-radius: 50%;
}
```

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680334083567.jpg)

* 胶囊形状：给长方形盒子设置圆角属性值为 盒子高度的一半 

```css
div {
  width: 200px;
  height: 80px;
  background-color: orange;
  border-radius: 40px;
}
```

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680334136242.jpg)

### 盒子阴影（拓展）

作用：给元素设置阴影效果

属性名：**box-shadow**

属性值：X 轴偏移量  Y 轴偏移量  模糊半径  扩散半径  颜色  内外阴影

注意： 

* X 轴偏移量 和 Y 轴偏移量 必须书写
* 默认是外阴影，内阴影需要添加 inset

```css
div {
  width: 200px;
  height: 80px;
  background-color: orange;
  box-shadow: 2px 5px 10px 0 rgba(0, 0, 0, 0.5) inset;
}
```

## 04-综合案例-产品卡片

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680334221212.jpg)

CSS 书写顺序：

1. 盒子模型属性
2. 文字样式
3. 圆角、阴影等修饰属性

### HTML标签

```html
<div class="product">
  <img src="./images/liveSDK.svg" alt="">
  <h4>抖音直播SDK</h4>
  <p>包含抖音直播看播功能</p>
</div>
```



### CSS样式

```html
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f1f1f1;
  }

  .product {
    margin: 50px auto;
    padding-top: 40px;

    width: 270px;
    height: 253px;
    background-color: #fff;
    text-align: center;

    border-radius: 10px;
  }

  .product h4 {
    margin-top: 20px;
    margin-bottom: 12px;
    font-size: 18px;
    color: #333;
    font-weight: 400;
  }

  .product p {
    font-size: 12px;
    color: #555;
  }
</style>
```

## 05-综合案例二 – 新闻列表 



![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680334329887.jpg)



### 整体布局

```html
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.news {
  margin: 100px auto;
  width: 360px;
  height: 200px;
  /* background-color: pink; */
}
</style>

<div class="news"></div>
```

### 标题区域

```html
<style>
.news .hd {
  height: 34px;
  background-color: #eee;
  border: 1px solid #dbdee1;
  border-left: 0;
}

.news .hd a {
  /* -1 盒子向上移动 */
  margin-top: -1px;
  display: block;
  border-top: 3px solid #ff8400;
  border-right: 1px solid #dbdee1;
  width: 48px;
  height: 34px;
  background-color: #fff;

  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: #333;
}
</style>

<div class="hd"><a href="#">新闻</a></div>
```

### 内容区域

```html
<style>
.news .bd {
  padding: 5px;
}

.news .bd li {
  padding-left: 15px;
  background-image: url(./images/square.png);
  background-repeat: no-repeat;
  background-position: 0 center;
}

.news .bd li a {
  padding-left: 20px;
  background: url(./images/img.gif) no-repeat 0 center;

  font-size: 12px;
  color: #666;
  line-height: 24px;
}

.news .bd li a:hover {
  color: #ff8400;
}
</style>

<div class="bd">
  <ul>
    <li><a href="#">点赞“新农人” 温暖的伸手</a></li>
    <li><a href="#">在希望的田野上...</a></li>
    <li><a href="#">“中国天眼”又有新发现 已在《自然》杂志发表</a></li>
    <li><a href="#">急！这个领域，缺人！月薪4万元还不好招！啥情况？</a></li>
    <li><a href="#">G9“带货”背后：亏损面持续扩大，竞争环境激烈</a></li>
    <li><a href="#">多地力推二手房“带押过户”，有什么好处？</a></li>
  </ul>
</div>
```





# Flex布局

> 目标：熟练使用 Flex 完成结构化布局

## 01-标准流

标准流也叫文档流，指的是标签在页面中**默认的排布规则**，例如：块元素独占一行，行内元素可以一行显示多个。 

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680334840709.jpg)

## 02-浮动

### 基本使用

作用：让块元素水平排列。

属性名：**float**

属性值

* **left**：左对齐
* **right**：右对齐

```html
<style>
  /* 特点：顶对齐；具备行内块显示模式特点；浮动的盒子会脱标 */
  .one {
    width: 100px;
    height: 100px;
    background-color: brown;

    float: left;
  }

  .two {
    width: 200px;
    height: 200px;
    background-color: orange;

    /* float: left; */

    float: right;
  }
</style>

<div class="one">one</div>
<div class="two">two</div>
```

特点：

* 浮动后的盒子**顶对齐**
* 浮动后的盒子具备**行内块**特点
* 浮动后的盒子**脱标**，**不占用标准流的位置**

### 产品区域布局

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680335016853.jpg)

#### HTML标签

```html
<!-- 版心：左右，右面：8个产品 → 8个 li -->
<div class="product">
  <div class="left"></div>
  <div class="right">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</div>
```



#### CSS样式

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .product {
    margin: 50px auto;
    width: 1226px;
    height: 628px;
    background-color: pink;
  }

  .left {
    float: left;
    width: 234px;
    height: 628px;
    background-color: skyblue;
  }

  .right {
    float: right;
    width: 978px;
    height: 628px;
    background-color: brown;
  }

  .right li {
    float: left;
    margin-right: 14px;
    margin-bottom: 14px;
    width: 234px;
    height: 300px;
    background-color: orange;
  }

  /* 第四个li和第八个li 去掉右侧的margin */
  .right li:nth-child(4n) {
    margin-right: 0;
  }

  /* 细节：如果父级宽度不够，浮动的盒子会掉下来 */
</style>
```

### 清除浮动

场景：浮动元素会脱标，如果**父级没有高度**，**子级无法撑开父级高度**（可能导致页面布局错乱）

解决方法：**清除浮动**（清除浮动带来的影响）

#### 场景搭建

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680335081694.jpg)

```html
<style>
  .top {
    margin: 10px auto;
    width: 1200px;
    /* height: 300px; */
    background-color: pink;
  }

  .left {
    float: left;
    width: 200px;
    height: 300px;
    background-color: skyblue;
  }

  .right {
    float: right;
    width: 950px;
    height: 300px;
    background-color: orange;
  }

  .bottom {
    height: 100px;
    background-color: brown;
  }

</style>

<div class="top">
  <div class="left"></div>
  <div class="right"></div>
</div>
<div class="bottom"></div>
```

#### 额外标签法

在**父元素内容的最后**添加一个**块级**元素，设置 CSS 属性 **clear: both** 

```html
<style>
.clearfix {
  clear: both;
}
</style>

<div class="father">
  <div class="left"></div>
  <div class="right"></div>
  <div class="clearfix"></div>
</div>
```

#### 单伪元素法

1. 准备 after 伪元素

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

2. 父级使用 clearfix 类

```html
<div class="father clearfix"></div>
```

#### 双伪元素法

1. 准备 after 和 before 伪元素

```css
/* before 解决外边距塌陷问题 */
/* 双伪元素法 */
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}

/* after 清除浮动 */
.clearfix::after {
  clear: both;
}
```

2. 父级使用 clearfix 类

```html
<div class="father clearfix"></div>
```

#### overfow法

```css
.father {
  margin: 10px auto;
  width: 1200px;
  /* height: 300px; */
  background-color: pink;

  overflow: hidden;
}
```

## 03-Flex布局

Flex 布局也叫**弹性布局**，是浏览器**提倡的布局模型**，非常适合**结构化**布局，提供了强大的空间分布和对齐能力。

Flex 模型不会产生浮动布局中脱标现象，布局网页更简单、更灵活。

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680335815005.jpg)

### Flex组成

设置方式：给**父**元素设置 **display: flex**，子元素可以自动挤压或拉伸

组成部分：

* 弹性容器
* 弹性盒子
* 主轴：默认在**水平**方向
* 侧轴 / 交叉轴：默认在**垂直**方向

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680335870554.jpg)

### 主轴对齐方式

属性名：**justify-content**

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680335902526.jpg)

### 侧轴对齐方式

* align-items：当前弹性容器内**所有**弹性盒子的侧轴对齐方式（给**弹性容器**设置）
* align-self：单独控制**某个弹性盒子**的侧轴对齐方式（给**弹性盒子**设置）

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680335957166.jpg)

### 修改主轴方向

**主轴默认在水平方向，侧轴默认在垂直方向**

属性名：**flex-direction**

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680335988425.jpg)

### 弹性伸缩比

作用：控制弹性盒子的主轴方向的尺寸。

属性名：**flex**

属性值：整数数字，表示占用**父级剩余尺寸的份数**。

### 弹性盒子换行

弹性盒子可以自动挤压或拉伸，默认情况下，所有弹性盒子都在一行显示。

属性名：**flex-wrap**

属性值

* wrap：换行
* nowrap：不换行（默认）

### 行内对齐方式

属性名：**align-content** 

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680336183457.jpg)

> 注意：该属性对**单行**弹性盒子模型**无效**。 

## 04-综合案例 – 抖音解决方案 

![](https://cdn.staticaly.com/gh/itcat-zxy/Image@main/javaScript/1680336238340.jpg)

### 整体布局

```html
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

.box {
  margin: 50px auto;
  width: 1200px;
  height: 418px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
</style>

<div class="box"></div>
```

### 列表布局

```html
<style>
.box ul {
  display: flex;
  /* 弹性盒子换行 */
  flex-wrap: wrap;
  /* 调整主轴对齐方式 */
  justify-content: space-between;

  /* 调整 行对齐方式 */
  align-content: space-between;

  padding: 90px 40px 90px 60px;
  height: 418px;
}

.box li {
  display: flex;
  width: 500px;
  height: 88px;
  /* background-color: pink; */
}
</style>

<div class="box">
	<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
</div>
```

### 内容样式

```html
<style>
.box .pic {
  margin-right: 15px;
}

.box .text h4 {
  line-height: 40px;
  font-size: 20px;
  font-weight: 400;
  color: #333;
}

.box .text p {
  font-size: 14px;
  color: #666;
}
</style>

<ul>
  <li>
    <div class="pic">
      <img src="./images/1.svg" alt="">
    </div>
    <div class="text">
      <h4>一键发布多端</h4>
      <p>发布视频到抖音短视频、西瓜视频及今日头条</p>
    </div>
  </li>
  <li>
    <div class="pic">
      <img src="./images/2.svg" alt="">
    </div>
    <div class="text">
      <h4>管理视频内容</h4>
      <p>支持修改已发布稿件状态和实时查询视频审核状态</p>
    </div>
  </li>
  <li>
    <div class="pic">
      <img src="./images/3.svg" alt="">
    </div>
    <div class="text">
      <h4>发布携带组件</h4>
      <p>支持分享内容携带小程序、地理位置信息等组件，扩展内容及突出地域性</p>
    </div>
  </li>
  <li>
    <div class="pic">
      <img src="./images/4.svg" alt="">
    </div>
    <div class="text">
      <h4>数据评估分析</h4>
      <p>获取视频在对应产品内的数据表现、获取抖音热点，及时进行表现评估</p>
    </div>
  </li>
</ul>
```


