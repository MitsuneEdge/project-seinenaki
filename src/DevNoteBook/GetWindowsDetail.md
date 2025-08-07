要获取当前浏览器窗口的显示尺寸（即可视区域大小），可以使用以下 JavaScript 方法：

---

### **1. 获取视口（viewport）尺寸**
#### 方法一：`window.innerWidth` 和 `window.innerHeight`
```javascript
// 当前浏览器可视区域的宽高（单位：像素）
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

console.log(`视口宽度: ${viewportWidth}px, 高度: ${viewportHeight}px`);
```

#### 方法二：`document.documentElement.clientWidth/Height`
```javascript
// 不包含滚动条的视口尺寸
const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
```

---

### **2. 获取屏幕分辨率**
```javascript
// 用户显示器的总分辨率（非浏览器窗口）
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
```

---

### **3. 响应式监听窗口变化**
```javascript
// 实时监听窗口尺寸变化
window.addEventListener('resize', () => {
  console.log(`新视口尺寸: ${window.innerWidth}x${window.innerHeight}`);
});

// 初始获取
console.log(`初始尺寸: ${window.innerWidth}x${window.innerHeight}`);
```

---

### **4. 完整示例（含防抖优化）**
```html
<!DOCTYPE html>
<html>
<body>
  <div id="size-display">正在检测浏览器尺寸...</div>

  <script>
    // 防抖函数（避免频繁触发）
    function debounce(func, delay) {
      let timeout;
      return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
      };
    }

    // 更新尺寸显示
    function updateSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      document.getElementById('size-display').innerHTML = `
        浏览器视口: ${width} × ${height}px<br>
        屏幕分辨率: ${window.screen.width} × ${window.screen.height}px
      `;
    }

    // 初始检测+监听变化
    updateSize();
    window.addEventListener('resize', debounce(updateSize, 200));
  </script>
</body>
</html>
```

---

### **5. 不同场景的尺寸获取对比**
| 属性/方法                     | 获取内容                  | 是否包含滚动条 | 典型用途               |
|-------------------------------|--------------------------|----------------|------------------------|
| `window.innerWidth/Height`    | 浏览器可视区域            | 包含           | 响应式布局             |
| `document.documentElement.clientWidth/Height` | 可视区域      | 不包含         | 精确布局计算           |
| `window.screen.width/height`  | 物理屏幕分辨率            | -              | 设备检测               |
| `window.outerWidth/Height`    | 浏览器窗口外尺寸（含工具栏）| -              | 浏览器窗口控制         |

---

### **6. CSS 媒体查询联动**
```css
/* 根据JS获取的尺寸添加CSS类 */
@media (max-width: 768px) {
  body::before {
    content: "当前是移动端布局";
    display: block;
    background: yellow;
  }
}
```

---

### **注意事项**
1. **移动端区别**：
    - 部分移动浏览器会因地址栏/工具栏影响 `innerHeight`
    - 可用 `visualViewport` API 获取更精确值：
      ```javascript
      const visualViewport = window.visualViewport;
      console.log(visualViewport.width, visualViewport.height);
      ```

2. **SSR/SSG 场景**：
    - 在服务端渲染时（如Next.js），需要通过 `useEffect` 获取：
      ```javascript
      useEffect(() => {
        const width = window.innerWidth;
        // ...
      }, []);
      ```

3. **单位选择建议**：
    - 布局优先使用 `vw/vh` 单位
    - 精确控制用 `px` + JS 检测

---

通过以上方法，你可以准确获取并响应浏览器显示尺寸的变化，实现真正的自适应布局。