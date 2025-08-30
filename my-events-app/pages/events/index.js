// import { supabase } from '../../lib/supabaseClient'
// import Link from 'next/link'

// export default function EventsPage({ events }) {
// return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">All Events</h1>
//       <div className="grid gap-4">
//         {events.map((event) => (
//           <ul key={event.id}>
//             <Link href={`/events/${event.id}`}>
//               <button className="w-full text-left p-4 rounded-xl shadow-md bg-white hover:bg-gray-600 transition">
//                 <h2 className="text-lg text-black hover:text-white font-semibold">{event.title}</h2>
//               </button>
//             </Link>
//            </ul>
//         ))}
//       </div>
//     </div>
//   );
// }


// export async function getServerSideProps() {
//   const { data, error } = await supabase
//   .from('events')
//   .select('*')


//   if (error) {
//     console.error('Supabase error:', error)
//   }

//   return { props: { events: data || [] } }
// }


import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function HomePage({ events, error }) {
  // If there was an error, display it
  if (error) {
    return <p>Error loading events: {error}</p>;
  }
  
  if (!events || events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upcoming Events</h1>
      <div>
        {events.map((event) => (
          <Link key={event.id} href={`/event/${event.id}`}>
            <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
              <h2>{event.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  console.log("Checking environment variables...");
  console.log("Supabase URL available:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase Key available:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data: events, error } = await supabase.from('events').select('*');

  if (error) {
    console.error("Supabase query error:", error.message);
    return { props: { events: [], error: error.message } };
  }

  return {
    props: {
      events: events || [],
      error: null,
    },
  };
}