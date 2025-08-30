A minimal full-stack application where users can view and RSVP to events. This project is built with Next.js (using the Pages Router) and Supabase.
It fetches and displays a list of all events from a Supabase database. Each event has a unique, dynamically generated page.

Tech Stack:
Frontend - Next.js 
Backend - Supabase (PostgreSQL, Auth)
Deployment - I tried with Vercel and Netlify both and the project also got deployed but i could only see 'Not found' on my screen, though its perfectly working locally on VS code.

SetUp:
Created a new project on Supabase.
Wrote database schema script in SQL editor to create 'events' and 'rsvps' tables.
Manually added 10 users in Authentication tab and als0 made it into a table 'user_profiles'.
Copied project URL, anon public key, etc APIs in .env.local file.
Wrote code for fronted and supabse connection.
Cloned the repository to github.
