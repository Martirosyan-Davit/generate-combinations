# Combination Generator API

A Node.js API for generating item combinations with MySQL storage, enforcing prefix-based combination rules.

## Features

- Generates valid combinations based on prefix rules
- Stores results in MySQL database
- Transactional database operations
- RESTful endpoints
- Comprehensive logging

## Prerequisites

- Node.js v18+
- MySQL 8.0+
- yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Martirosyan-Davit/generate-combinations.git
   cd combination-generator

2. Install dependencies:

    yarn install

3. Set up your environment:

    cp .env.example .env

## Database Setup

1.Create the database:

    CREATE DATABASE combinations_db;

## Running the Application

yarn start

# API Documentation

## Base URL
http://localhost:3000/api/v1

### Endpoints

1. Generate Combinations

**POST** /combinations

*Generates all valid combinations of items with the specified length.*

Request Body:

```
{
  "items": [1, 2, 1],
  "length": 2
}
```

*Where:*

**items:** Array of numbers representing item counts per prefix

**length:** Combination length (must be ≤ number of unique prefixes)

Example Response:

```
{
  "id": 1,
  "combinations": [
    ["A1", "B1"],
    ["A1", "B2"],
    ["A1", "C1"],
    ["B1", "C1"],
    ["B2", "C1"]
  ]
}
```

