# Particeep-ReactInterview
Take home assignment for Particeep's recruitment process

## How to run
- Clone project into your local environment
- Open the project in your terminal and run `npm install`
- Now run `npm run dev`

## Technologies
To complete this assignment, I created the react app with Vite.
I also installed `styled-components` and `prop-types`.
I chose not to use `redux` at all because it is not a technology I am used to (I did use Pinia/Vuex on Vue, but I'm used to having Apollo manage the application cache/refetchQueries instead of using a store). I'll be happy to learn Redux best practices with you :)

## Comments
The first version of the app used a `.slice(offSet, offSet + pageSize)` chained method on `movies.filter` and `movies` for the pagination. Because I am not storing the votes or manipulating the movies array from a store/main component, that meant the data would be lost each time a card was destroyed.
Instead of doing the rational thing (put in a store, or pass anything to manipulate `movies` to `toggle.jsx`), I chose to have a little fun and hack
```
export const CardsList = styled.div`
  & > * {
    display: none;
  }
  ${({ $min, $max }) => `
    & > *:nth-child(n+${$min+1}):nth-child(-n+${$max}) {
        display: flex !important;
    }
  `}
`
```
However this hack does only work for cards destroyed for pagination reasons and not when filtering items. The headache to make it work with filtering probably makes it worth installing redux :)

It was my first time manually implementing pagination. I'm used to server side pagination and usually had it covered by our `table` components on the front-end. I think I covered most of the edge cases by going with an offset/pagesize approach and making sure the offset makes change when changing the page size.

I did not use ESLint for this project, so you can see how I naturally write my code. I did include my usual `eslintrc.json` in the project.

It would probably be better to create a memo for the filtered array of movies with a dependency on the filter. Will make it more readable and more efficient than to run `movies.filter().length` each time it is required (adding logic for no filter / filter makes it verbose).
