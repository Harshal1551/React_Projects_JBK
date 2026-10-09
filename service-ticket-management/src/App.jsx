
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3000/tickets";

const initialForm = {
  employeeName: "",
  department: "Development",
  issueType: "Laptop",
  description: "",
  ticketDate: "",
};

function calculatePriority(issueType) {
  if (["Laptop", "Internet"].includes(issueType)) {
    return "High";
  }

  if (["Software", "Email"].includes(issueType)) {
    return "Medium";
  }

  return "Low";
}

function App() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const priority = calculatePriority(form.issueType);

  // GET: Fetch all tickets
  const loadTickets = async () => {
    try {
      const response = await axios.get(API_URL);
      setTickets(response.data);
      setError("");
    } catch {
      setError("Failed to fetch tickets. Check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // POST: Add ticket | PUT: Update ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newErrors = {};

    if (!form.employeeName.trim()) {
      newErrors.employeeName = "Employee name is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!form.ticketDate) {
      newErrors.ticketDate = "Ticket date is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const ticketData = {
      ...form,
      employeeName: form.employeeName.trim(),
      description: form.description.trim(),
      priority,
      status: "Open",
    };

    try {
      if (editingId !== null) {
        const existingTicket = tickets.find(
          (ticket) => ticket.id === editingId
        );

        if (!existingTicket || existingTicket.status !== "Open") {
          setMessage("Only Open tickets can be edited.");
          return;
        }

        await axios.put(`${API_URL}/${editingId}`, {
          ...ticketData,
          id: editingId,
        });

        setMessage("Ticket updated successfully!");
      } else {
        await axios.post(API_URL, ticketData);
        setMessage("Ticket added successfully!");
      }

      await loadTickets();

      setForm(initialForm);
      setEditingId(null);
      setErrors({});
    } catch {
      setMessage("Unable to save ticket. Please try again.");
    }
  };

  // Load selected ticket into the form
  const handleEdit = (ticket) => {
    if (ticket.status !== "Open") {
      setMessage("Only Open tickets can be edited.");
      return;
    }

    setEditingId(ticket.id);

    setForm({
      employeeName: ticket.employeeName,
      department: ticket.department,
      issueType: ticket.issueType,
      description: ticket.description,
      ticketDate: ticket.ticketDate,
    });

    setErrors({});
    setMessage("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setErrors({});
    setMessage("");
  };

  if (loading) {
    return <h2>Loading tickets...</h2>;
  }

  return (
    <>
      <center>
        <div className="container">
          <h1>IT Service Ticket Management</h1>

          <h2>
            {editingId !== null
              ? "Edit Service Ticket"
              : "Add Service Ticket"}
          </h2>

          <form onSubmit={handleSubmit} className="ticket-form">
            <label>Employee Name</label>
            <input
              name="employeeName"
              value={form.employeeName}
              onChange={handleChange}
              placeholder="Enter employee name"
            />
            {errors.employeeName && (
              <p className="error">{errors.employeeName}</p>
            )}

            <label>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              {["Development", "Testing", "HR", "Sales", "Support"].map(
                (department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                )
              )}
            </select>

            <label>Issue Type</label>
            <select
              name="issueType"
              value={form.issueType}
              onChange={handleChange}
            >
              {[
                "Laptop",
                "Internet",
                "Software",
                "Email",
                "Printer",
                "Other",
              ].map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
            </select>

            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue"
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}

            <label>Ticket Date</label>
            <input
              type="date"
              name="ticketDate"
              value={form.ticketDate}
              onChange={handleChange}
            />
            {errors.ticketDate && (
              <p className="error">{errors.ticketDate}</p>
            )}

            <h3>Priority: {priority}</h3>

            {priority === "High" && (
              <p className="warning">Urgent support required.</p>
            )}

            <button type="submit">
              {editingId !== null ? "Update Ticket" : "Submit Ticket"}
            </button>

            {editingId !== null && (
              <button type="button" onClick={handleCancelEdit}>
                Cancel Edit
              </button>
            )}
          </form>

          {message && <p>{message}</p>}
          {error && <p className="error">{error}</p>}

          <h2>All Tickets</h2>

          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Issue Type</th>
                <th>Priority</th>
                <th>Ticket Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.employeeName}</td>
                  <td>{ticket.department}</td>
                  <td>{ticket.issueType}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.ticketDate}</td>
                  <td>{ticket.status}</td>
                  <td>
                    {ticket.status === "Open" ? (
                      <button
                        type="button"
                        onClick={() => handleEdit(ticket)}
                      >
                        Edit
                      </button>
                    ) : (
                      <span>Not editable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </>

  );
}

export default App;
