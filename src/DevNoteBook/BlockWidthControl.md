在网页中实现两个元素按比例（60%/40%）水平排列，可以通过以下方法实现：

---

### **方法一：使用 Flexbox（推荐）**
```html
<div class="container">
  <div class="block block1">左侧60%</div>
  <div class="block block2">右侧40%</div>
</div>

<style>
  .container {
    display: flex; /* 启用弹性布局 */
    width: 720px;  /* 总宽度 */
    height: 200px; /* 可根据需要调整 */
  }
  
  .block {
    box-sizing: border-box; /* 包含padding和border在宽度内 */
    padding: 20px;         /* 可选内边距 */
  }
  
  .block1 {
    flex: 0 0 60%; /* 不伸缩，固定60% */
    background: lightblue;
  }
  
  .block2 {
    flex: 0 0 40%; /* 不伸缩，固定40% */
    background: lightcoral;
  }
</style>
```

**关键点**：
- `flex: 0 0 60%` 表示：
    - `flex-grow: 0`（不拉伸）
    - `flex-shrink: 0`（不收缩）
    - `flex-basis: 60%`（基准宽度）

---

### **方法二：使用 CSS Grid**
```html
<div class="container">
  <div class="block1">左侧60%</div>
  <div class="block2">右侧40%</div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 60% 40%; /* 直接定义列宽比例 */
    width: 720px;
    height: 200px;
  }
  
  .block1 { background: lightblue; }
  .block2 { background: lightcoral; }
</style>
```

**优势**：
- 代码更简洁
- 精确控制比例

---

### **方法三：传统浮动布局（兼容旧浏览器）**
```html
<div class="block1">左侧60%</div>
<div class="block2">右侧40%</div>

<style>
  .block1, .block2 {
    box-sizing: border-box;
    float: left;
    height: 200px;
  }
  
  .block1 {
    width: 60%;
    background: lightblue;
  }
  
  .block2 {
    width: 40%;
    background: lightcoral;
  }
  
  /* 清除浮动 */
  .container::after {
    content: "";
    display: table;
    clear: both;
  }
</style>
```

---

### **响应式适配（可选）**
```css
@media (max-width: 600px) {
  .container {
    flex-direction: column; /* 小屏幕改为垂直堆叠 */
    width: 100%;
  }
  
  .block1, .block2 {
    flex: 0 0 100% !important; /* 强制占满宽度 */
  }
}
```

---

### **效果对比**
| 方法       | 优点                  | 缺点                  |
|------------|-----------------------|-----------------------|
| **Flexbox** | 灵活控制对齐方式        | 旧浏览器支持有限       |
| **Grid**    | 代码简洁，二维布局能力强 | IE支持较差            |
| **Float**   | 兼容性好               | 需要清除浮动，不够灵活 |

---

### **最终推荐方案**
```html
<div class="flex-container">
  <div class="block-60">60%宽度</div>
  <div class="block-40">40%宽度</div>
</div>

<style>
  .flex-container {
    display: flex;
    width: 720px;
    margin: 0 auto; /* 居中显示 */
  }
  
  .block-60 {
    flex: 0 0 calc(720px * 0.6); /* 精确计算像素值 */
    background: lightblue;
  }
  
  .block-40 {
    flex: 0 0 calc(720px * 0.4);
    background: lightcoral;
  }
</style>
```

选择 Flexbox 或 Grid 可根据项目需求和浏览器兼容性决定，现代项目建议优先使用 Grid。