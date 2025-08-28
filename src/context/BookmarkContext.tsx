import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BookmarkItem {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  description: string;
  category: string;
  postedDate: string;
}

interface BookmarkContextType {
  bookmarks: BookmarkItem[];
  isBookmarked: (id: string) => boolean;
  addBookmark: (item: BookmarkItem) => void;
  removeBookmark: (id: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider');
  return ctx;
};

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedItems');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id: string) => bookmarks.some(item => item.id === id);
  const addBookmark = (item: BookmarkItem) => {
    if (!isBookmarked(item.id)) setBookmarks(prev => [...prev, item]);
  };
  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(item => item.id !== id));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
