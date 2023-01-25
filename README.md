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
The first version of the app used a `.slice(offSet, offSet + pageSize)` chained method on `movies.filter` and `movies` for the pagination. Because I am not storing the votes or manipulating the movies array from a store/main component, that meant the data would be lost each time a card was destroyed/rendered.
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
However this hack does only work for cards destroyed/created for pagination reasons and not when filtering items. The headache to make it work with filtering probably makes it worth installing redux :)

It was my first time manually implementing pagination. I'm used to server side pagination and usually had it covered by our `table` components on the front-end. I think I covered most of the edge cases by going with an offset/pagesize approach and making sure the offset makes change when changing the page size.
