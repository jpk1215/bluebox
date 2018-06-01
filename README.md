# Blue Box Values


## Introduction

Thanks for taking the time to view my project. If you would like to jump right in and have a look here is the link [https://blue-box-values.herokuapp.com/](https://blue-box-values.herokuapp.com/).

This is an application for viewing Flickr galleries by searching by `gallery_id`. Here are the main acceptance criteria for the application:

> 1. Create a web page (the embedding page) that embeds the content of a second web page (the embedded page) in an iframe. The embedded page should allow the user to submit the ID of a Flickr gallery.
> 2. When the user submits a gallery ID, the embedded page should fetch photos from the identified Flickr gallery and display them in thumbnail form in a photo carousel.
> 3. When the user clicks on a thumbnail in the carousel to select it, the embedding page should be updated to display metadata about that photo, including the owner's name, the date it was taken, and the number of times the photo has been viewed.
> 4. When the user clicks on a selected thumbnail to deselect it, the corresponding photo metadata should be cleared from the embedding page.
> 5. Written in JavaScriptES6+ and pages built with React

## Project Layout

I set up the application from scratch to ensure that there were no unneed pieces of code that would clutter it up.

For this project I decided to serve two html files from the same node server in order to achieve the desired iframe structure. I set up a basic express server (with blue box favicon!) to serve both of my applications and my API. The server also exposes the `public` folder on the root (`/`) of the application so I could serve up my static javascript bundles.

Because the project is written in es6 I decided to build the server source code into the `lib` directory which is the entry point for node to run it.

The front end applications are built using webpack to bundle up the source and build them to the public folder for the html to fetch them.

For the two application I used React for both but only Redux for one of them. Because the _embeddingApp_ did not have to make any API calls I felt that using local state was adequate. For the _embeddedApp_ a simple Redux set up was used to make the asynchronous API call and maintain the application state.

For the components I used 3rd party libraries for the iframe and carousel because they were simple implementations that did not require that much set up. I also only used bootstrap classes so no custom css was needed. However there are css modules set up so if custom styles were needed they could be imported into the jsx from separate css files.

## Local Development

If you would like to get the app running for yourself to poke around it was developed using `Node@v8.10.0` and `npm@6.1.0`.

#### Steps

```bash
$ git clone https://github.com/jpk1215/bluebox
```

```bash
$ cd bluebox
```

```bash
$ npm install
```

```bash
$ export FLICKR_API_KEY=<flickr_api_key (either your own or mine)>
```

```bash
$ npm run dev
```

Then navigate to `localhost:9000` and the app will be running ready for use. 

If you are on a company network you may run into trouble with the proxy.

When changes are made to the server the application will automatically restart. If you make changes to either the `embeddingApp` or `embeddedApp` you have to manually compile the source to the `public` folder using:

```bash
$ npx webpack --config ./webpack/configEmbedding.babel.js
```
or 

```bash
$ npx webpack --config ./webpack/configEmbedded.babel.js
```

## Ways to Improve

Given the time constraints of the project there were obviously some things I could not get around to doing. 

The biggest of these was testing. I am a firm believer in 100% unit test coverage with as well as _jest snapshots_ for all components. If I had more time I would have used _enzyme_ and _jest_ to test my code. 

Also, I ran into trouble with my front end build tools so I had to manually build the source and did not have time to set up hot module replacement for the react app. This led to a lot of cli commands and refreshing of pages. I would like to add these as well to the project to make the development experience faster and easier. I also ran into some linting trouble with the `embeddedApp` so I disabled it because it was taking up a decent amount of time to resolve. I would like to go back and fix this up.

I would also like to optimize for other browsers and mobile. I developed the app on my laptop using chrome. I tried to make it responsive with as little styling as possible but it still performs less than ideal on mobile. Given more time I would make sure that it worked for all experiences.

On the topic of accessibility I also believe that I came up short. In order to make the page truly optimized it should be up to the same standard for all users. That means easy keyboard operation and optimized for screen readers.

Obviously there are many more ways to improve the project but I am proud of what I completed and hope you enjoy using it.