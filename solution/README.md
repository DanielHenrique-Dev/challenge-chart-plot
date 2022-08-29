# Solution Explanation

I did the challenge using the TypeScript language because it offers many advantages, such as error detection during project development and the ability to include IntelliSense to help with variable and function construction. Since it is a strongly typed language, it allows for higher performance and productivity during execution.

I added the Styled Component library to the project to make it easier to create and style HTML tags, simplify maintenance, and avoid errors due to class name collisions.

I chose the project folder structure to ensure readability and accountability of each part.

The component folder was structured to contain the component folder with its 3 index files to contain its logic and return its default function, styled for creating and styling HTML tags with the styled-components library, and finally the unified tests file.

The project has 4 components that are:

- Footer is placed at the bottom of the screen and contains the "GENERATE CHART" button, which is responsible for initializing the display of the chart with the data provided by the user.

- Graphical component, which is responsible for the conversion and graphical representation of the data provided by the user and gives an error message if the data entered does not meet the specified requirements.

- Header at the top of the page that contains the title of the web application.

- Input component responsible for capturing the provided data. I have chosen the Codemirror library to assist the user in entering the data.

The page folder contains the Home component, which is responsible for connecting all the components required for the web application to work.



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
