================================================================================
FIREBUG: CALIFORNIA WILDFIRE RISK AND IMPACT ANALYSIS
================================================================================

DESCRIPTION
-----------

California faces escalating wildfire threats driven by climate change, 
prolonged drought, and expanding urban development. These fires endanger lives, 
destroy property, harm ecosystems, and compromise air quality for vulnerable 
populations.

Firebug is a GIS-powered visualization tool that leverages machine learning to 
predict wildfire risk across California. By providing data-driven, real-time 
analytics, Firebug empowers communities, emergency responders, and policymakers 
to make informed decisions about wildfire preparedness, mitigation strategies, 
land-use planning, and insurance policies.

Project: Georgia Tech CSE 6242: Data and Visual Analytics Team 4 (Fall 2025)

Contributors: Adhavan Ramkumar, Ahmed Husain, Bukhaar Mahamed, Gautham Pavuluri, 
Stephen Lester, Whitney Snead

INSTALLATION
------------

Prerequisites: Docker (https://docs.docker.com/get-started/get-docker/) installed on your machine.

In the CODE directory, run the following command to build the Docker image:

    docker build -t firebug .

EXECUTION
---------

In the CODE directory, execute the following command to run the application using Docker:

    docker run -p 8080:80 firebug

Then open your browser and navigate to http://localhost:8080.

DATA AND TRAINING
-----------------

The data, training, and GIS processing scripts can be found under the data/ and notebooks/ directories.
A subset of the trained model weights are included in the database/firebug.db SQLite database.

================================================================================
