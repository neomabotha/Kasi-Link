"use client";

export default function AdminBusinessActions({
  id,
}: {
  id: number;
}) {
  async function approve() {
    await fetch("/api/businesses/approve", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    location.reload();
  }

  async function reject() {
    await fetch("/api/businesses/reject", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    location.reload();
  }

  async function remove() {
    if (!confirm("Delete this business?")) {
      return;
    }

    await fetch("/api/businesses/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    location.reload();
  }

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={approve}
        className="bg-green-600 text-white px-3 py-2 rounded"
      >
        Approve
      </button>

      <button
        onClick={reject}
        className="bg-orange-600 text-white px-3 py-2 rounded"
      >
        Reject
      </button>

      <button
        onClick={remove}
        className="bg-red-600 text-white px-3 py-2 rounded"
      >
        Delete
      </button>
    </div>
  );
}