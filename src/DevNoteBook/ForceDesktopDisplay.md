如果需要在移动端强制显示桌面端样式（即禁用移动端的自适应/响应式布局），可以通过以下方法实现：

---

### **方法一：禁用视口缩放（最常用）**
在HTML的`<head>`中添加以下meta标签：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**关键参数**：
- `width=device-width`：强制使用设备宽度
- `initial-scale=1.0`：禁用初始缩放
- `user-scalable=no`：禁止用户手动缩放

---

### **方法二：固定布局宽度**
```css
body {
  width: 1200px !important; /* 桌面端设计稿宽度 */
  min-width: 1200px;
  margin: 0 auto;
  overflow-x: auto; /* 允许横向滚动 */
}
```

---

### **方法三：全局禁止媒体查询**
在CSS中覆盖所有响应式断点：
```css
@media (max-width: 768px) {
  /* 强制保持桌面样式 */
  body, .container, [class*="col-"] {
    width: 100% !important;
    float: none !important;
    margin: 0 !important;
    max-width: none !important;
  }
}
```

---

### **方法四：JavaScript强制桌面模式**
```javascript
// 阻止触摸事件和缩放
document.addEventListener('touchstart', function(e) {
  e.preventDefault();
}, { passive: false });

// 锁定视口
const viewportMeta = document.createElement('meta');
viewportMeta.name = 'viewport';
viewportMeta.content = 'width=1200, user-scalable=no';
document.head.appendChild(viewportMeta);
```

---

### **方法五：服务器端识别并返回桌面版**
通过User-Agent判断，始终返回桌面端HTML：
```php
<?php
// PHP示例
$userAgent = $_SERVER['HTTP_USER_AGENT'];
if(preg_match('/(android|iphone|ipad)/i', $userAgent)) {
  // 仍返回桌面版模板
  include('desktop-template.html');
}
?>
```

---

### **注意事项**
1. **移动端体验问题**：
    - 用户需要手动缩放/横向滚动才能查看内容
    - 可能违反Google的移动端友好准则

2. **兼容性建议**：
   ```css
   /* 保证表格等元素不换行 */
   table, div, section {
     white-space: nowrap !important;
   }
   ```

3. **选择性禁用响应式**（推荐折中方案）：
   ```css
   /* 仅在超大屏和小屏保持桌面样式 */
   @media (max-width: 767px), (min-width: 1200px) {
     .container { width: 1170px !important; }
   }
   ```

---

### **最佳实践建议**
如果必须保持桌面样式，建议：
1. 添加明显的横向滚动提示
2. 关键交互元素（如按钮）保持最小48x48px触摸尺寸
3. 在移动端显示提示条：
   ```html
   <div class="mobile-alert" style="display:none;">
     建议横屏浏览以获得最佳体验
   </div>
   <script>
     if(/Mobi/.test(navigator.userAgent)) {
       document.querySelector('.mobile-alert').style.display = 'block';
     }
   </script>
   ```

通过以上方法，可以强制移动端显示桌面样式，但需权衡用户体验与设计一致性。