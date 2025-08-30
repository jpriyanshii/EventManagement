import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventPage() {
  const params = useParams();
  const id = params?.id;

  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      setLoading(true);

      //Fetching event with creator email
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select(`
          id,
          title,
          created_by,
          creator:user_profiles!events_created_by_fkey(email)
        `)
        .eq("id", id)
        .single();

      if (eventError) {
        console.error("Error fetching event:", eventError);
      } else {
        setEvent(eventData);
      }

      //Fetching RSVPs with user emails
      const { data: rsvpData, error: rsvpError } = await supabase
        .from("rsvps")
        .select(`
          status,
          user:user_profiles!rsvps_user_id_fkey(email)
        `)
        .eq("event_id", id);

      if (rsvpError) {
        console.error("Error fetching RSVPs:", rsvpError);
      } else {
        setRsvps(rsvpData || []);
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-600">
        Created by: {event.creator?.email || "Unknown"}
      </p>

      <h2 className="mt-6 text-xl font-semibold">RSVPs</h2>
      {rsvps.length === 0 ? (
        <p>No RSVPs yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {rsvps.map((r, idx) => (
            <li key={idx}>
              {r.user?.email || "Unknown"} — {r.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

