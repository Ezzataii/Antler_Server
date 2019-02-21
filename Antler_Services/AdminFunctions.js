const parser = require('./parse');


function get(table,cond){
    var where = parser.parseWhere(cond);
    var parameters = "*";
    return "SELECT " + parameters + " FROM " + table + " WHERE " + where;
}

function remove(table,id){
    return "DELETE FROM "+ table + " WHERE id = '" + id + "'";
}


function update(table,pars,cond){
    var query = "UPDATE " + table + " SET ";
    var vals = parser.parseWhere(pars);
    vals = parser.replaceAll(vals , " and " , ", ");
    var where = parser.parseWhere(cond);
    return query + vals + " WHERE " + where;
}

function insert(table,pars){
    var query = "INSERT INTO " + table +" ";
    pars = parser.parseWhere(pars);
    var cols = "(";
    var vals = "(";
    pars = pars.split(" and ");
    for (var i = 0 ; i < pars.length ; i++){
        var temp = pars[i].split("=");
        cols += temp[0]+", ";
        vals += temp[1]+", ";
    }
    vals = vals.slice(0,vals.length - 2) +")";
    cols = cols.slice(0,cols.length - 2) +")";
    return query + cols + " VALUES " + vals;
}


module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
module.exports.insert = insert;

