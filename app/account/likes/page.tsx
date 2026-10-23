import { redirect } from 'next/navigation';

// Keep older bookmarks working without exposing a second collection.
export default function LikesPage() { redirect('/account/saved'); }
