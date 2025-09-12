# Portfolio API Contracts

## Overview
This document outlines the API contracts for integrating the portfolio frontend with the backend system. The backend will provide dynamic content management and contact form handling.

## Current Mock Data Structure
The frontend currently uses mock data from `/frontend/src/data/mock.js` containing:
- Personal information
- Professional experience
- Skills and certifications
- Achievements and awards
- Education details
- Contact information

## Backend Implementation Plan

### 1. Database Models

#### Profile Model
```
- id: ObjectId
- name: String
- title: String
- subtitle: String
- tagline: String
- email: String
- phone: String
- location: String
- heroImage: String
- profileImage: String
- about: Object {
  - headline: String
  - description: String
  - highlights: Array[String]
  - philosophy: String
}
- createdAt: DateTime
- updatedAt: DateTime
```

#### Experience Model
```
- id: ObjectId
- profileId: ObjectId (ref)
- period: String
- company: String
- role: String
- location: String
- type: String (leadership, technical, consulting, development)
- description: String
- achievements: Array[String]
- technologies: Array[String]
- order: Number
- createdAt: DateTime
```

#### Contact Model
```
- id: ObjectId
- name: String
- email: String
- company: String (optional)
- subject: String
- message: String
- status: String (new, read, replied)
- createdAt: DateTime
```

### 2. API Endpoints

#### GET /api/profile
- Purpose: Retrieve complete profile information
- Response: Profile object with embedded about section
- Frontend Integration: Replace mock data in components

#### GET /api/experience
- Purpose: Retrieve all experience entries ordered by date
- Response: Array of experience objects
- Frontend Integration: Replace portfolioData.experience in Experience component

#### GET /api/skills
- Purpose: Retrieve skills and certifications
- Response: Skills object with technical, leadership, and certifications
- Frontend Integration: Replace portfolioData.skills in Skills component

#### GET /api/achievements
- Purpose: Retrieve achievements and awards
- Response: Array of achievement objects
- Frontend Integration: Replace portfolioData.achievements in Achievements component

#### GET /api/education
- Purpose: Retrieve education information
- Response: Education object with degree, subjects, highlights
- Frontend Integration: Replace portfolioData.education in Education component

#### POST /api/contact
- Purpose: Handle contact form submissions
- Request: Contact form data (name, email, company, subject, message)
- Response: Success/error message
- Frontend Integration: Replace mock form submission in Contact component

### 3. Frontend Integration Steps

#### Step 1: Create API Service
- Create `/frontend/src/services/api.js` with axios configuration
- Add functions for each API endpoint
- Handle loading states and error management

#### Step 2: Update Components
- Replace mock data imports with API calls
- Add loading states for data fetching
- Implement error handling and fallbacks
- Add data refresh capabilities

#### Step 3: State Management
- Add useEffect hooks for data fetching
- Implement loading and error states
- Handle data caching where appropriate

### 4. Data Migration
- Current mock data will be seeded into MongoDB
- Personal information (Darshan Fulfagar's details) already updated
- Experience, skills, achievements, and education data ready for database insertion

### 5. Error Handling
- API request failures should show user-friendly messages
- Fallback to cached/default data when possible
- Contact form should validate before submission
- Network errors should be handled gracefully

### 6. Performance Considerations
- Implement data caching for profile information
- Optimize image loading with lazy loading
- Minimize API calls with strategic data fetching
- Add loading skeletons for better UX

## Implementation Priority
1. Profile and basic information API
2. Contact form functionality
3. Experience and skills data
4. Achievements and education
5. Error handling and optimization