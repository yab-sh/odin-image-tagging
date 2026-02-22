# Find'em! — Photo Tagging Game

A Where's Waldo-style game where players find hidden characters against the clock. Built as part of The Odin Project curriculum.

[Live Demo](#) | [Backend Repository](https://github.com/yab-sh/odin-image-tagging-backend)

---

## Overview

Find'em! is a full-stack photo tagging game. Players are shown three characters to find in a detailed image. The timer starts when the image loads and stops when all characters are found. Times are saved to a leaderboard.

---

## Built With

- React + TypeScript
- Vite
- React Router
- Axios
- CSS custom properties

Backend: Node.js, Express, PostgreSQL, Prisma (see [backend repo](https://github.com/yab-sh/odin-image-tagging-backend))

---

## Features

- User authentication (register/login with a secret)
- Persistent login state
- Timer that tracks completion time
- Click-based character detection
- Leaderboard showing top 10 fastest times
- Responsive design

---

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yab-sh/odin-image-tagging.git
cd odin-image-tagging
```
2. install dependencies
```bash
npm install
```
3. create a [.env] file
```env
API_URL=http://localhost:3000/api/v1
```
4. Start the development server
```bash
npm run dev
```
The backend must be running seperately. See the [Backend Repository](https://github.com/yab-sh/odin-image-tagging-backend) for setup instructions.

## Author
yasin-sh - 
[GitHub](https://github.com/yab-sh) | [LinkedIn](https://www.linkedin.com/in/yasin-sh/)

##License
This project is open source and available under the [MIT License](License.md).
