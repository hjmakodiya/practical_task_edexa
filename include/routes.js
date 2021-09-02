var router = express.Router()

function checkLogin(req, res, next) {
    var sess = req.session;
    if (sess.email) {
        next();
    }
    else {
        res.end("Please Login First");
    }
}

function checkAccess(userRole) {
    let flag = true;

    if (sess.role == "HR") {
        flag = true;
    } else if (sess.action_access != "undefine" && sess.action_access != 0) {
        if (sess.role == "Manager") {
            if (userRole == "Employee" && sess.action_access == 2) {
                flag = true;
            } else if (userRole == "Team Lead" && sess.action_access != 2) {
                flag = true;
            } else if (sess.action_access == 3) {
                flag = true;
            } else {
                flag = false
            }
        } else if(sess.role == "Team Lead" && userRole == "Employee"  && sess.action_access == 2) {
            flag = true;
        }
        else {
            flag = false;
        }
    } else {
        flag = false;
    }

    return flag;
}
router.get('/', function (req, res) {
    res.send('Welcome to Vittor cloud.')
})

router.post('/login', function (req, res) {
    let email = req.body.email
    let password = req.body.password

    //first we need to check wether that user is already registered or not
    var sql = "SELECT * FROM users WHERE email = '" + email + "' and password = '" + password + "'"
    db.query(sql, function (err, result, fields) {
        if (err) throw err
        if (result.length > 0) {
            sess = req.session;
            sess.email = result[0].email;
            sess.role = result[0].role;
            sess.action_access = result[0].action_access;
            res.end("Login successfully")
        }
        else {
            res.end("Invalid Username or password")
        }
    })
})

router.post('/addUser', checkLogin, function (req, res) {
    let email = req.body.email
    let name = req.body.name
    let password = req.body.password
    let role = req.body.role

    //first we need to check wether that user is already registered or not
    var sql = "SELECT email FROM users WHERE email = '" + email + "'"
    db.query(sql, function (err, result, fields) {
        if (err) throw err
        if (result.length > 0) {
            //user already exist
            res.end("user already exist")
        } else {
            let flag = checkAccess(role);
            if (flag == true) {
                //insert user data into users table
                sql = "INSERT INTO users(email, password, name, role) VALUES ('" + email + "','" + password + "','" + name + "','" + role + "')";
                db.query(sql, function (err, result, fields) {
                    if (err) throw err
                    res.end("User Added Successfully")
                })
            }
            else 
                res.end("You are not autherize to access this user");
        }
    })
})

router.post('/editUser', checkLogin, function (req, res) {
    let id = req.body.id
    let email = req.body.email
    let password = req.body.password
    let name = req.body.name
    let role = req.body.role

    //check user is exist or not
    var sql = "SELECT * FROM users WHERE id = " + id
    db.query(sql, function (err, result, fields) {
        if (err) throw err
        if (result.length > 0) {

            let flag = checkAccess(result[0].role);

            if (flag == true) {
                //update userdata
                sql = "UPDATE users SET name='" + name + "',email='" + email + "',password='" + password + "',role='" + role + "' WHERE id = " + id
                
                db.query(sql, function (err, result, fields) {
                    if (err) throw err
                    res.end("User Data updated Successfully")
                })
            }
            else 
                res.end("You are not autherize to access this user");
        }
        else {
            res.end("User doesn't exist")
        }
    })
})

router.post('/deleteUser', checkLogin, function (req, res) {
    let id = req.body.id
    
    //check user is exist or not
    var sql = "SELECT * FROM users WHERE id = " + id
    db.query(sql, function (err, result, fields) {
        if (err) throw err
        if (result.length > 0) {
            let flag = checkAccess(result[0].role);

            if (flag == true) {
                //delete userdata
                sql = "DELETE FROM users where id = " + id

                db.query(sql, function (err, result, fields) {
                    if (err) throw err
                    res.end("User Deleted Successfully")
                })
            }
            else 
                res.end("You are not autherize to access this user");
        }
        else {
            res.end("User doesn't exist")
        }
    })
})

router.get('/userDetail', checkLogin, function (req, res) {
    let id = req.body.id;

    var sql = "SELECT * FROM users WHERE id = " + id
    db.query(sql, function (err, result, fields) {
        if (err) throw err
        if (result.length > 0) {
            let flag = checkAccess(result[0].role);

            if (flag == true) 
                res.end(JSON.stringify(result))
            else 
                res.end("You are not autherize to access this user");
        }
        else {
            res.end("User is not available")
        }
    })
})

router.post('/actionAccess', checkLogin, function (req, res) {
    let id = req.body.id
    let action_access = req.body.action_access
    //Access code like this : 1-TL, 2-Employee, 3-both

    if (sess.role == "HR") {
        //check user is exist or not
        var sql = "SELECT * FROM users WHERE id = " + id
        db.query(sql, function (err, result, fields) {
            if (err) throw err
            if (result.length > 0) {
                //Provide Access to users
                if (result[0].role == "Team Lead" && action_access != 2) {
                    res.end("Team Lead can not have access for other Team Lead")
                } else if (result[0].role == "Employee") {
                    res.end("Employee Can not have Access of Other Users");
                }else {
                    //Provide Access to users
                    sql = "UPDATE users SET action_access=" + action_access + " WHERE id = " + id
                    db.query(sql, function (err, result, fields) {
                        if (err) throw err
                        res.end("User Access Provided Successfully")
                    })
                }
            }
            else {
                res.end("User doesn't exist")
            }
        })
    } else {
        res.end("You are not autherized to provide Access");
    }
})

router.get('/logout', function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.end("Logout SuccessFully");
    });
})

router.get('/getCurrentUserRole', checkLogin, function (req, res) {
    res.end("Current User is : " + sess.email + " Role : " + sess.role)
})

module.exports = router