import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecordEditor() {
  const [mode, setMode] = useState("insert"); // insert | update | delete
  const [table, setTable] = useState("");
  const [tables, setTables] = useState([]);

  const [columns, setColumns] = useState([]);
  const [pkName, setPkName] = useState("");
  const [pkValue, setPkValue] = useState("");

  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState("");

  // ----------------------------
  // LOAD AVAILABLE TABLES (OPTIONAL)
  // ----------------------------
  useEffect(() => {
    // If you have a route like GET /tables
    fetch("http://localhost:5000/tables")
      .then(res => res.json())
      .then(data => {
        if (data.tables) setTables(data.tables);
      })
      .catch(() => {});
  }, []);

  // ----------------------------
  // LOAD COLUMNS WHEN TABLE CHANGES
  // ----------------------------
  useEffect(() => {
    if (!table) return;

    fetch(`http://localhost:5000/columns/${table}`)
      .then(res => res.json())
      .then(data => {
        if (data.columns) {
          setColumns(data.columns);

          // identify PK
          const pk = data.columns.find(c => c.pk === 1);
          setPkName(pk ? pk.name : "id");

          // reset form
          const emptyForm = {};
          data.columns.forEach(col => (emptyForm[col.name] = ""));
          setFormData(emptyForm);
        }
      });
  }, [table]);

  // ----------------------------
  // HANDLE FORM CHANGE
  // ----------------------------
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // ----------------------------
  // PERFORM INSERT
  // ----------------------------
  const insertRecord = () => {
    fetch(`http://localhost:5000/${table}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setStatus(data.error);
        else setStatus(`Inserted with ID ${data.id}`);
      });
  };

  // ----------------------------
  // LOAD RECORD FOR UPDATE
  // ----------------------------
  const loadRecord = () => {
    fetch(`http://localhost:5000/${table}/${pkValue}?pk_name=${pkName}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setStatus(data.error);
        } else {
          setFormData(data);
          setStatus("");
        }
      });
  };

  // ----------------------------
  // UPDATE RECORD
  // ----------------------------
  const updateRecord = () => {
    fetch(`http://localhost:5000/${table}/${pkValue}?pk_name=${pkName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setStatus(data.error);
        else setStatus("Record updated successfully!");
      });
  };

  // ----------------------------
  // DELETE RECORD
  // ----------------------------
  const deleteRecord = () => {
    fetch(`http://localhost:5000/${table}/${pkValue}?pk_name=${pkName}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setStatus(data.error);
        else setStatus("Record deleted successfully!");
      });
  };

  // ----------------------------
  // RENDER FIELD INPUTS
  // ----------------------------
  const renderFields = () => {
    if (!columns.length) return null;

    return columns.map(col => (
      <div key={col.name} style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>{col.name}:</label>
        <input
          value={formData[col.name] || ""}
          disabled={mode !== "insert" && col.pk === 1}
          onChange={e => handleFieldChange(col.name, e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
      </div>
    ));
  };

  return (
    <div style={{ padding: "30px" }}>
      <Link
        to="/helpdesk"
        className="text-blue-600 hover:underline font-medium"
      >
        Return to Help Desk Dashboard
      </Link>

      <h1 style={{ marginTop: "20px" }}>Record Editor</h1>

      {/* Mode selection */}
      <div style={{ marginTop: "20px" }}>
        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          style={{ padding: "10px", width: "200px" }}
        >
          <option value="insert">Insert</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>

      {/* Table selection */}
      <div style={{ marginTop: "20px" }}>
        <select
          value={table}
          onChange={e => setTable(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        >
          <option value="">Select table</option>
          {tables.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* PK inputs for update/delete */}
      {(mode === "update" || mode === "delete") && (
        <div style={{ marginTop: "20px" }}>
          <input
            placeholder="Primary key value"
            value={pkValue}
            onChange={(e) => setPkValue(e.target.value)}
            style={{ padding: "10px", width: "200px", marginRight: "10px" }}
          />

          {mode === "update" && (
            <button onClick={loadRecord} style={{ padding: "10px 20px" }}>
              Load Record
            </button>
          )}
        </div>
      )}

      {/* Fields */}
      {mode !== "delete" && table && (
        <div style={{ marginTop: "30px" }}>
          <h3>
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Fields
          </h3>
          {renderFields()}
        </div>
      )}

      {/* Action buttons */}
      {mode === "insert" && (
        <button onClick={insertRecord} style={{ padding: "10px 20px" }}>
          Insert Record
        </button>
      )}

      {mode === "update" && (
        <button onClick={updateRecord} style={{ padding: "10px 20px" }}>
          Update Record
        </button>
      )}

      {mode === "delete" && (
        <button
          onClick={deleteRecord}
          style={{ padding: "10px 20px", marginTop: "20px", backgroundColor: "red", color: "white" }}
        >
          Delete Record
        </button>
      )}

      {status && <p style={{ marginTop: "25px", color: "green" }}>{status}</p>}
    </div>
  );
}
