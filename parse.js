function parseWhere(cond){
    /*
        Given a string (such as the query parameter of a URL)
        Returns an SQL where statement.
        Example: input: "?adId=4&name=hello"
        returns: WHERE adId = 4 AND name = 'hello'

    */
    var where = "";
    if (Object.keys(cond).length > 0){
        for (var key in cond){
            if (key != "token"){
                console.log("key = " + key);
                where += key + " = " + "'" + cond[key] + "'" + " and ";
            }
        }
        where = where.slice(0,where.length-4);
    }
    if (where.includes("?")) {
        where = replaceAll(where, "?", "");
    }
    return where;
}
function get(table,cond){

    /*
        Given a table name and a string of conditions*,
        returns a valid sql select statement
        * : check parseWhere function to see what it accepts.
    */

    var where = parseWhere(cond);
    if (where != ""){
        where = " WHERE "+where;
    }
    var parameters = "*";
    return "SELECT " + parameters + " FROM " + table +  where;
}

function remove(table,id){
    /*
        Given a table name and a primary key, it deletes it from the database 
    */
    return "DELETE FROM "+ table + " WHERE id = '" + id + "'";
}


function update(table,pars,cond){
    /*
        Given a table name
        a parameters object (json of 'col'='val')
        and a parsable condition (check documentation of parseWhere()), preferably a primary key condition
        returns a valid SQL UPDATE statment
    */
    var query = "UPDATE " + table + " SET ";
    var vals = parseWhere(pars);
    vals = replaceAll(vals , " and " , ", ");
    var where = parseWhere(cond);
    return query + vals + " WHERE " + where;
}

function insert(table,pars){
    /*
        Given a table name,
        a parameters object (json of 'col'='val'),
        returns a valid SQL INSERT statement.
     */
    var query = "INSERT INTO " + table +" ";
    pars = parseWhere(pars);
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




function replaceAll(str, find, replace) {
    // copied it from stackoverflow, replaces all 'find' characters of 'str' into 'replace'
    return str.replace(new RegExp(find, 'g'), replace);
}

function done(err){
    /* For all means deletable. */
        if (err) throw err;
        console.log('File uploaded and moved!');
}
    // query = "INSERT INTO ADS (name,user) VALUES ('" + files.filetoupload.name + "' , 69)";



module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
module.exports.insert = insert;
module.exports.parseWhere = parseWhere;
module.exports.replaceAll = replaceAll;
module.exports.done = done;