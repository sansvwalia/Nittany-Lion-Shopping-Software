import { useState } from "react";
import { Link } from "react-router-dom";

export default function EditRecord() {
  const [table, setTable] = useState("");
  const [pk, setPk] = useState("");
  const [pkName, setPkName] = useState("id");

  const [record, setRecord] = useState(null);
  const [status, setStatus] = useState("");

  const fetchRecord = () => {
    fetch(`http://localhost:5000/${table}/${pk}?pk_name=${pkName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setStatus(data.error);
        else {
          setRecord(data);
          setStatus("");
        }
      });
  };

  const updateRecord = () => {
    fetch(`http://localhost:5000/${table}/${pk}?pk_name=${pkName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setStatus(data.error);
        else setStatus("Successfully updated!");
      });
  };

  const handleChange = (field, value) => {
    setRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div style={{ padding: "30px" }}>
        <Link 
        to="/helpdesk"
        className="text-blue-600 hover:underline font-medium">
        Return to Help Desk Dashboard
        </Link>
      <h1>Edit Database Record</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="table name (e.g., products)"
          value={table}
          onChange={(e) => setTable(e.target.value)}
          style={{ padding: "10px", width: "250px", marginRight: "10px" }}
        />
        <input
          placeholder="primary key column"
          value={pkName}
          onChange={(e) => setPkName(e.target.value)}
          style={{ padding: "10px", width: "150px", marginRight: "10px" }}
        />
        <input
          placeholder="primary key value"
          value={pk}
          onChange={(e) => setPk(e.target.value)}
          style={{ padding: "10px", width: "150px" }}
        />

        <button
          onClick={fetchRecord}
          style={{ padding: "10px 20px", marginLeft: "15px" }}
        >
          Load Record
        </button>
      </div>

      {/* Display editable fields */}
      {record && (
        <div style={{ marginTop: "30px" }}>
          <h3>Editing Record</h3>
          {Object.keys(record).map((field) => (
            <div key={field} style={{ marginBottom: "10px" }}>
              <label style={{ marginRight: "10px" }}>{field}: </label>
              <input
                value={record[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                style={{ padding: "8px", width: "250px" }}
              />
            </div>
          ))}

          <button
            onClick={updateRecord}
            style={{ padding: "10px 20px", marginTop: "20px" }}
          >
            Save Changes
          </button>
        </div>
      )}

      {status && <p style={{ marginTop: "25px", color: "green" }}>{status}</p>}
    </div>
  );
}
