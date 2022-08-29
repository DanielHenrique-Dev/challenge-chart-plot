# Solution Explanation

I performed the challenge using the TypeScript language for its advantages, such as error detection during project development and the possibility to include IntelliSense to help with the construction of variables and functions, being a strongly typed language it allows greater performance and productivity when executing.

I added the styled-component library to the project to help create and style HTML tags, ease of maintenance and eliminate bugs due to collision of class names.

I chose the project folder structure for the readability and accountability of each part.

The structuring of the components folder was made to contain the component folder with its 3 index files to contain its logic and return its standard function, styled for the creation and styling of HTML tags with the styled-components library and finally the file of unitary tests.

The project has 4 components which are:

- Footer fixed at the bottom of the screen and contains the "GENERATE CHART" button, responsible for initializing the rendering of the graph with the data provided by the user.

- Graphic component responsible for the conversion and graphic visualization of the data provided by the user and error message if the data entered does not meet the established requirements.

- Header fixed at the top of the page containing the title of the web application.

- Input component responsible for capturing the data provided, I chose the codemirror library to assist the user in entering the data.

The pages folder contains the "Home" component responsible for the junction of all the components necessary for the functioning of the web application.



# How to run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
