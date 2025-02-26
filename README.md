<!--
title: 'Serverless Framework Node Express API service backed by DynamoDB on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API service backed by DynamoDB running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node.js Book API on AWS

This project is a Serverless Framework application that provides a CRUD API for managing books using AWS Lambda, API Gateway, and DynamoDB. The application includes four Lambda functions for creating, retrieving, updating, and deleting books, and it features a CI/CD pipeline using GitHub Actions.

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Setup](#setup)
- [Deployment](#deployment)
- [Endpoints & Example Requests](#endpoints--example-requests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Local Development](#local-development)

## Overview

This API allows users to:
- Create a book entry.
- Retrieve a book by ID.
- Update a book entry.
- Delete a book entry.

The API is built using the Serverless Framework and runs on AWS Lambda with an API Gateway as the entry point and a DynamoDB table for storage.

## Architecture
- **AWS Lambda**: Executes API requests.
- **API Gateway**: Routes HTTP requests to Lambda functions.
- **DynamoDB**: Stores book data.
- **Serverless Framework**: Manages deployment and configuration.
- **GitHub Actions**: Automates deployment to AWS.

## Setup

### Prerequisites
- Install [Node.js](https://nodejs.org/) (version 18.x recommended).
- Install the [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/):
  ```sh
  npm install -g serverless
  ```
- Configure AWS credentials:
  ```sh
  serverless config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY
  ```

### Install Dependencies
```sh
npm install
```

## Deployment

### Deploy to AWS
To deploy the API, run:
```sh
serverless deploy
```

This will output the deployed API Gateway endpoint.

## Endpoints & Example Requests

### Create a Book
- **Endpoint**: `POST /books`
- **Example Request**:
  ```sh
  curl --request POST 'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/books' \
       --header 'Content-Type: application/json' \
       --data-raw '{"id": "1", "title": "Serverless Handbook", "author": "John Doe"}'
  ```
- **Response**:
  ```json
  {
    "id": "1",
    "title": "Serverless Handbook",
    "author": "John Doe"
  }
  ```

### Retrieve a Book
- **Endpoint**: `GET /books/{id}`
- **Example Request**:
  ```sh
  curl --request GET 'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/books/1'
  ```
- **Response**:
  ```json
  {
    "id": "1",
    "title": "Serverless Handbook",
    "author": "John Doe"
  }
  ```

### Update a Book
- **Endpoint**: `PUT /books/{id}`
- **Example Request**:
  ```sh
  curl --request PUT 'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/books/1' \
       --header 'Content-Type: application/json' \
       --data-raw '{"title": "Updated Title", "author": "Jane Doe"}'
  ```
- **Response**:
  ```json
  {
    "id": "1",
    "title": "Updated Title",
    "author": "Jane Doe"
  }
  ```

### Delete a Book
- **Endpoint**: `DELETE /books/{id}`
- **Example Request**:
  ```sh
  curl --request DELETE 'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/books/1'
  ```
- **Response**:
  ```json
  {
    "message": "Book deleted"
  }
  ```

## CI/CD Pipeline
The project includes a GitHub Actions pipeline for automated deployments:

### Development Deployment
- Trigger: Any push to non-main branches.
- Steps:
  1. Install dependencies.
  2. Remove existing stack.
  3. Deploy to AWS using Serverless Framework.

### Production Deployment
- Trigger: Push to the `main` branch.
- Steps:
  1. Install dependencies.
  2. Deploy to AWS using Serverless Framework.

## Local Development
To test locally, use:
```sh
serverless offline
```
This starts a local server where you can invoke endpoints without deploying to AWS.
