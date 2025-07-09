export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  videos_count: number;
  subscribers_count: number;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  video_file: string;
  thumbnail: string;
  user: User;
  uploaded_at: string;
  updated_at: string;
  views_count: number;
  duration: string;
  is_public: boolean;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_in_watch_later: boolean;
}

export interface Comment {
  id: number;
  user: User;
  video: number;
  content: string;
  created_at: string;
  updated_at: string;
  parent_comment: number | null;
  replies: Comment[];
  replies_count: number;
}

export interface Playlist {
  id: number;
  name: string;
  description: string;
  user: User;
  videos: number[];
  videos_detail: PlaylistVideo[];
  videos_count: number;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

export interface PlaylistVideo {
  id: number;
  video: Video;
  order: number;
  added_at: string;
}

export interface Subscription {
  id: number;
  subscriber: User;
  subscribed_to: User;
  created_at: string;
}

export interface WatchLater {
  id: number;
  user: User;
  video: Video;
  added_at: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}