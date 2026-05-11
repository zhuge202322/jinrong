# 房抵易融 - 移动端贷款超市 WebApp

## 1. Concept & Vision

**房抵易融** 是一个专为微信环境打造的移动端贷款超市平台，为用户提供便捷的贷款产品浏览、分类筛选、产品大纲查看和在线进件申请服务。整体风格专业可信、简洁高效，以金融蓝为主色调，传达安全可靠的品牌感。界面采用卡片式布局，触控友好，信息层次分明，让用户能在最短时间内找到适合自己的贷款产品。


## 2. Design Language

### 色彩系统
| Token | Hex | 用途 |
|---|---|---|
| `--primary` | `#0052D9` | 主色调，品牌蓝 |
| `--primary-light` | `#4A90E2` | 浅蓝，hover状态 |
| `--primary-dark` | `#003AAD` | 深蓝，按下状态 |
| `--accent` | `#F5A623` | 强调色，利率高亮 |
| `--success` | `#52C41A` | 成功/低利率 |
| `--danger` | `#FF4D4F` | 危险/高利率警告 |
| `--bg` | `#F5F7FA` | 页面背景 |
| `--card` | `#FFFFFF` | 卡片背景 |
| `--text-primary` | `#1A1A1A` | 主文本 |
| `--text-secondary` | `#666666` | 次要文本 |
| `--text-muted` | `#999999` | 辅助文本 |
| `--border` | `#E8E8E8` | 边框线 |
| `--shadow` | `rgba(0,82,217,0.08)` | 阴影 |

### 字体
- 主字体：`"PingFang SC", "Helvetica Neue", Helvetica, "Microsoft YaHei", sans-serif`
- 数字/金额：`"DIN Alternate", "Roboto", monospace`

### 圆角
- 卡片：`12px`
- 按钮：`8px`
- 标签：`20px`（胶囊形）
- 输入框：`8px`

### 阴影
- 卡片：`0 2px 12px rgba(0,82,217,0.08)`
- 浮层：`0 8px 32px rgba(0,0,0,0.15)`

### 动效
- 页面切换：slide-in/slide-out, `300ms ease-out`
- 卡片出现：fade-up, `400ms ease-out`, staggered 80ms
- 按钮点击：scale 0.97, `100ms`
- Modal：slide-up from bottom, `300ms cubic-bezier(0.32, 0.72, 0, 1)`
- Tab 切换：underline slide, `200ms ease`
- 微交互：hover scale 1.02, press scale 0.98

### 图标
- 使用 Lucide React 图标库（轻量、React 原生）
- 图标尺寸：20px（紧凑）/ 24px（标准）/ 32px（醒目）

## 3. Layout & Structure

### 页面结构
```
┌─────────────────────────┐
│       状态栏区域         │  safe-area-inset-top
├─────────────────────────┤
│       顶部导航          │  固定定位，高度 56px
│  Logo  |  搜索  |  菜单  │
├─────────────────────────┤
│                         │
│       主体内容区         │  可滚动，弹性布局
│                         │
├─────────────────────────┤
│      底部标签栏         │  固定定位，高度 56px
│  首页 | 热门资讯 | 联系  │
└─────────────────────────┘
```

### 分类标签栏
- 横向可滚动，胶囊形标签
- 默认全部，点击筛选分类
- 分类：公积金、按揭房、学历贷、商户贷、续一贷、大数据

### 产品卡片网格
- 单列卡片布局（移动端最优）
- 每个卡片包含：产品名称、额度范围、利率范围、准入条件、标签、操作按钮
- "拿码进件" 按钮：主色填充
- "产品大纲" 按钮：边框样式

### 响应策略
- 设计基准：375px 宽度（iPhone SE/8）
- 最大宽度：480px（居中显示）
- 使用 CSS `dvh` 和 `safe-area-inset` 适配全面屏
- 微信 webview 特殊处理（底部安全区）

## 4. Features & Interactions

### 首页
- 顶部：Logo + 搜索框 + 菜单入口
- 横幅：推荐产品轮播图（可自动播放）
- 分类标签：横向滚动的分类筛选
- 产品列表：根据分类筛选显示对应产品
- 底部：固定标签栏

### 搜索功能
- 点击搜索框弹出搜索页面
- 支持按产品名称、特点关键词搜索
- 搜索历史记录（本地存储）
- 热门搜索标签推荐

### 产品卡片交互
- 点击卡片展开产品大纲 Modal（全屏底部弹出）
- "拿码进件" 按钮：显示二维码或跳转申请页面
- "产品大纲" 按钮：展开详细大纲
- 长按可分享（微信分享 API）

### 产品大纲 Modal
- 从底部滑入的全屏面板
- 包含：额度、利率、期限、准入条件、所需材料、申请流程
- 点击外部或返回键关闭

### 热门资讯页面
- 贷款知识科普文章列表
- 点击进入文章详情页

### 联系我们页面
- 客服热线（一键拨打）
- 二维码展示
- 微信公众号信息

### 微信特定功能
- 微信 JSSDK 分享（朋友圈/朋友）
- 微信支付占位（未来扩展）
- 微信内置浏览器判断与适配
- ` viewport-fit=cover` + `safe-area-inset` 适配刘海屏

## 5. Component Inventory

### `<Header />`
- Logo + 品牌名称
- 搜索图标按钮
- 汉堡菜单按钮
- 状态：默认 / 搜索激活 / 菜单展开

### `<CategoryTabs />`
- 横向滚动容器
- 分类标签按钮
- 状态：全部 / 各分类激活

### `<ProductCard />`
- 卡片容器（阴影 + 圆角）
- 产品名称（大标题）
- 额度范围（金额高亮）
- 利率范围（颜色编码）
- 标签（最多3个）
- 操作按钮组
- 状态：默认 / 点击 / 加载中

### `<ProductModal />`
- 全屏底部弹出面板
- 标题栏（关闭按钮）
- 详细内容区域
- 操作按钮
- 状态：展开 / 收起

### `<BottomNav />`
- 3个标签项
- 图标 + 文字
- 状态：默认 / 激活

### `<SearchBar />`
- 输入框 + 搜索按钮
- 清除按钮
- 状态：空 / 有内容 / 搜索中

### `<Banner />`
- 图片轮播组件
- 自动播放 + 手动滑动
- 指示器点

## 6. Technical Approach

### 技术栈
- **构建工具**：Vite 6
- **框架**：React 18
- **路由**：React Router DOM v6
- **样式**：CSS Modules + CSS 变量（无需 Tailwind）
- **动画**：CSS Transitions + Framer Motion
- **图标**：Lucide React
- **微信 SDK**：手动封装 JSSDK 调用
- **打包**：Vite 默认配置，输出静态文件

### 路由设计
```
/                 → HomePage
/products/:id     → ProductDetailPage
/news             → NewsPage
/news/:id         → NewsDetailPage
/contact          → ContactPage
/search           → SearchPage
```

### 数据模型
```typescript
interface Product {
  id: string;
  name: string;
  category: 'gjj' | 'ajf' | 'xld' | 'shd' | 'xyd' | 'dsj';
  amountMin: number;      // 最小额度（万）
  amountMax: number;      // 最大额度（万）
  rateMin: number;        // 最低年利率（%）
  rateMax: number;        // 最高年利率（%）
  term: string;           // 期限描述
  tags: string[];         // 特点标签
  conditions: string[];   // 准入条件
  materials: string[];    // 所需材料
  process: string[];      // 申请流程
  threshold: string;      // 准入门槛描述
  bank: string;           // 所属银行
  highlight: string;      // 产品亮点
  applyCode: string;       // 进件码/二维码URL
}

interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  cover?: string;
}
```

### 微信配置
```javascript
wx.config({
  debug: false,
  appId: 'YOUR_APP_ID',
  timestamp: TIMESTAMP,
  nonceStr: 'NONCE_STR',
  signature: 'SIGNATURE',
  jsApiList: [
    'updateAppMessageShareData',  // 自定义分享给朋友
    'updateTimelineShareData',    // 自定义分享到朋友圈
    'scanQRCode',                 // 扫一扫
    'chooseImage',                // 选择图片
  ]
});
```

### 目录结构
```
jinrong/
├── index.html
├── vite.config.js
├── package.json
├── SPEC.md
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── products.js         # 产品数据
    │   └── news.js             # 资讯数据
    ├── components/
    │   ├── Header/
    │   ├── CategoryTabs/
    │   ├── ProductCard/
    │   ├── ProductModal/
    │   ├── BottomNav/
    │   ├── Banner/
    │   └── SearchBar/
    ├── pages/
    │   ├── HomePage/
    │   ├── NewsPage/
    │   ├── NewsDetailPage/
    │   └── ContactPage/
    └── utils/
        ├── wechat.js           # 微信 JSSDK 封装
        └── helpers.js          # 工具函数
```
