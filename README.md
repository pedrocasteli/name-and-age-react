# username-and-email-react

### _A form validated by ***React***, ***Express*** and ***HTML5***, using `.json` files as "database"_

This application provides a simple webpage with two input fields and a _send_ button. It was built using **_React and CSS (Flexbox and Grid) with Sass_**. On every keystroke on the **username** input, a custom **_Express API_** checks for matches in the `.json` files. If a **username** match is found, the **email** input cannot be edited, and the form cannot be submited. If no matches are found, however, the user can enter an **email** wich validates using a native HTML5 function. If the **email** entered is valid, the **form** can be submited.

## Tech

-   React.js and Sass (Flexbox and Grid) for the front-end
-   `useReducer()` to validate the entire form
-   Client-side requests with Node's fetch() API
-   Express.js for the back-end

## Usage

This project contains two folders, creatively named "apis" and "web".

Open the "apis" folder, install the dependencies and start the server:

```sh
cd ./apis
npm install
npm start
```

> You can change environment variables in the `.env` file to best suit your needs.

Then open the "web" folder and run the same commands:

```sh
cd ./web
npm install
npm start
```

And that's it. Enjoy!

> The content of the project is written in Brazilian Portuguese.
> It was tested only on Firefox.
