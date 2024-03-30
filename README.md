#Run Docker
#Rename .env.example -> .env in directory client and server, server/docker
Then open terminal in server dir:
-yarn
-yarn start:dev
#For run DB in local if don't work server
-yarn docker:up - up DB
-yarn docker:down - down DB
-yarn start:dev
#Then open terminal in client dir:
-yarn 
-yarn dev
