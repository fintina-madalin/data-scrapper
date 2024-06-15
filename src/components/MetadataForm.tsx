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

        // try {
            const response = await axios.post('/api/fetch-metadata', { url });
            setMetadata(response.data);
        // } catch (error) {
        //     console.error('Error fetching metadata:', error);
        //     setError('Failed to fetch metadata. Please check the console for more details.');
        // }
    };

    return (
        <div>
            <form onSubmit={fetchMetadata}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    required
                />
                <button type="submit">Fetch Metadata</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {metadata && (
                <div>
                    <h3>Title: {metadata.title}</h3>
                    {metadata.image && <img src={metadata.image} alt="Featured" />}
                    <p>Price: {metadata.price}</p>
                </div>
            )}
        </div>
    );
};

export default MetadataForm;
