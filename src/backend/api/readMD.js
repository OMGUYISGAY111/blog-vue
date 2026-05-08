import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路径配置：根据你的实际目录层级调整 ../ 的数量
const MD_DIR = path.join(__dirname, '../../../public/docs'); 
const OUTPUT_PATH = path.join(__dirname, '../../assets/blogList.json');

async function generate() {
    try {
        const files = await fs.readdir(MD_DIR);
        const list = [];

        for (const file of files) {
            // 只处理 .md 文件
            if (file.endsWith('.md')) {
                const filePath = path.join(MD_DIR, file);
                
                // 获取文件系统状态
                const stats = await fs.stat(filePath);

                console.log(stats.mtime.toLocaleString('zh-CN', { hour12: false }));
                
                list.push({
                    id: file.replace('.md', ''),
                    // 直接用文件名当标题
                    title: file.replace('.md', ''), 
                    // 使用修改日期，格式化为 YYYY-MM-DD
                    date: stats.mtime.toLocaleString('zh-CN', { hour12: false }),
                    // 保留原始时间对象用于精准排序
                    rawDate: stats.mtime 
                });
            }
        }

        // 按修改时间倒序排列（最近修改的排在最前面）
        list.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

        // 写入 JSON
        await fs.writeFile(OUTPUT_PATH, JSON.stringify(list, null, 2));
        
        console.log(`✅ 成功生成！共计 ${list.length} 篇文章。`);
        console.log(list);
    } catch (err) {
        console.error('❌ 生成失败:', err.message);
    }
}

generate();

// getFilesInfo("../../docs");