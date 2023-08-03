---

# User Management Application

This is a User Management Application built with Angular that allows you to manage user information, including listing users, viewing user details, creating new users, and performing user authentication and authorization. The application utilizes Angular Material for styling and Reactive Forms for form handling.

## Features

### 1. Authentication and Authorization

- Authenticate with Google Sign-In to access the application.
- Only authenticated users can access restricted routes (e.g., user details, user create).

### 2. User Registration

- Register as a new user by providing a valid email and password.

### 3. User List

- View a list of all users with their basic information (e.g., name, email, etc.).
- Click on a user to view detailed information.

### 4. User Details

- View detailed information about a specific user, including name, email, address, and other details.

### 5. Angular Material Theme

- Utilized Angular Material components to create a consistent and attractive user interface.

### 6. Environment Variables

- Used environment variables to store sensitive information such as Google Client ID and API URL.
- Separate environment files for development and production environments.

## Setup and Installation

Follow these steps to run the application on your local machine:

1. Clone this repository to your local machine.
2. Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. Create a Google Client ID for Google Sign-In authentication and replace `YOUR_GOOGLE_CLIENT_ID` in `environment.ts` with your actual Google Client ID.
4. Replace `YOUR_API_URL` in `environment.ts` with the URL of your backend API, where user registration and authorization endpoints are implemented.
5. Build and run the application:

   ```bash
   ng serve
   ```

   Navigate to `http://localhost:4200/` in your web browser to access the application.

## Folder Structure

The project is structured as follows:

```
user-management-app/
  ├── src/
  │   ├── app/
  │   │   ├── components/
  │   │   │   ├── user/
  │   │   │   │   ├── user-list/
  │   │   │   │   ├── user-details/
  │   │   │   │   ├── user-create/
  │   │   │   ├── authentication/
  │   │   │   │   ├── login/
  │   │   │   │   ├── registration/
  │   │   │   ├── shared/
  │   │   ├── services/
  │   │   ├── models/
  │   │   ├── app.component.html
  │   │   ├── app.component.scss
  │   │   ├── app.component.ts
  │   │   ├── app.module.ts
  │   │   └── app-routing.module.ts
  │   ├── assets/
  │   ├── environments/
  │   │   ├── environment.ts
  │   │   └── environment.prod.ts
  │   ├── index.html
  │   └── ...
  ├── package.json
  ├── angular.json
  ├── tsconfig.json
  ├── ...
  └── README.md
```

## Technologies Used

- Angular
- Angular Material
- Reactive Forms
- HttpClientModule

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
