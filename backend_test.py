#!/usr/bin/env python3
"""
Backend API Testing Suite for Portfolio Application
Tests all API endpoints for Darshan Fulfagar's portfolio
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, Any, List

# Configuration
BASE_URL = "https://resume-showcase-97.preview.emergentagent.com/api"
TIMEOUT = 10  # seconds

class PortfolioAPITester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": [],
            "test_details": []
        }
        
    def log_test(self, test_name: str, success: bool, details: str, response_time: float = 0):
        """Log test results"""
        self.results["total_tests"] += 1
        if success:
            self.results["passed"] += 1
            status = "✅ PASS"
        else:
            self.results["failed"] += 1
            status = "❌ FAIL"
            self.results["errors"].append(f"{test_name}: {details}")
        
        self.results["test_details"].append({
            "test": test_name,
            "status": status,
            "details": details,
            "response_time": f"{response_time:.2f}s" if response_time > 0 else "N/A"
        })
        
        print(f"{status} {test_name}")
        print(f"   Details: {details}")
        if response_time > 0:
            print(f"   Response Time: {response_time:.2f}s")
        print()

    def test_api_health(self):
        """Test GET /api/ endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{BASE_URL}/", timeout=TIMEOUT)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_test(
                        "API Health Check", 
                        True, 
                        f"API is running - {data['message']}, Version: {data['version']}", 
                        response_time
                    )
                    return True
                else:
                    self.log_test(
                        "API Health Check", 
                        False, 
                        f"Missing expected fields in response: {data}", 
                        response_time
                    )
            else:
                self.log_test(
                    "API Health Check", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}", 
                    response_time
                )
        except Exception as e:
            self.log_test("API Health Check", False, f"Exception: {str(e)}")
        return False

    def test_profile_endpoint(self):
        """Test GET /api/profile endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{BASE_URL}/profile", timeout=TIMEOUT)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["name", "title", "email", "about"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Check if it's Darshan's profile
                    if "Darshan" in data.get("name", ""):
                        self.log_test(
                            "Profile Data Retrieval", 
                            True, 
                            f"Profile retrieved for {data['name']} - {data['title']}", 
                            response_time
                        )
                        return True
                    else:
                        self.log_test(
                            "Profile Data Retrieval", 
                            False, 
                            f"Profile name doesn't match expected 'Darshan': {data.get('name', 'N/A')}", 
                            response_time
                        )
                else:
                    self.log_test(
                        "Profile Data Retrieval", 
                        False, 
                        f"Missing required fields: {missing_fields}", 
                        response_time
                    )
            else:
                self.log_test(
                    "Profile Data Retrieval", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}", 
                    response_time
                )
        except Exception as e:
            self.log_test("Profile Data Retrieval", False, f"Exception: {str(e)}")
        return False

    def test_experience_endpoint(self):
        """Test GET /api/experience endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{BASE_URL}/experience", timeout=TIMEOUT)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check first experience entry
                        exp = data[0]
                        required_fields = ["company", "role", "period", "description"]
                        missing_fields = [field for field in required_fields if field not in exp]
                        
                        if not missing_fields:
                            self.log_test(
                                "Experience Data Retrieval", 
                                True, 
                                f"Retrieved {len(data)} experience entries. Latest: {exp['role']} at {exp['company']}", 
                                response_time
                            )
                            return True
                        else:
                            self.log_test(
                                "Experience Data Retrieval", 
                                False, 
                                f"Missing required fields in experience: {missing_fields}", 
                                response_time
                            )
                    else:
                        self.log_test(
                            "Experience Data Retrieval", 
                            False, 
                            "No experience data found", 
                            response_time
                        )
                else:
                    self.log_test(
                        "Experience Data Retrieval", 
                        False, 
                        f"Expected list, got: {type(data)}", 
                        response_time
                    )
            else:
                self.log_test(
                    "Experience Data Retrieval", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}", 
                    response_time
                )
        except Exception as e:
            self.log_test("Experience Data Retrieval", False, f"Exception: {str(e)}")
        return False

    def test_skills_endpoint(self):
        """Test GET /api/skills endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{BASE_URL}/skills", timeout=TIMEOUT)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["technical", "leadership", "certifications"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    tech_skills = data.get("technical", {})
                    certs = data.get("certifications", [])
                    self.log_test(
                        "Skills Data Retrieval", 
                        True, 
                        f"Skills retrieved - Technical categories: {len(tech_skills)}, Certifications: {len(certs)}", 
                        response_time
                    )
                    return True
                else:
                    self.log_test(
                        "Skills Data Retrieval", 
                        False, 
                        f"Missing required fields: {missing_fields}", 
                        response_time
                    )
            else:
                self.log_test(
                    "Skills Data Retrieval", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}", 
                    response_time
                )
        except Exception as e:
            self.log_test("Skills Data Retrieval", False, f"Exception: {str(e)}")
        return False

    def test_achievements_endpoint(self):
        """Test GET /api/achievements endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{BASE_URL}/achievements", timeout=TIMEOUT)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        achievement = data[0]
                        required_fields = ["title", "description", "year", "category"]
                        missing_fields = [field for field in required_fields if field not in achievement]
                        
                        if not missing_fields:
                            self.log_test(
                                "Achievements Data Retrieval", 
                                True, 
                                f"Retrieved {len(data)} achievements. First: {achievement['title']} ({achievement['year']})", 
                                response_time
                            )
                            return True
                        else:
                            self.log_test(
                                "Achievements Data Retrieval", 
                                False, 
                                f"Missing required fields in achievement: {missing_fields}", 
                                response_time
                            )
                    else:
                        self.log_test(
                            "Achievements Data Retrieval", 
                            False, 
                            "No achievements data found", 
                            response_time
                        )
                else:
                    self.log_test(
                        "Achievements Data Retrieval", 
                        False, 
                        f"Expected list, got: {type(data)}", 
                        response_time
                    )
            else:
                self.log_test(
                    "Achievements Data Retrieval", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}", 
                    response_time
                )
        except Exception as e:
            self.log_test("Achievements Data Retrieval", False, f"Exception: {str(e)}")
        return False

    def test_education_endpoint(self):
        """Test GET /api/education endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{BASE_URL}/education", timeout=TIMEOUT)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["degree", "university", "year"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Check if it's from Pune University as expected
                    university = data.get("university", "")
                    if "Pune" in university:
                        self.log_test(
                            "Education Data Retrieval", 
                            True, 
                            f"Education retrieved - {data['degree']} from {data['university']} ({data['year']})", 
                            response_time
                        )
                        return True
                    else:
                        self.log_test(
                            "Education Data Retrieval", 
                            True, 
                            f"Education retrieved - {data['degree']} from {data['university']} ({data['year']}) - Note: Expected Pune University", 
                            response_time
                        )
                        return True
                else:
                    self.log_test(
                        "Education Data Retrieval", 
                        False, 
                        f"Missing required fields: {missing_fields}", 
                        response_time
                    )
            else:
                self.log_test(
                    "Education Data Retrieval", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}", 
                    response_time
                )
        except Exception as e:
            self.log_test("Education Data Retrieval", False, f"Exception: {str(e)}")
        return False

    def test_contact_form_submission(self):
        """Test POST /api/contact endpoint"""
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@techcorp.com",
            "company": "TechCorp Solutions",
            "subject": "Partnership Opportunity",
            "message": "Hi Darshan, I came across your portfolio and I'm impressed with your Salesforce expertise. We have an exciting opportunity that might interest you. Would you be available for a brief call this week to discuss?"
        }
        
        try:
            start_time = time.time()
            response = requests.post(
                f"{BASE_URL}/contact", 
                json=contact_data, 
                timeout=TIMEOUT,
                headers={"Content-Type": "application/json"}
            )
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "id" in data:
                    self.contact_id = data["id"]  # Store for retrieval test
                    self.log_test(
                        "Contact Form Submission", 
                        True, 
                        f"Contact form submitted successfully. ID: {data['id']}, Message: {data.get('message', 'N/A')}", 
                        response_time
                    )
                    return True
                else:
                    self.log_test(
                        "Contact Form Submission", 
                        False, 
                        f"Unexpected response format: {data}", 
                        response_time
                    )
            else:
                self.log_test(
                    "Contact Form Submission", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}", 
                    response_time
                )
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")
        return False

    def test_contact_retrieval(self):
        """Test GET /api/contacts endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{BASE_URL}/contacts", timeout=TIMEOUT)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        contact = data[0]  # Most recent contact
                        required_fields = ["name", "email", "subject", "message", "status"]
                        missing_fields = [field for field in required_fields if field not in contact]
                        
                        if not missing_fields:
                            # Check if our submitted contact is there
                            found_our_contact = any(c.get("name") == "John Smith" for c in data)
                            self.log_test(
                                "Contact Retrieval", 
                                True, 
                                f"Retrieved {len(data)} contacts. Latest: {contact['name']} - {contact['subject']}. Our test contact found: {found_our_contact}", 
                                response_time
                            )
                            return True
                        else:
                            self.log_test(
                                "Contact Retrieval", 
                                False, 
                                f"Missing required fields in contact: {missing_fields}", 
                                response_time
                            )
                    else:
                        self.log_test(
                            "Contact Retrieval", 
                            False, 
                            "No contacts found in database", 
                            response_time
                        )
                else:
                    self.log_test(
                        "Contact Retrieval", 
                        False, 
                        f"Expected list, got: {type(data)}", 
                        response_time
                    )
            else:
                self.log_test(
                    "Contact Retrieval", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}", 
                    response_time
                )
        except Exception as e:
            self.log_test("Contact Retrieval", False, f"Exception: {str(e)}")
        return False

    def test_invalid_endpoints(self):
        """Test error handling for invalid requests"""
        try:
            # Test invalid endpoint
            start_time = time.time()
            response = requests.get(f"{BASE_URL}/invalid", timeout=TIMEOUT)
            response_time = time.time() - start_time
            
            if response.status_code == 404:
                self.log_test(
                    "Error Handling - Invalid Endpoint", 
                    True, 
                    "Correctly returns 404 for invalid endpoint", 
                    response_time
                )
            else:
                self.log_test(
                    "Error Handling - Invalid Endpoint", 
                    False, 
                    f"Expected 404, got {response.status_code}", 
                    response_time
                )
                
            # Test invalid contact form data
            invalid_contact = {"name": "Test", "invalid_field": "value"}
            start_time = time.time()
            response = requests.post(
                f"{BASE_URL}/contact", 
                json=invalid_contact, 
                timeout=TIMEOUT,
                headers={"Content-Type": "application/json"}
            )
            response_time = time.time() - start_time
            
            if response.status_code in [400, 422]:  # Bad request or validation error
                self.log_test(
                    "Error Handling - Invalid Contact Data", 
                    True, 
                    f"Correctly validates contact form data (HTTP {response.status_code})", 
                    response_time
                )
            else:
                self.log_test(
                    "Error Handling - Invalid Contact Data", 
                    False, 
                    f"Expected 400/422, got {response.status_code}: {response.text}", 
                    response_time
                )
                
        except Exception as e:
            self.log_test("Error Handling Tests", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("PORTFOLIO BACKEND API TESTING SUITE")
        print("=" * 60)
        print(f"Testing API at: {BASE_URL}")
        print(f"Timeout: {TIMEOUT} seconds")
        print("=" * 60)
        print()
        
        # Run tests in logical order
        self.test_api_health()
        self.test_profile_endpoint()
        self.test_experience_endpoint()
        self.test_skills_endpoint()
        self.test_achievements_endpoint()
        self.test_education_endpoint()
        self.test_contact_form_submission()
        self.test_contact_retrieval()
        self.test_invalid_endpoints()
        
        # Print summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        print(f"Success Rate: {(self.results['passed']/self.results['total_tests']*100):.1f}%")
        
        if self.results['errors']:
            print("\nFAILED TESTS:")
            for error in self.results['errors']:
                print(f"  • {error}")
        
        print("=" * 60)
        
        return self.results

if __name__ == "__main__":
    tester = PortfolioAPITester()
    results = tester.run_all_tests()
    
    # Exit with error code if tests failed
    if results['failed'] > 0:
        exit(1)
    else:
        print("All tests passed! 🎉")
        exit(0)