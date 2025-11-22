<div align="center">
  <img src="app/public/firebug-logo.png" width="64" height="64" alt="Firebug Logo">
</div>

# Firebug: California Wildfire Risk and Impact Analysis

## DESCRIPTION

California faces escalating wildfire threats driven by climate change, prolonged drought, and expanding urban development. These fires endanger lives, destroy property, harm ecosystems, and compromise air quality for vulnerable populations.

Firebug is a GIS-powered visualization tool that leverages machine learning to predict wildfire risk across California. By providing data-driven, real-time analytics, Firebug empowers communities, emergency responders, and policymakers to make informed decisions about wildfire preparedness, mitigation strategies, land-use planning, and insurance policies.

**Project:** Georgia Tech CSE 6242: Data and Visual Analytics Team 4 (Fall 2025)

**Contributors:** Adhavan Ramkumar, Ahmed Husain, Bukhaar Mahamed, Gautham Pavuluri, Stephen Lester, Whitney Snead

## INSTALLATION

In the root of the project, run the following command to build the Docker image:

```shell
docker build -t firebug .
```

## EXECUTION

Execute the following command to run the application using Docker:

```shell
docker run -p 8080:80 firebug
```

Then open your browser and navigate to `http://localhost:8080`.
