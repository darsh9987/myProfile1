#!/usr/bin/env python3
"""
Data seeding script for portfolio database
This script populates the MongoDB database with initial portfolio data
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Portfolio data for Darshan Fulfagar
PORTFOLIO_DATA = {
    "profile": {
        "name": "Darshan Fulfagar",
        "title": "Senior Principal Consultant",
        "subtitle": "Enterprise Solutions Architect • CRM Specialist • Technical Leader",
        "tagline": "Transforming complex business challenges into elegant technical solutions with 15+ years of expertise",
        "email": "DFulfagar@gmail.com",
        "phone": "+91 7888 009987",
        "location": "Pune, Maharashtra, India",
        "heroImage": "..\\assets\\images\\heroImage.jpg",
        "profileImage": "..\\assets\\images\\profileImage.jpg",
        "about": {
            "headline": "Bridging Business Vision with Technical Excellence",
            "description": "With over 16 years of experience in software development and technical leadership, I specialize in architecting enterprise-grade solutions that drive business transformation. My expertise spans from Salesforce CRM ecosystems to full-stack development, with a proven track record of delivering scalable solutions across telecom, banking, and wealth management industries.",
            "highlights": [
                "16+ years of hands-on software development and technical leadership",
                "Certified Salesforce Administrator and Platform Developer",
                "Expert in enterprise architecture and microservices design",
                "Led cross-functional teams across multiple continents",
                "Delivered solutions for Fortune 500 companies",
                "Specialized in CRM integrations and automation"
            ],
            "philosophy": "I believe in building solutions that not only meet technical requirements but also enhance user experience and drive business growth. Every line of code should serve a purpose, every architecture should scale, and every solution should empower people to work smarter."
        }
    },
    
    "experiences": [
        {
            "period": "May 2019 - Present",
            "company": "KIYA.AI (Infrasoft Technologies Limited)",
            "role": "Senior Principal Consultant",
            "location": "Remote/Hybrid",
            "type": "leadership",
            "description": "Leading end-to-end Salesforce CRM development and enterprise solution architecture for wealth management organizations across multiple regions.",
            "achievements": [
                "Architected and delivered Siebel CRM IP17 solution for Investment Banking clients in Jersey (UK)",
                "Led implementation of custom REST-based integration applications for Java Business Services",
                "Designed enterprise architecture with microservices, handling millions of business documents",
                "Successfully migrated legacy systems to modern cloud-based solutions on Microsoft Azure",
                "Managed multiple POCs across Salesforce, Microsoft Azure, and API Management platforms",
                "Implemented DevOps practices with Jenkins, reducing deployment time by 60%"
            ],
            "technologies": ["Salesforce CRM", "Siebel CRM", "Microsoft Azure", "Java", "REST APIs", "Jenkins", "Power BI", "SSIS/SSRS"],
            "order": 1
        },
        {
            "period": "Jan 2018 - May 2019",
            "company": "Synechron Technologies LLC",
            "role": "Lead Technology",
            "location": "Dubai, UAE",
            "type": "technical",
            "description": "Spearheaded development of secure Siebel CRM solutions for Core Banking clients, focusing on agile methodologies and high-performance integrations.",
            "achievements": [
                "Developed two secured Siebel IP15 & IP17 CRM solutions for Core Banking in Dubai (UAE)",
                "Built highly scalable CRM solutions using island principles and microservices architecture",
                "Integrated WhatsApp, SalesARM CRM, MeMobile and Finacle for seamless customer experience",
                "Implemented advanced security protocols for banking-grade applications",
                "Led agile development teams across multiple time zones"
            ],
            "technologies": ["Siebel CRM", "Core Banking Systems", "WhatsApp API", "Microservices", "Security Protocols"],
            "order": 2
        },
        {
            "period": "Feb 2015 - Jan 2018",
            "company": "TCognition Consultancy Pvt. Ltd.",
            "role": "Technical Lead",
            "location": "United States (Remote)",
            "type": "consulting",
            "description": "Delivered comprehensive Siebel CRM integration solutions and telematics applications for major automotive manufacturers across the US market.",
            "achievements": [
                "Developed Siebel CRM integration solutions for SiriusXM, serving 14+ million subscribers",
                "Created end-to-end telematics solutions for Honda, Hyundai, Toyota, BMW, Mercedes, and Lexus",
                "Implemented safety, security, and convenience services for connected vehicle ecosystem",
                "Designed integration solutions for Web Services, REST APIs, and JMS Queues",
                "Achieved 99.9% uptime for critical automotive telematics services"
            ],
            "technologies": ["Siebel CRM", "Telematics", "REST APIs", "Web Services", "JMS", "Automotive Systems"],
            "order": 3
        },
        {
            "period": "Jan 2012 - Jan 2015",
            "company": "Persistent Systems Ltd.",
            "role": "Senior Software Engineer",
            "location": "Multiple Locations",
            "type": "development",
            "description": "Developed innovative Siebel CRM solutions with advanced integrations, including international project collaboration in Brussels.",
            "achievements": [
                "Built high-interactivity Siebel CRM application for Bridgestone Tyres Europe business",
                "Developed SAP BAPI integration solutions for seamless enterprise connectivity",
                "Created mobile application solutions for emerging technology platforms",
                "Contributed to university research projects including Metro Ticket Generation System",
                "Worked internationally in Brussels for critical integration projects"
            ],
            "technologies": ["Siebel CRM", "SAP BAPI", "Mobile Development", "Android", "HTML5", "Enterprise Integration"],
            "order": 4
        },
        {
            "period": "Dec 2009 - Jan 2012",
            "company": "Tech Mahindra Ltd.",
            "role": "Technical Associate",
            "location": "India",
            "type": "foundation",
            "description": "Built foundation expertise in large-scale Telecom CRM systems, supporting millions of subscribers with robust postpaid solutions.",
            "achievements": [
                "Contributed to IBM IDEA Project supporting 14+ million current subscribers",
                "Developed postpaid Siebel CRM solutions from ground-up",
                "Gained expertise in billing, revenue assurance, and credit collection systems",
                "Implemented business intelligence and fraud management solutions",
                "Mastered customer relationship management and e-billing systems"
            ],
            "technologies": ["Siebel CRM", "IBM Systems", "Telecom Billing", "Revenue Assurance", "Business Intelligence"],
            "order": 5
        }
    ],
    
    "skills": {
        "technical": {
            "CRM Platforms": ["Salesforce CRM", "Siebel CRM", "Oracle CRM", "Microsoft Dynamics"],
            "Enterprise Integration": ["REST APIs", "SOAP Web Services", "SAP BAPI", "JMS Queues", "MuleSoft"],
            "Cloud Platforms": ["Microsoft Azure", "AWS", "Google Cloud Platform"],
            "Programming": ["Java", "JavaScript", "Python", "C#", ".NET", "Node.js"],
            "Frontend Technologies": ["React.js", "Angular", "Vue.js", "HTML5", "CSS3", "TypeScript"],
            "Databases": ["SQL Server", "Oracle", "MongoDB", "PostgreSQL", "MySQL"],
            "DevOps & Tools": ["Jenkins", "Git", "Docker", "Kubernetes", "Azure DevOps"],
            "Business Intelligence": ["Power BI", "Tableau", "Alteryx", "SSIS", "SSRS"]
        },
        "leadership": [
            "Technical Team Leadership",
            "Enterprise Architecture Design",
            "Project & Program Management",
            "Stakeholder Management",
            "Cross-functional Collaboration",
            "Mentoring & Knowledge Transfer",
            "Client Relationship Management",
            "Agile & DevOps Implementation"
        ],
        "certifications": [
            "Salesforce Certified Administrator",
            "Salesforce Platform Developer I"
        ]
    },
    
    "achievements": [
        {
            "title": "Valuable Team Player Award",
            "description": "Recognized for exceptional contributions to Persistent Systems Ltd.",
            "year": "2014",
            "category": "recognition"
        },
        {
            "title": "Silver Medal Achievement",
            "description": "Secured silver medal in Spirit of Wipro Run 2017 for 5K Marathon in Pune",
            "year": "2017",
            "category": "personal"
        },
        {
            "title": "Paper Presentation Winner",
            "description": "First place twice in Paper Presentation Contest across multiple college events",
            "year": "2008-2009",
            "category": "academic"
        },
        {
            "title": "Best Coders Finalist",
            "description": "Finalist in Best Coders competition at Saga 2008 (MESCOE Inter College Event)",
            "year": "2008",
            "category": "technical"
        },
        {
            "title": "Cricket & Basketball Champion",
            "description": "Winner in multiple college tournaments demonstrating leadership and teamwork",
            "year": "2007-2009",
            "category": "sports"
        }
    ],
    
    "education": {
        "degree": "Bachelor of Engineering (Computer)",
        "university": "Pune University",
        "year": "August 2009",
        "grade": "First Class with Distinction",
        "highlights": [
            "Collaborated with BMC Software for university projects",
            "Gained exposure to BBCA tuner infrastructure software (formerly Marimba)",
            "Specialized in core computer science subjects including algorithms, AI, and software architecture"
        ],
        "subjects": [
            "Design & Analysis of Algorithms",
            "Operating Systems",
            "Principles of Compiler Design",
            "Artificial Intelligence",
            "Network & Information Security",
            "Software Architecture",
            "Database Management Systems",
            "Theory of Computation"
        ]
    }
}

async def seed_database():
    """Seed the database with portfolio data"""
    try:
        print("Starting database seeding...")
        
        # Clear existing collections
        collections = ['profiles', 'experiences', 'skills', 'achievements', 'education']
        for collection_name in collections:
            await db[collection_name].delete_many({})
            print(f"Cleared {collection_name} collection")
        
        # Insert profile data
        await db.profiles.insert_one(PORTFOLIO_DATA["profile"])
        print("✅ Profile data seeded")
        
        # Insert experience data
        await db.experiences.insert_many(PORTFOLIO_DATA["experiences"])
        print("✅ Experience data seeded")
        
        # Insert skills data
        await db.skills.insert_one(PORTFOLIO_DATA["skills"])
        print("✅ Skills data seeded")
        
        # Insert achievements data
        await db.achievements.insert_many(PORTFOLIO_DATA["achievements"])
        print("✅ Achievements data seeded")
        
        # Insert education data
        await db.education.insert_one(PORTFOLIO_DATA["education"])
        print("✅ Education data seeded")
        
        print("\n🎉 Database seeding completed successfully!")
        
        # Verify data
        profile_count = await db.profiles.count_documents({})
        experience_count = await db.experiences.count_documents({})
        skills_count = await db.skills.count_documents({})
        achievements_count = await db.achievements.count_documents({})
        education_count = await db.education.count_documents({})
        
        print(f"\nData verification:")
        print(f"Profiles: {profile_count}")
        print(f"Experiences: {experience_count}")
        print(f"Skills: {skills_count}")
        print(f"Achievements: {achievements_count}")
        print(f"Education: {education_count}")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())