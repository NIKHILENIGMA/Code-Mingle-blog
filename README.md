# CodeMingle Blog Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
CodeMingle is a full-stack blog application that allows users to create, edit, and delete blog posts. It also supports user authentication and comment functionality.

## Features
- User authentication (sign up, login, logout)
- Create, read, update, and delete blog posts
- Comment on blog posts
- Responsive design

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/CodeMingle.git
    ```
2. Navigate to the project directory:
    ```bash
    cd CodeMingle
    ```
3. Install dependencies for both frontend and backend:
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```
4. Create a `.env` file in the root directory and add your environment variables:
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

## Usage
1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.