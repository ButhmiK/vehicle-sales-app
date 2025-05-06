# Vehicle Sales App SQA Assignment 

[View  📄 ](docs/2025-S1-IT4100-Assignment.pdf)


A full-stack web application designed to manage and sell vehicles efficiently. This project also supports manual and automated testing workflows, including Playwright testing.

## 🌐 Live Demo

Try it out here: [vehicle-sales-app.vercel.app](https://vehicle-sales-app.vercel.app)

## 🧰 Tech Stack

- **Frontend**: React (TypeScript) with Tailwind CSS
- **Backend**: Node.js, Express ,TS
- **Database**: MongoDB
- **Testing**: Playwright, Manual Testing
- **Containerization**: Docker, Docker Compose
- **Deployment**: Vercel for backend and netlify for frontend



### 🚀 Getting Started

## Prerequisites

- Node.js (v14 or above) <br>
- Docker & Docker Compose (for containerized setup for mongoDB)

## Installation

1. **Clone the repository:**

git clone https://github.com/ButhmiK/vehicle-sales-app.git <br>
- cd vehicle-sales-ap


## Install dependencies:

npm install

## Start the application:

Using Docker: docker-compose up  <br>

## Manual start:

**Start backend**
cd server <br>
npm install <br>
npm run dev

**Start frontend** <br>
cd ../client <br>
npm install <br>
npm start


#  Testing
**Automated Testing with Playwright** <br> 
Make sure the app is running locally, then run: <br>
npx playwright tes t<br>

Refer to tests/e2e directories for test scripts.

**Manual Testing** <br>
You can manually test the application by navigating through the UI and referring to sample test cases in the tests-examples/ folder.






