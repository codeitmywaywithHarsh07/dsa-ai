// app/blogs/page.tsx
'use client'
import { FiBookmark, FiHeart, FiMessageSquare, FiShare2, FiClock } from 'react-icons/fi';
import { FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import Container from '@/components/Container';
import { FaBookmark } from 'react-icons/fa6';

interface Comment {
  user: string;
  comment: string;
  createdAt: string;
}

interface Blog {
  id: string;
  author: string;
  createdAt: string;
  title: string;
  content: string;
  tags: string[];
  image: string;
  likes: number;
  comments: Comment[];
  isBookmarked: boolean;
  isLiked: boolean;
}

const dummyBlogs: Blog[] = [
  {
    id: '1',
    author: 'Jane Smith',
    createdAt: '2023-05-15T10:30:00Z',
    title: 'Mastering Dynamic Programming Patterns',
    content: 'Dynamic programming is both a mathematical optimization method and a computer programming method. In this blog, we will explore common DP patterns like Knapsack, LCS, and more with practical examples to help you crack coding interviews.',
    tags: ['Dynamic Programming', 'Algorithms', 'Interview Prep'],
    image: '/dsa.png',
    likes: 128,
    comments: [
      {
        user: 'Alex Johnson',
        comment: 'This really helped me understand DP better!',
        createdAt: '2023-05-16T08:45:00Z'
      },
      {
        user: 'Sam Wilson',
        comment: 'Could you add more examples on memoization?',
        createdAt: '2023-05-17T14:20:00Z'
      }
    ],
    isBookmarked: true,
    isLiked: false
  },
  {
    id: '2',
    author: 'Mike Chen',
    createdAt: '2023-06-02T14:15:00Z',
    title: 'Binary Search Variations You Should Know',
    content: 'Binary search is not just about finding an element in a sorted array. There are many powerful variations that can solve complex problems efficiently. Learn about finding first/last occurrence, infinite arrays, and rotated array searches.',
    tags: ['Binary Search', 'Search Algorithms', 'DSA'],
    image: '/dsa.png',
    likes: 95,
    comments: [
      {
        user: 'Priya Patel',
        comment: 'The rotated array example was exactly what I needed!',
        createdAt: '2023-06-03T11:30:00Z'
      }
    ],
    isBookmarked: false,
    isLiked: true
  },
  {
    id: '3',
    author: 'Sarah Williams',
    createdAt: '2023-06-10T09:20:00Z',
    title: 'Graph Algorithms for Competitive Programming',
    content: 'Graphs are fundamental data structures in computer science. This post covers essential graph algorithms including BFS, DFS, Dijkstra, and topological sort with implementation tips and common problem patterns.',
    tags: ['Graph Theory', 'Competitive Programming', 'BFS/DFS'],
    image: '/dsa.png',
    likes: 76,
    comments: [],
    isBookmarked: false,
    isLiked: false
  },
  {
    id: '4',
    author: 'David Kim',
    createdAt: '2023-06-18T16:45:00Z',
    title: 'Optimizing Backtracking with Pruning Techniques',
    content: 'Backtracking can be inefficient without proper optimizations. Learn how to apply pruning, memoization, and heuristic approaches to make your backtracking solutions competitive and efficient.',
    tags: ['Backtracking', 'Optimization', 'Recursion'],
    image: '/dsa.png',
    likes: 52,
    comments: [
      {
        user: 'Emma Davis',
        comment: 'Great post! Would love to see more examples with N-Queens.',
        createdAt: '2023-06-19T10:15:00Z'
      },
      {
        user: 'Ryan Park',
        comment: 'This saved me so much time in my last competition!',
        createdAt: '2023-06-20T13:40:00Z'
      }
    ],
    isBookmarked: true,
    isLiked: true
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const timeSince = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
  
  return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(dummyBlogs);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleBookmark = (blogId: string) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId ? { ...blog, isBookmarked: !blog.isBookmarked } : blog
    ));
  };

  const toggleLike = (blogId: string) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId ? { 
        ...blog, 
        isLiked: !blog.isLiked,
        likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1
      } : blog
    ));
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesFilter = activeFilter === 'all' || 
                         blog.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)));

  return (
    <Container>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-tr from-gray-600 to-gray-900 rounded-2xl py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Tech Blogs</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Learn from expert articles on algorithms, data structures, and interview preparation strategies.
          </p>
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full py-3 px-4 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-3 top-3 h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto  py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'all' ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    All Topics
                  </button>
                </li>
                {allTags.map(tag => (
                  <li key={tag}>
                    <button
                      onClick={() => setActiveFilter(tag)}
                      className={`w-full text-left px-3 py-2 rounded-lg ${activeFilter === tag ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeFilter === 'all' ? 'Latest Articles' : `Articles on ${activeFilter}`}
              </h2>
              <div className="text-sm text-gray-500">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
              </div>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBlogs.map(blog => (
                  <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
                          <button 
                            onClick={() => toggleBookmark(blog.id)}
                            className="text-gray-400 hover:text-yellow-500"
                          >
                            {blog.isBookmarked ? (
                              <FaBookmark className="w-5 h-5 text-yellow-500" />
                            ) : (
                              <FiBookmark className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{blog.content}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={() => toggleLike(blog.id)}
                              className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                            >
                              {blog.isLiked ? (
                                <FaHeart className="w-4 h-4 text-red-500" />
                              ) : (
                                <FaRegHeart className="w-4 h-4" />
                              )}
                              <span>{blog.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                              <FiMessageSquare className="w-4 h-4" />
                              <span>{blog.comments.length}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                              <FiShare2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <FiClock className="w-3 h-3" />
                            <span>{timeSince(blog.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
}