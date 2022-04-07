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
### 待添加功能
- 重新抽奖
> 情况：抽奖结果是非法的（不存在、未到场的中奖者）需要重新抽奖
>> 思路：添加一个按钮，设计route handler实现重抽


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