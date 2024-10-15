# GlobalRemoteJobs

GlobalRemoteJobs is a web platform designed to connect job seekers with remote job opportunities from all over the world. It features job listings posted by companies directly, as well as jobs fetched from external APIs like RemoteOK. The platform provides an easy-to-use interface for browsing, searching, and applying for jobs, with a focus on remote work.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [License](#license)

---

## Features
- **Job Listings**: Browse remote jobs, including the most popular or highest-paying jobs.
- **Job Search**: Search for jobs by title, category, salary, and more.
- **Job Filters**: Filter jobs by type (Full-time, Part-time, Contract), location, category, and salary.
- **Job Details**: View detailed information about each job, including job description, company profile, salary, and application instructions.
- **Profile Creation**: Job seekers and companies can create accounts and profiles to manage job applications and job postings.
- **External API Integration**: Jobs are fetched from external sources like RemoteOK and blended with platform-specific job postings for a seamless experience.
- **Responsive Design**: Still working on this...

## Getting Started

### Prerequisites
Before you begin, make sure you have the following installed on your machine:
- **Node.js** (v14 or later)
- **npm** 

### Installation
Follow these steps to get the project up and running on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/malhaouit/global-remote-jobs.git
   ```

2. **Install dependencies in back-end directory**
   ```bash
   cd global-remote-jobs/back-end
   ```

   Run:
   ```bash
   npm install
   ```

3. **Install dependencies in front-end directory**
   ```bash
   cd global-remote-jobs/front-end
   ```

   Run:
   ```bash
   npm install
   ```

4. **Set up environment variables:** Create a `.env` file in the root directory for both back-end and front-end and add the following environment variables:

- **In back-end directory:**
   ```bash
   REMOTE_OK_API_KEY=your_remoteok_api_key
   # Add other environment variables as needed
   ```

- **In front-end directory:**
   ```bash
   REMOTE_OK_API_KEY=SOMETHING
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```

   Or:
   ```bash
   npm run dev
   ```

The app should now be running on `http://localhost:3000`.

## API Integration
GlobalRemoteJobs integrates with the [Remotive](https://remotive.com/) API to fetch remote job listings.

### How External Jobs Are Fetched:
Jobs from Remotive are fetched using the API and displayed alongside jobs posted directly on the platform.
API response is parsed and merged with the platform's native jobs.
Filters like Job Type, Location, and Salary apply to both external and native job listings for a seamless user experience.

### API Documentation:
You can refer to the official [Remotive API Documentation](https://remotive.com/api/remote-jobs) for more details on how jobs are fetched and the structure of the API response.

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:
   ```bash
   git commit -m "Add feature: your feature name"
   ```

4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
   
5. Open a pull request on GitHub.


## Deployment
This website is deployed on [Heroku](https://dashboard.heroku.com/apps)

- **The link of the back-end app:** [global-remote-jobs-backend-app](https://global-remote-jobs-backend-app-53a58d6be2f0.herokuapp.com/)

- **The link of the front-end app:** [global-remote-jobs-frontend-ap](https://global-remote-jobs-frontend-ap-65833faf3b86.herokuapp.com/)

## License


### **Additional Notes**:
- Update the **API Key** placeholder with real instructions once you have API keys or other environment variables for the project.