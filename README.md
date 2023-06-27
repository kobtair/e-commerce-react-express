# E-Commerce Website

This repository contains the source code for an E-Commerce website built on the PERN stack (PostgreSQL, Express.js, React, Node.js). The website consists of a frontend, backend, and a PostgreSQL database.

## Prerequisites

Before running the website locally, make sure you have the following dependencies installed on your system:

- Node.js (https://nodejs.org)
- PostgreSQL (https://www.postgresql.org)

## Installation

To run the E-Commerce website locally, follow these steps:

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```shell
git clone https://github.com/your-username/e-commerce-website.git
```

Replace `your-username` with your GitHub username.

### 2. Install frontend dependencies

Navigate to the `frontend` directory:

```shell
cd frontend
```

Install the frontend dependencies using npm:

```shell
npm install
```

### 3. Install backend dependencies

Navigate to the `backend` directory:

```shell
cd ../backend
```

Install the backend dependencies using npm:

```shell
npm install
```

### 4. Set up the database

Create a PostgreSQL database and import the provided SQL file (`database.sql`) to set up the necessary tables and data.

### 5. Configure the backend

In the `backend` directory, create a `.env` file and configure the following environment variables:

```plaintext
DATABASE_URL=postgres://username:password@localhost:5432/database
```

Replace `username`, `password`, and `database` with your PostgreSQL database credentials.

### 6. Run the website

To start the frontend and backend servers, open two separate terminal windows or tabs.

In the first terminal, navigate to the `frontend` directory:

```shell
cd frontend
```

Run the frontend server using the following command:

```shell
npm run dev
```

In the second terminal, navigate to the `backend` directory:

```shell
cd backend
```

Run the backend server using the following command:

```shell
npm start
```

This will start the frontend server on port 3000 and the backend server on port 5000.

Access the website in your browser by visiting http://localhost:3000.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request.


