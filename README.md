# Build And Deploy Instructions

1. Ensure node is installed. [Offcial installion guide](https://nodejs.org/en/download/)
2. From the root of the repo, run `npm install` to install the project's depencencies.
3. Run `npm run build` to build the project. This results in new folder named `dist` in the root directory from which you can deploy.
4. Upload the files in `dist` to your hosting web server.
5. In Sanity.io, navigate to the Manage Project page for Wohohiame. Under the API tab, there is a CORS orgins section to which you must add your hosting url so that the client can fetch resources from the database.