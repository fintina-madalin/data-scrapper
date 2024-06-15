// pages/index.tsx
import MetadataForm from '../components/MetadataForm';
import './globals.css'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Fetch Metadata</h1>
                <MetadataForm />
            </div>
        </div>
    );
};

export default Home;
