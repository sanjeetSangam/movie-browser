# Movie Browser

A movie-browsing web application that allows users to search for movies, filter results, and save their favorite movies. The application is built using React and Zustand, and it provides a responsive and accessible user interface.

## Table of Contents

-   [Project Description](#project-description)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)

## Project Description

The Movie Browser application allows users to:

-   Search for movies with dynamic filtering options.
-   Movie details page.
-   View search results with infinite scrolling.
-   Save and manage favorite movies.
-   Access a list of their saved favorite movies.

## Features

-   **Movie Search:** Search for movies by title with dynamic updates as you type implemented with debounce feature to reduce api call on each key stroke.
-   **Advanced Filtering:** Filter movies by release year, region, and language.
-   **Infinite Scrolling:** Load more results as you scroll down and back to top button.
-   **Favorites Management:** Save movies to a favorites list and view them later managed by Zustand.
-   **Responsive Design:** Mobile-first design that works across various devices implemented with tailwind css.
-   **Card View:** Responsive carousel cards.
-   **Accessibility:** Designed with accessibility best practices in mind.

## Technologies Used

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **State Management:** Zustand
-   **API:** [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)
-   **Build Tool:** Vite

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sanjeetSangam/movie-browser.git
    ```

    - create .env file and add keys and values mentioned in api file
    - navigate to root project directory and

    ```bash
    yarn install
    ```

    ```bash
    yarn run dev
    ```
