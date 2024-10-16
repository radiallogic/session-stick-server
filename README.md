This project is the display portion of a hardware portable weatherstation to give you localised wind conditions for kite surfing and paragliding. 


# Layout and setup #
docker compose up --build -d


## mqtt ## 
The mqtt message ingestion, stores messages in the mongodb dataase starts on docker compose up. Uses python. 

## display ##
Next.js app to calculate averages and display data on screen.  Need to run 

  yarn dev 

to start the development server.





