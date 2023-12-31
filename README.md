# Welcome PlantUrbanus

The site is now live at [https://plant-urbanus-client-4-2.vercel.app/](https://plant-urbanus-client-4-2.vercel.app/)

A simple app to manage houseplants, for houseplant aficionados.

This is intended as an exploration for using Remix on the front, while accessing a FastAPI Python back-end.

The UI is very simple and not intended to be final. Rather it should be considered a launching platform for more complex functionality and design.

To note about this app:

- This web app was created with [Remix](https://remix.run/docs)
- The back-end api was created with Python using [FastApi](https://fastapi.tiangolo.com/)
- The database is a NoSQL [MongoDB](https://www.mongodb.com/)
- The dynamic images are stored in [Cloudinary](https://cloudinary.com/), however ...
  - file uploads are handled by the api
  - images are retrieved transformed from Cloudinary
  - each plant is able to hold a QR code

## To dos

As a reminder to myself to do:

- make sure that plant names are unique
- ~~add update-photos to an existing plant~~
- add delete to update pictures
- collapsible menu for mobile
- ~~delete plant button~~
- improve delete UX
- Admin functions
- perhaps give every plant a qr code by default.
- display QR code
- mark plants as "dead"
- give update photos a date
- "loading"

<!-- ## Development -->

<!-- From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/` -->
