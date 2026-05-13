import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';

const rootDir = 'D:\\code\\FrontEnd\\Vue\\blogweb\\blog';

async function uploadIMG() {

    let nowp = '';

    //pic
    const urlCur = import.meta.url;
    const pathCur = path.dirname(fileURLToPath(urlCur));
    const picPath = path.join(pathCur,'/../../assets/pic/upload/');

    const list = [];

    const files = await fs.readdir(picPath);

    chokidar.watch(picPath,{ignoreInitial: true,}).on('add',(p) => {

        const relativeP = path.relative(rootDir, p);
    
    // 统一处理成前端通用的正斜杠
        const webPath = relativeP.replace(/\\/g, '/');
    
        console.log('生成的相对路径:', webPath);
    })

//     chokidar.watch(picPath).on('add', async (filePath) => {
//     // 这里完全可以使用上面导入的 path 和 fs
//     const ext = path.extname(filePath); 
//     const stats = await fs.stat(filePath);
//     console.log(`文件后缀: ${ext}, 大小: ${stats.size}`);
// });

    // const relativeP = path.relative(rootDir,nowp);
    console.log("help")
}

uploadIMG();