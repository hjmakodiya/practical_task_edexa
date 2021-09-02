# Follow instrucution in this file to use API

I have used MySql database for this task. Please create database with name "vittor_cloud" into your phpmyadmin.

We have vittor_cloud_db.sql file in mysql folder. Plz import that file into database.

###################################################################################
Use following API in postman

1. Login API : (POST)
http://localhost:5000/login
email : hemali@gmail.com, password : hemali123 - (HR)
email : sumita@gmail.com, password : sumita123 - (Manager)
email : vishal@gmail.com, password : vishal123 - (Employee)
email : hiten@gmail.com, password : hiten123 - (Team Lead)

2. Get User Data : (GET)
http://localhost:5000/userDetail
id : 1

3. Insert/Add API : (POST)
http://localhost:5000/addUser
name : demo
email : demo@gmail.com
password : demo123
role : Employee

4. Update API : (POST)
http://localhost:5000/editUser
id : 1
name : demo2
email : demo2@gmail.com
password : demo456
role : Employee

5. Delete User Data : (POST)
http://localhost:5000/deleteUser
id : 1

6. Provide Access to User : (POST)
http://localhost:5000/actionAccess
id : 14
action_access : 2

7. To check Uer Role of current Login User : (GET)
http://localhost:5000/getCurrentUserRole

8. For Logout (GET)
http://localhost:5000/logout

###################################################################################

Note : There are some consideration reagrding access which i have mension below

1) Before performing any request user must need to login by email & password
2) Only HR can provide access to another users. 
3) Hierarchy of access user is like that :
    HR -> Manager -> Team Lead -> Employee

    - HR can access all users
    - Manager can access Team Lead and/or Employee
    - Team Lead can access Employee 
    - Employee can not access any user
    - HR can not provide access of "Manager" to "Team Lead" or "Employee"
    - HR can not provide access of "Manager" or "Team Lead" to "Employee"

4) I have used action code for each access.
    - action_access = 1 (Access of Team Lead)
    - action_access = 2 (Access of Employee)
    - action_access = 3 (Access of Team Lead & Employee both)
    