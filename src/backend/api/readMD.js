import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process'; // 引入子进程模块执行 Git 命令
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AOE_md_date = false;

    //pic
    const urlCur = import.meta.url;
    const pathCur = path.dirname(fileURLToPath(urlCur));
    const picPath = path.join(pathCur,'/../../../public/docs/pic');


// 路径配置
const MD_DIR = path.join(__dirname, '../../../public/docs'); 
const OUTPUT_PATH = path.join(__dirname, '../../assets/blogList.json');

async function getMdDate(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        
        // 使用正则匹配
        const dateRegex = /> \*\*发布日期：(\d{4})\/(\d{1,2})\/(\d{1,2})/;
        const match = content.match(dateRegex);

        if (!match) return null;

        return {
            year: match[1],
            month: match[2].padStart(2, '0'), // 补零处理，5 变成 05
            day: match[3].padStart(2, '0')    // 11 保持 11
        };
    } catch (err) {
        console.error('读取文件失败:', err);
        return null;
    }
}

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

async function makeDateDir(filePath) {
    
    console.log("filep",filePath)
    const dateCur = await getMdDate(filePath);
    console.log(dateCur)
    const fname = path.relative(MD_DIR, filePath);
    console.log("fname",fname)
    // const F = fs.readdir(filePath);
    // console.log(F);
    const mdP = path.join(picPath,`/${dateCur.year}/${dateCur.month}/${dateCur.day}`,fname.replace('.md',''));

    console.log('isityou:',mdP);
    await fs.mkdir(mdP, { recursive: true });

}
 
async function updateMD() {

    chokidar.watch(MD_DIR,{ignoreInitial: AOE_md_date,depth:0}).on('add',async (p) => {
        try {
            const mdStat = await fs.stat(p);

            if (!mdStat.isFile()) return;

            const dateStr = mdStat.birthtime.toLocaleString('zh-CN', { 
                        timeZone: 'Asia/Shanghai', 
                        hour12: false 
                    });

            let content = await fs.readFile(p, 'utf-8');
            const dateHeader = `> **发布日期：${dateStr}**\n\n`;

            if (!content.includes(dateStr)) {
            // 如果没找到日期，说明是第一次放图，把日期补在最前面
                content = dateHeader + content;
                console.log(`🆕 检测到首次插入图片，已在开头补充日期: ${dateStr}`);
            }

            await fs.writeFile(p, content, 'utf-8');

            await makeDateDir(p);

        } catch (error) {
            console.error(error);
        }
    })

}

// 只有非 CI 环境（即本地）才开启监听
if (!process.env.CI) {
    updateMD();
} else {
    console.log("检测到 CI 环境，跳过监听任务，正常退出。");
    generate();
    process.exit(0); // 确保进程完全退出
}
// getFilesInfo("../../docs");