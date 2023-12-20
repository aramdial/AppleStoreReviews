import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/configureStore';
import { Provider } from 'react-redux';
import Feed from './components/Feed';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Feed />
      </PersistGate>
    </Provider>
  );
}

export default App;
