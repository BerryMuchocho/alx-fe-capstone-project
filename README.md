# BrainBurst Quiz App

BrainBurst is a timed quiz application built with React and Tailwind CSS.
It allows users to test their knowledge across multiple categories and difficulty levels using real-time trivia data from the Open Trivia Database API.

## Project Goal

The goal of this project was to build a dynamic, state-driven React application that demonstrates:

Component-based architecture

React Hooks (useState, useEffect)

Client-side routing (React Router)

API integration

Conditional rendering

Basic validation and user flow handling

Clean UI design with Tailwind CSS

This project was developed as a capstone project to demonstrate practical front-end development skills.

## Live Demo

(Add your Vercel link here once deployed)

## Features

Fetches quiz categories dynamically from Open Trivia API

Selectable difficulty level (Easy, Medium, Hard)

Customizable number of questions (1–50)

Timed quiz experience

Progress tracking during quiz

Score calculation on completion

Results page with performance summary

Responsive layout for desktop and mobile

## Tech Stack

React (Vite)

React Router

Tailwind CSS

Open Trivia Database API

Vercel (deployment)

## How It Works

On load, the app fetches quiz categories from the API.

The user selects:

Category

Difficulty

Number of questions

The app navigates to the quiz route and fetches questions based on selected options.

The user answers questions within a time limit.

Score is calculated and displayed on the results page.

## Key Concepts Demonstrated

Managing multiple pieces of state

Passing state via React Router

Handling asynchronous API calls

Conditional UI updates based on user input

Controlled form inputs

Basic user validation

## Future Improvements

Dark mode toggle

Persistent high scores using local storage

Question review mode after quiz

Animated UI interactions

Leaderboard functionality

Improved accessibility

Global state management (Context API)

## Author

Stellah Muchocho
Front-End Developer
