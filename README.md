
## AppBACKEND README 
This branch of the backend code sets up a **Node.js** server using **Express**, integrating with **MongoDB** via Mongoose for database operations. It provides endpoints for user authentication, user data retrieval, and file uploads.

# Prerequisites:
Ensure you have the following installed: 

- Node.js
- MongoDB

Setup: 
- Clone the repository.
- Install dependencies using ```npm install```.
- Create a ```.env``` file in the root directory and configure the following variables:
```
MONGO_URL = <Your MongoDB connection URL>
JWT_SECRET = <Your JWT secret key>
PORT = <Port number, default is 5001>
```
# Installation:

To run the server, use the following command:
```
node app.js
```
This will start the server on the specified port.

# Usage:
Endpoints:

 GET /

  - Returns a status indicating server is started.

 POST /SignUpForm

  - Endpoint for user registration.
  - Accepts username, email, telephone, password, and an optional profileImage (uploaded via multipart form-data).
  - Creates a new user in the database with hashed password.

 POST /LoginForm

  - Endpoint for user login.
  - Accepts email and password.
  - Returns a JWT token upon successful authentication.

 POST /userdata

  - Endpoint to retrieve user data based on JWT token.
  - Accepts a token in the request body.
  - Verifies the token and returns user information.

# Dependencies:
- dotenv
- express
- mongoose
- bcryptjs
- jsonwebtoken
- multer (for file uploads)
# Database:
Ensure MongoDB is running and accessible. Modify .env file MONGO_URL variable accordingly.

# Additional Notes:
- User model schema is defined in UserDetails.js.
- Uploaded images are stored in the uploads directory.
- Error handling is implemented for registration, login, and token verification.
# Authors:
- *LCFJunior*
- *llucaasbarros*

