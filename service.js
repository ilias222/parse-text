//
const path = require('path');
const fs = require('fs');

exports.progress = async (req) => {
    let datas = ''
    req.setEncoding('utf8');
   await req
    .on('data', chunk => {
             datas += chunk; 
        })
        
        return datas;
}

exports.writeFiles = (chunk) => {
    const index = chunk.indexOf('(///)');
    const nameFile = chunk.slice(0, index);
    const descript = {msg : chunk.slice(index + 5)};
    const paths = path.join(__dirname, nameFile);

    try{

        fs.appendFile(paths, descript.msg, (err, datas) =>{
            if(err) console.log('0. Файл не задан. Переход к созданию файла');
        }
        
        );

    } catch{
    }
}
