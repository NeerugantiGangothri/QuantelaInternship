//fs is inbuilt mode to handle file system
const file=require('fs');

//The writeFileSync method is the synchronous version of writing data to a file. 
//It blocks the execution of code until the file write operation is complete.
//syn:fs.writeFile(file, data, options);
let res=file.writeFileSync('./test.txt','This File is created by using file module in node js');
console.log(res);

//The writeFile method is the asynchronous version of writing data to a file
//syn:fs.writeFile(file, data, options, callback);
//callback:It receives an error argument if there is an error.
 let res1=file.writeFile('./test1.txt','This File is created by using file module in  js',(err)=>{});
 console.log(res1)


 const result=file.readFileSync('./test.txt','utf-8');
 console.log(result);

 file.readFile('./test.txt','utf-8', (err,result1)=>{
    if(err){
        console.log("Error",err);
    }
    else{
        console.log(result1);
    }
 })

 //appendFile it is used to appendthe text for existing file
 file.appendFileSync('./test.txt',`\nThis line is appended`);
 //file.appendFile('/test1.txt',`\nThis line appended`, (err)=>{});

 //cpSync To CopyFile text from one file to other file
 file.cpSync('./test.txt','./copy.txt');

 //to delete files
 //file.unlinkSync('./copy.txt');

 //to get the statistics of file
 console.log(file.statSync('./test.txt'));
//  output:Stats {
//     dev: 1287161581,
//     mode: 33206,
//     nlink: 1,
//     uid: 0,
//     gid: 0,
//     rdev: 0,
//     blksize: 4096,
//     ino: 23080948090435076,
//     size: 74,
//     blocks: 0,
//     atimeMs: 1722247182084.3357,
//     mtimeMs: 1722247182084.3357,
//     ctimeMs: 1722247182084.3357,
//     birthtimeMs: 1722244563588.2192,
//     atime: 2024-07-29T09:59:42.084Z,
//     mtime: 2024-07-29T09:59:42.084Z,
//     ctime: 2024-07-29T09:59:42.084Z,
//     birthtime: 2024-07-29T09:16:03.588Z
//   }
//   This File is created by using file module in node js
//   This line is appended

//to make directory
file.mkdirSync('modules');

//rename file
//file.renameSync('./copy.txt','./copy1.txt');
file.rename('./copy1.txt','./copy.txt',(err)=>{});