# Getting Started with the backend services

Backend is built with node.js, in this type it uses different ports on the same server

However, it is recommended to separate the backend server and the frontend server

Main file located in app.js

## List of Routes

All routing will respond in json format

Main routes consist of:
1. User (/user)
2. Stalls (/stalls)

### Routes for /user
1. root(/) => No backend

2. googleAuth (/auth/google) => Use for login or sign in with google accounts

3. localAuth (/signup) => {
    required field in body form = username, email, password
    will return json with name message = {
        Success = {"message":"Success"},
        Failed ={ 
            {"message":"Account exist"}
        }
    }
    If success, will redirect to /user/login/success,
    If failed, the username, email box border will turn red with message "Account Exist"
    }

4. localLogin (/login) => {
    Use for authenticating login
    required field in body form = email, password
    will return json with message = {
        Success = {"message":"Success"},
        Failed = {"message":"Auth Failed"} 
    }
    If failure will render the email and password box red with promt {"Wrong password or email"}
}

5. logOut (/logout) => Use to logout

6. Account Details (/acc/:userid) => Will send details of user with corresponding userid
### Routes for /stalls
1. root (/) => Consist of page that list all available stalls

2. 