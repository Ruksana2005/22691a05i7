import React, { useState } from 'react';
import axios from 'axios';

export default function UrlForm({ onSuccess }) {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortUrl, setShortUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/shorten', {
        longUrl: url,
        validity: parseInt(validity) || 30,
        customCode: customCode.trim() || undefined
      });
      setShortUrl(response.data.shortUrl);
      setUrl('');
      setValidity('');
      setCustomCode('');
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Long URL"
        required
      />
      <input
        type="number"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        placeholder="Validity in minutes"
      />
      <input
        type="text"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        placeholder="Custom Short Code (optional)"
      />
      <button type="submit">Shorten</button>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}
    </form>
  );
}
