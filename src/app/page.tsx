// pages/index.tsx
import MetadataForm from '../components/MetadataForm';

const Home = () => {
  return (
      <div className={"h-full w-full bg-green-100"}>
        <h1>Metadata Fetcher</h1>
        <MetadataForm />
      </div>
  );
};

export default Home;
