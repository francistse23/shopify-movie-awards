# THE SHOPPIES

[The Shoppies](https://francis-tse-the-shoppies.netlify.app/) Shopify's movie award nominations website

[![Netlify Status](https://api.netlify.com/api/v1/badges/a6062da0-1e50-4964-98ec-42e62cebd122/deploy-status)](https://app.netlify.com/sites/francis-tse-the-shoppies/deploys)

![Website Demo](src/assets/the-shoppies-demo.gif)

## Built With

- [React](https://reactjs.org/) - JavaScript library to build the UI
- [OMDb](http://www.omdbapi.com/) - Movie data

### Website Function Overview

- A debounced search will search [OMDb](http://www.omdbapi.com/) for the query you entered and
  show the relevant movies' title, release year, as well as its poster image, if available.

- Update to the query will automatically update the search results.

- Each movie rendered in the results will have a **Add to Nominations** and **Remove from Nominations** button.

- A user may add at most <ins>**5**</ins> unique movies to the user's nominations list.
  Once all 5 nominations have been selected, a banner will appear at the bottom and notify the user.

#### Notes

- In addition to the technical requirements, I have taken the time to implement animations for the notification banner that tells user all 5 nominations have been selected.

- I also added a loader in the search results container while results are being fetched.

- The nominations list will also persist if the user leaves the page;
  the list will be stored in local storage as a temporary solution.
  More secure databases and hosts, such as Firebase, will be used in a more complex, in-production service.
- React Query is being used to cache results for optimized performance.

- Added testing that supports > 90% coverage for the app.
