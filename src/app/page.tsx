import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to Berlin flights page
  redirect('/flights/berlin');
}
