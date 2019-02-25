function parseWhere(cond){
    var where = "";
    if (Object.keys(cond).length > 0){
        for (var key in cond){
            if (key != "token"){
                where += key + " = " + "'" + cond[key] + "'" + " and ";
            }
        }
        where = where.slice(0,where.length-4);
    }
    return where;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function done(err){
        if (err) throw err;
        console.log('File uploaded and moved!');
}
    // query = "INSERT INTO ADS (name,user) VALUES ('" + files.filetoupload.name + "' , 69)";

module.exports.parseWhere = parseWhere;
module.exports.replaceAll = replaceAll;
module.exports.done = done;