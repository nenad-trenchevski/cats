Sample app built in React that uses https://thecatapi.com/, allowing user to filter different cat breeds.

- Initial data comes from the following endpoint: **/breeds**, for each breed, we call **/images/search** to fetch a corresponding image
- Typing in Search calls **/breeds/search** which suggests different breeds to choose from
- If a breed is selected, different images for the same breed are loaded using **/images/search**

## NOTE

Some code is added only for demonstrating purposes, and might not be suitable for a real-world application.
For this purpose, .env is not added in the .gitignore

### Further optimizations/improvements if the app was about to scale

- virtualized list implementation: https://mui.com/material-ui/react-list/#system-VirtualizedList.tsx
- adding a state management library (zustandt/redux)
- using **Intersection Observer API** for infinite scrolling instead of scroll event
- Splitting **BreedList** into even smaller partial components if we plan to show more info

### Stack

- ReactJS
- Typescript
- [MUI](https://mui.com/)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)

### Required dependencies on the host PC:

[NodeJS (v20.13.1)](https://nodejs.org/)

### Instructions

**It is tested on Microsoft Windows OS using the NodeJS version mentioned above. There is no guarantee it will start/work as expected on other OS**

### Setting up the App

The app was built using Vite
Once cloned, run

```bash
1. npm install
```

to install the necessary dependencies

### Starting Development

Start the app in the `dev` environment:
The development server can be ran locally using npm. This allows testing of the application's code locally.

```bash
npm run dev
```

Congrats, You've made it! :)
