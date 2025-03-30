# Letters Management App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

Uses Angular workspaces with two projects:

+ `my-app` : Which is the actual Angular SPA.
+ `design-system` : As the name implies; the design system which is a library.

I've done this mainly since industry grade monorepos such as `Nx` are somewhat overpowered over this and they take too much time to setup too.

On the other hand workspaces are a perfect fit for this use case so why not use it?

## Project setup

### Requirements:
+ nodejs: `^18.19.1 || ^20.11.1 || ^22.0.0`
+ typescript: 	`>=5.5.0 <5.9.0`
+ @angular/cli: `^19.2.x`

### Installation:
1. Make sure you have the Angular CLI installed globally. If not, install it using:
```bash
npm install -g @angular/cli
```
2. Navigate to the project directory: Use the cd command to navigate into the project's root directory:
```bash
cd myWorkspace
```
3. Install dependencies: Run the following command to install all the necessary npm packages:
```bash
npm i
```
4. Install json-server since it is used to run the backend:
```bash
npm i -g json-server
```
5. Build the design-system library, so that its components will be available in the app
```bash
npm run design-system:build
```
6. Run storybook then it would become accessible via the port 6006
```bash
npm run storybook:dev
```
7. Assuming that you already installed `json-server` at step 3, please run the backend.
In what concerns the backend, I just wanted something that will help me persist the data without too much hustle, so there's no one better for this job other than `json-server` which persists the data into the `db.json` file and then expose a `REST API` for us to use in order to interact with it.
```bash
json-server --watch db.json
```
8. Run the angular app **in a new terminal**. it will be available on port `4200`
```bash
npm run start
```


And you are done 🎉🎉 