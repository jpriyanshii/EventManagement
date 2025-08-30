// export async function getServerSideProps() {
//   return {
//     redirect: {
//       destination: '/events',
//       permanent: false,
//     },
//   }
// }

// export default function Index() {
//   return null
// }

import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export default function EventsPage({ events }) {
return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Events</h1>
      <div className="grid gap-4">
        {events.map((event) => (
          <ul key={event.id}>
            <Link href={`/events/${event.id}`}>
              <button className="w-full text-left p-4 rounded-xl shadow-md bg-white hover:bg-gray-600 transition">
                <h2 className="text-lg text-black hover:text-white font-semibold">{event.title}</h2>
              </button>
            </Link>
           </ul>
        ))}
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  const { data, error } = await supabase
  .from('events')
  .select('*')


  if (error) {
    console.error('Supabase error:', error)
  }

  return { props: { events: data || [] } }
}
