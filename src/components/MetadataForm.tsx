// src/app/components/MetadataForm.tsx
'use client'
import { useState, FormEvent } from 'react';
import axios from 'axios';

interface Metadata {
    title: string;
    image: string;
    price: string;
}

const MetadataForm = () => {
    const [url, setUrl] = useState<string>('');
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchMetadata = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setMetadata(null);

        try {
            const response = await axios.post('/api/fetch-metadata', { url });
            setMetadata(response.data);
        } catch (error) {
            console.error('Error fetching metadata:', error);
            setError('Failed to fetch metadata. Please check the console for more details.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <form onSubmit={fetchMetadata} className="space-y-4">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Fetch Metadata</button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {metadata && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">{metadata.title}</h3>
                    {metadata.image && <img src={metadata.image} alt="Featured" className="mt-2 rounded-lg shadow-md" />}
                    <p className="mt-2">Price: {metadata.price}</p>
                </div>
            )}
        </div>
    );
};

export default MetadataForm;
