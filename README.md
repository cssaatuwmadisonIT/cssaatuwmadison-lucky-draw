# CSSA at UW-Madison 抽奖平台
供CSSA at UW-Madison内部使用的通用抽奖平台

A generalized lucky draw tool for CSSA at UW-Madison internal use

This is a custom built software based on https://github.com/geekeren/Magpie-LuckyDraw. 

### 支持特性

- [x] 3D标签云显示参与者姓名
- [x] 获奖者不重复中奖
- [x] 奖项编辑：奖项数设置、奖项的编辑以及抽取的出场顺序
- [x] 灾难恢复，意外退出浏览器页面时，二次访问时可以恢复上次抽奖信息
- [x] 支持Windows、Linux、MacOSX、网页端、Docker等多平台

### 待添加
- 重抽功能
> 功能简要：在**非法**的抽奖结果出现后，能以**单机按钮**的形式在**当前奖池**进行新一轮的抽奖
#### 设计思路
- 结构/流程分析
- 按钮/Routehandler设计
- 布局

### 使用

```
git clone https://github.com/cssaatuwmadisonIT/cssaatuwmadison-lucky-draw.git
cd cssaatuwmadison-lucky-draw
yarn install
yarn start
```
- 构建命令：`yarn build`
- 产品环境构建命令：`yarn dist`
- Production build w/ electron: `yarn dist:win` or `yarn dist:mac`

Copyright (C) 2022 Xuxiang Sun (孙旭翔) All Rights Reserved.