// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/entrants/new" page={NewEntrantPage} name="newEntrant" />
      <Route path="/entrants/{id:Int}/edit" page={EditEntrantPage} name="editEntrant" />
      <Route path="/entrants/{id:Int}" page={EntrantPage} name="entrant" />
      <Route path="/entrants" page={EntrantsPage} name="entrants" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
