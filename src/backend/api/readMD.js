import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process'; // 引入子进程模块执行 Git 命令
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AOE_md_date = true;

    //pic
    const urlCur = import.meta.url;
    const pathCur = path.dirname(fileURLToPath(urlCur));
    const picPath = path.join(pathCur,'/../../assets/pic/upload/');


// 路径配置
const MD_DIR = path.join(__dirname, '../../../public/docs'); 
const OUTPUT_PATH = path.join(__dirname, '../../assets/blogList.json');

async function generate() {
    try {
        const files = await fs.readdir(MD_DIR);
        const list = [];

        for (const file of files) {
            if (file.endsWith('.md')) {
                const filePath = path.join(MD_DIR, file);
                
                let fileDate;
                try {
                    // --- 核心修复：获取 Git 记录的最后修改时间 ---
                    // --format=%cI 返回 ISO 8601 格式的时间
                    const gitDateStr = execSync(`git log -1 --format=%cI -- "${filePath}"`).toString().trim();
                    
                    if (gitDateStr) {
                        fileDate = new Date(gitDateStr);
                    } else {
                        // 如果文件从未提交过（本地新建），回退到 fs.stat
                        const stats = await fs.stat(filePath);
                        fileDate = stats.mtime;
                    }
                } catch (e) {
                    // 兜底方案
                    const stats = await fs.stat(filePath);
                    fileDate = stats.mtime;
                }

                list.push({
                    id: file.replace('.md', ''),
                    title: file.replace('.md', ''), 
                    // 强制使用中国时区进行本地化展示
                    date: fileDate.toLocaleString('zh-CN', { 
                        timeZone: 'Asia/Shanghai', 
                        hour12: false 
                    }),
                    // 存储 Date 对象以便排序
                    rawDate: fileDate 
                });

                const mdP = path.join(picPath,file.replace('.md',''));

                await fs.mkdir(mdP, { recursive: true });
            }
        }

        // 按修改时间倒序排列
        list.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

        // 写入 JSON 时，rawDate 会被序列化，我们可以只保存处理后的 list
        await fs.writeFile(OUTPUT_PATH, JSON.stringify(list, null, 2));
        
        console.log(`✅ 成功生成！共计 ${list.length} 篇文章。`);
        // 打印前几个看看效果
        console.table(list.map(i => ({ title: i.title, date: i.date })));


        
    } catch (err) {
        console.error('❌ 生成失败:', err.message);
    }
}

async function updateMD() {

    chokidar.watch(MD_DIR,{ignoreInitial: AOE_md_date,}).on('add',(p) => {

    })

}

generate();

// getFilesInfo("../../docs");