import type { App } from 'vue';
import MarkdownRender from '../components/mainframe/article/comp/MarkdownRender.vue'; // 从组件文件夹导入

export default {
  install(app: App) {
    // 将这个组件注册为全局可用
    app.component('MarkdownRender', MarkdownRender);
  }
};