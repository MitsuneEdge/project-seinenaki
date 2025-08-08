/* src/script/indexOverlayWindow.js */

// 方法1：事件委托（推荐）
document.addEventListener('click', (e) => {
  // 检查点击目标是否是触发元素或其父元素
  const trigger = e.target.closest('.window-trigger');

  if (trigger) {
    e.preventDefault();
    openModal(trigger);
  }

  // 点击遮罩关闭
  if (e.target.id === 'window-overlay') {
    closeModal();
  }
});

// 控制模态窗口
function openModal(triggerElement) {
  const modal = document.getElementById('window-overlay');

  // 计算触发元素位置（可选）
  const rect = triggerElement.getBoundingClientRect();
  const modalContent = modal.querySelector('.window-content');
  modalContent.style.top = `${rect.top}px`;

  // 显示模态
  modal.classList.remove('modal-hidden');
  modal.classList.add('modal-visible');
}

function closeModal() {
  document.getElementById('window-overlay').classList.add('modal-hidden');
}

// 初始化
document.addEventListener('DOMContentLoaded', bindTriggers);