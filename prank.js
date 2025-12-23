const { createClient } = supabase;

const supabaseClient = createClient(
"https://cbqthvzbwvtoyffkhtfa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicXRodnpid3Z0b3lmZmtodGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTEzODAsImV4cCI6MjA4MTk4NzM4MH0.4cszuf1NtAVhvhiWShSvsSZPPn8q-n3ObJjgMn1O9nQ"
);

const id = new URLSearchParams(location.search).get("img");

const btn = document.createElement("button");
btn.innerText = "Open WhatsApp";
btn.style.cssText = `
  position:fixed;
  bottom:30px;
  left:50%;
  transform:translateX(-50%);
  padding:15px 25px;
  font-size:18px;
  border:none;
  border-radius:30px;
  background:#25D366;
  color:white;
  display:none;
`;

document.body.appendChild(btn);

supabaseClient
  .channel("reveal")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "pranks" },
    payload => {
      if (payload.new.id === id && payload.new.reveal) {
        btn.style.display = "block";
        btn.onclick = () => {
          location.href =
            "https://wa.me/" +
            payload.new.number +
            "?text=" +
            encodeURIComponent(payload.new.message);
        };
      }
    }
  )
  .subscribe();
