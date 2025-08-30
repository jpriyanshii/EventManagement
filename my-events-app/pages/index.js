// // export async function getServerSideProps() {
// //   return {
// //     redirect: {
// //       destination: '/events',
// //       permanent: false,
// //     },
// //   }
// // }

// // export default function Index() {
// //   return null
// // }

// import { supabase } from '../lib/supabaseClient'
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

export default function HomePage({ debugInfo }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '16px' }}>
      <h1>Vercel Environment Debug</h1>
      <p>
        Supabase URL Loaded: 
        <strong>{debugInfo.urlIsPresent ? '✅ Yes' : '❌ No'}</strong>
      </p>
      <p>
        Supabase Key Loaded: 
        <strong>{debugInfo.keyIsPresent ? '✅ Yes' : '❌ No'}</strong>
      </p>
      <p>
        First 8 Chars of Key: 
        <strong>{debugInfo.keySnippet}</strong>
      </p>
    </div>
  );
}

export async function getServerSideProps() {
  const urlIsPresent = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const keyIsPresent = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Get a small, non-secret part of the key to verify it.
  const keySnippet = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 8)
    : "Not Found";

  return {
    props: {
      debugInfo: {
        urlIsPresent,
        keyIsPresent,
        keySnippet,
      },
    },
  };
}