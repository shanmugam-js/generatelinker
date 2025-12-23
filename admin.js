

const { createClient } = supabase;

const supabaseClient = createClient(
  "https://cbqthvzbwvtoyffkhtfa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicXRodnpid3Z0b3lmZmtodGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTEzODAsImV4cCI6MjA4MTk4NzM4MH0.4cszuf1NtAVhvhiWShSvsSZPPn8q-n3ObJjgMn1O9nQ"
);

const num = document.getElementById("num");
const msg = document.getElementById("msg");
const plink = document.getElementById("plink");
const panel = document.getElementById("panel");

function uid() {
  return Math.random().toString(36).slice(2);
}

let prankId = "";

async function generate() {
  const number = num.value.trim();
  const message = msg.value.trim();
  prankId = uid();

  await supabaseClient.from("pranks").insert({
    id: prankId,
    number,
    message,
    reveal: false
  });

  plink.value =
  location.origin +
  location.pathname.replace("admin.html", "") +
  "photo.html?img=" +
  prankId;
}

async function reveal() {
  if (!prankId) return;
  await supabaseClient.from("pranks")
    .update({ reveal: true })
    .eq("id", prankId);
}

async function reset() {
  if (!prankId) return;
  await supabaseClient.from("pranks")
    .update({ reveal: false })
    .eq("id", prankId);
}