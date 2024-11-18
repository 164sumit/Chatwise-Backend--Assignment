import { NextPage } from 'next';
import Head from 'next/head';
import LandingPage from '../components/LandingPage';

const App: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Social Media App</title>
      </Head>
      <LandingPage />
    </div>
  );
};

export default App;
