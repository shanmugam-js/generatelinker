const supabase = supabaseJs.createClient(
  "https://cbqthvzbwvtoyffkhtfa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicXRodnpid3Z0b3lmZmtodGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTEzODAsImV4cCI6MjA4MTk4NzM4MH0.4cszuf1NtAVhvhiWShSvsSZPPn8q-n3ObJjgMn1O9nQ"
);

const id = new URLSearchParams(location.search).get("img");

supabase
  .channel("reveal")
  .on(
    "postgres_changes",
    { event:"UPDATE", schema:"public", table:"pranks" },
    payload => {
      if(payload.new.id === id && payload.new.reveal){
        location.href =
          "https://wa.me/" +
          payload.new.number +
          "?text=" +
          encodeURIComponent(payload.new.message);
      }
    }
  )
  .subscribe();
