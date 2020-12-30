import Layout from './components/Layout';
import Routes from './Routes';
function App({children}) {
  return (
    <div className="App">
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
}

export default App;
