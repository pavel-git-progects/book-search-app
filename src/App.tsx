import React from 'react';

import BooksPage from './components/booksPage/booksPage';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import BookPage from './components/bookPage/bookPage';

import store from './redux/store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';


const App: React.FC = () => {
  // <ErrorComponent />
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/' component={BooksPage} />
            <Route path='/info/:id' component={BookPage} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;