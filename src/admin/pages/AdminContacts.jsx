import React, { useEffect, useState } from "react";
import { getContacts } from "../../api/admin.api";
import axios from "../../api/axiosInstance";
import { Eye, Send, Trash2 } from "lucide-react";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* ---------- REPLY ---------- */
  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;

    try {
      setSending(true);

      await axios.post(
        `/admin/contacts/${selected._id}/reply`,
        { replyMessage }
      );

      alert("✅ Reply sent successfully"); // SUCCESS ALERT

      setReplyMessage("");
      setSelected(null);
      fetchContacts();
    } catch (err) {
      alert("❌ Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/admin/contacts/${id}`);
      alert("🗑️ Message deleted successfully");
      fetchContacts();
    } catch (err) {
      alert("❌ Failed to delete message");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3 max-w-xs truncate">{c.message}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      c.status === "Replied"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => setSelected(c)}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Eye size={16} /> View / Reply
                  </button>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!contacts.length && (
          <p className="p-4 text-gray-500">No messages yet.</p>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-1">
              Message from {selected.name}
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              {selected.email} •{" "}
              {new Date(selected.createdAt).toLocaleString()}
            </p>

            <div className="border rounded-lg p-4 mb-4 whitespace-pre-wrap">
              {selected.message}
            </div>

            <textarea
              rows={4}
              placeholder="Type your reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setSelected(null)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSendReply}
                disabled={sending}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-70"
              >
                <Send size={16} />
                {sending ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
