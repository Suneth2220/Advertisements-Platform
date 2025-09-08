import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MessageSquare, ArrowUpCircle, ArrowDownCircle, Clock, Plus } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  votes: number;
  time: string;
  replies?: Comment[];
}

interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  time: string;
  votes: number;
  comments: Comment[];
}

const mockPost: Post = {
  id: '1',
  title: 'Tips for Safe Online Transactions',
  author: 'SafetyExpert',
  category: 'safety',
  content:
    'Here are some essential tips to keep yourself safe when buying or selling online. Always meet in public places, verify buyer/seller identity, avoid sharing sensitive information, and use secure payment methods when possible.',
  time: '4 hours ago',
  votes: 124,
  comments: [
    {
      id: 'c1',
      author: 'User123',
      content: 'Great tips — also check their account history and reviews before transacting.',
      votes: 12,
      time: '3 hours ago',
      replies: [
        {
          id: 'c1r1',
          author: 'SellerJoe',
          content: 'Yep, and ask for additional photos if something seems off.',
          votes: 4,
          time: '2 hours ago',
        },
      ],
    },
    {
      id: 'c2',
      author: 'Newbie',
      content: 'Would using an escrow service be recommended?',
      votes: 3,
      time: '1 hour ago',
    },
  ],
};

const ForumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const selected = id === mockPost.id ? mockPost : undefined;
  const [post] = useState<Post | undefined>(selected);
  const [comments, setComments] = useState<Comment[]>(post?.comments ?? []);
  const [replyText, setReplyText] = useState('');

  // Voting state (one vote per user using localStorage)
  const [postVotes, setPostVotes] = useState<number>(post?.votes ?? 0);
  const [postVoteDirection, setPostVoteDirection] = useState<'up' | 'down' | null>(() => {
    if (!post) return null;
    const dir = localStorage.getItem(`vote_dir_post_${post.id}`);
    return dir === 'up' || dir === 'down' ? dir : null;
  });
  const [commentVoteDirections, setCommentVoteDirections] = useState<Record<string, 'up' | 'down' | null>>(() => {
    if (!post) return {};
    try {
      const raw = localStorage.getItem(`vote_dir_comments_post_${post.id}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const persistCommentVoteDirections = (next: Record<string, 'up' | 'down' | null>) => {
    if (!post) return;
    localStorage.setItem(`vote_dir_comments_post_${post.id}`, JSON.stringify(next));
  };

  const toggleCommentVote = (commentId: string, direction: 'up' | 'down') => {
    const current = commentVoteDirections[commentId] ?? null;
    let delta = 0;
    if (current === direction) {
      delta = direction === 'up' ? -1 : 1; // undo same vote
      updateCommentVotes(commentId, delta);
      const next = { ...commentVoteDirections, [commentId]: null };
      setCommentVoteDirections(next);
      persistCommentVoteDirections(next);
      return;
    }
    if (current === null) {
      delta = direction === 'up' ? 1 : -1;
    } else {
      // switching vote
      delta = direction === 'up' ? 2 : -2;
    }
    updateCommentVotes(commentId, delta);
    const next = { ...commentVoteDirections, [commentId]: direction };
    setCommentVoteDirections(next);
    persistCommentVoteDirections(next);
  };

  const updateCommentVotes = (commentId: string, delta: number) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, votes: c.votes + delta } : { ...c }));
  };

  const voteOnPost = (direction: 'up' | 'down') => {
    if (!post) return;
    const current = postVoteDirection;
    let delta = 0;
    if (current === direction) {
      delta = direction === 'up' ? -1 : 1; // undo
      setPostVotes(v => v + delta);
      setPostVoteDirection(null);
      localStorage.setItem(`vote_dir_post_${post.id}`, '');
      return;
    }
    if (current === null) {
      delta = direction === 'up' ? 1 : -1;
    } else {
      delta = direction === 'up' ? 2 : -2; // switch
    }
    setPostVotes(v => v + delta);
    setPostVoteDirection(direction);
    localStorage.setItem(`vote_dir_post_${post.id}`, direction);
  };

  const addComment = () => {
    if (!replyText.trim()) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: 'CurrentUser',
      content: replyText.trim(),
      votes: 0,
      time: 'just now',
    };
    setComments(prev => [newComment, ...prev]);
    setReplyText('');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/forums" className="text-sm text-blue-600 hover:underline">&larr; Back to forums</Link>
          <div className="mt-6 bg-white rounded-xl shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Discussion not found</h1>
            <p className="text-gray-600">The discussion may have been removed or the link is incorrect.</p>
            <div className="mt-6">
              <Link to="/forums" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">Browse Forums</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/forums" className="text-sm text-blue-600 hover:underline">&larr; Back to forums</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-sm text-gray-600">{post.category}</span>
                    <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
                  </div>
                  <div className="text-gray-700 mb-4 prose">
                    <p>{post.content}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className="font-medium text-blue-600">{post.author}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{post.time}</span>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center px-3">
                  <button onClick={() => voteOnPost('up')} className={`p-1 rounded hover:bg-gray-100 ${postVoteDirection === 'up' ? 'text-blue-600' : ''}`}>
                    <ArrowUpCircle className={`w-6 h-6 ${postVoteDirection === 'up' ? 'text-blue-600' : 'text-gray-500'}`} />
                  </button>
                  <div className="text-sm font-medium my-1">{postVotes}</div>
                  <button onClick={() => voteOnPost('down')} className={`p-1 rounded hover:bg-gray-100 ${postVoteDirection === 'down' ? 'text-red-600' : ''}`}>
                    <ArrowDownCircle className={`w-6 h-6 ${postVoteDirection === 'down' ? 'text-red-600' : 'text-gray-500'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Comments</h2>
                <p className="text-sm text-gray-500">{comments.length} comments</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">U</div>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Add a public comment"
                      className="w-full border border-gray-300 rounded-lg p-3 min-h-[80px] focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end mt-2">
                      <button onClick={addComment} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                {comments.map((c) => (
                  <div key={c.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">{c.author[0]}</div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-800">{c.author} <span className="text-xs text-gray-500">• {c.time}</span></div>
                          <p className="text-gray-700 mt-2">{c.content}</p>
                        </div>
                        <div className="text-sm text-gray-500 pl-4">
                          <div className="flex flex-col items-center">
                            <button onClick={() => toggleCommentVote(c.id, 'up')} className={`p-1 rounded hover:bg-gray-100 ${commentVoteDirections[c.id] === 'up' ? 'text-blue-600' : ''}`}>
                              <ArrowUpCircle className={`w-5 h-5 ${commentVoteDirections[c.id] === 'up' ? 'text-blue-600' : ''}`} />
                            </button>
                            <div className="text-xs font-medium">{c.votes}</div>
                            <button onClick={() => toggleCommentVote(c.id, 'down')} className={`p-1 rounded hover:bg-gray-100 ${commentVoteDirections[c.id] === 'down' ? 'text-red-600' : ''}`}>
                              <ArrowDownCircle className={`w-5 h-5 ${commentVoteDirections[c.id] === 'down' ? 'text-red-600' : ''}`} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {c.replies && c.replies.length > 0 && (
                        <div className="mt-3 border-l-2 border-gray-200 pl-4 space-y-3">
                          {c.replies.map(r => (
                            <div key={r.id} className="bg-white rounded-lg p-3">
                              <div className="text-sm font-medium">{r.author} <span className="text-xs text-gray-500">• {r.time}</span></div>
                              <p className="text-gray-700 mt-1">{r.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">About this post</h4>
                <MessageSquare className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-sm text-gray-600 mt-3">
                <div className="mb-2"><span className="font-medium">Author:</span> {post.author}</div>
                <div className="mb-2"><span className="font-medium">Category:</span> {post.category}</div>
                <div className="mb-2"><span className="font-medium">Posted:</span> {post.time}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4">
              <h4 className="text-sm font-semibold mb-3">Related discussions</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:bg-gray-50 p-2 rounded">How to spot scam listings</li>
                <li className="hover:bg-gray-50 p-2 rounded">Safe meeting locations</li>
                <li className="hover:bg-gray-50 p-2 rounded">Payment options to avoid</li>
              </ul>
              <div className="mt-4">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Start discussion
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ForumDetailPage;
