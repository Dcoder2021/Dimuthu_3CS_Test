# Dimuthu_3CS_Test
## node file 

## How to Add/Remove Sites

To add or remove sites to be monitored by the application, follow these steps:

### Add a Site
1. Open the `sites.json` file in the root directory of the project.
2. Add a new entry to the array with the following format:
   ```json
   {
     "name": "Site Name",
     "url": "https://example.com"
   }

### Remove a Site
1. Open the sites.json file in the root directory of the project.
2. Locate the entry corresponding to the site you want to remove.
3. Simply remove the entire entry from the array.
4. Create a private repository on a version control platform like GitHub, GitLab, or Bitbucket, and push the code and JSON file to the repository.
5. Create a Dockerfile in the root directory to create a Docker image for the application.

```Dockerfile
# Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "app.js"]

