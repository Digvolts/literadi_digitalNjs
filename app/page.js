"use client";
import { useEffect, useState } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>List of Books</h1>
      <table border="2">
        <thead>
          <tr>
            <th>No.</th> {/* Removed extra space */}
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            const properties = JSON.parse(book.properties || '{}');
            const downloadUrl = properties?.attributes?.metadata?.book_download_url || 'N/A';

            return (
              <tr key={book.id}>
                <td>{index + 1}</td> {/* Display the index + 1 */}
                <td>{book.description}</td> {/* Display the description */}
                <td>
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
