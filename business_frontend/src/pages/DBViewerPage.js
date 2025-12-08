import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DBViewerPage() {

  const [selected, setSelected] = useState("");

  // Hardcode the list of available tables here.
  const tables = [
    { name: "Category", route: "category" },
    { name: "Tag", route: "tag" },
    { name: "Registered_User", route: "users" },
    { name: "Business", route: "business" },
    { name: "Buyer", route: "buyer_table" },
    { name: "Help_Desk", route: "helpdesk_table" },
    { name: "('Transaction')", route: "transaction" },
    { name: "Zipcode_Info", route: "zipcode" },
    { name: "Credit_Cards", route: "creditcards" },
    { name: "Product", route: "products" },
    { name: "Seller", route: "sellers" },
    { name: "Ticket", route: "tickets" },
    { name: "Orders", route: "orders" },
    { name: "Review", route: "review" },
    { name: "Address", route: "address" }
  ];

  return (
    
    <div style={{ padding: "30px" }}>
        <Link 
        to="/helpdesk"
        className="text-blue-600 hover:underline font-medium">
        Return to Help Desk Dashboard
        </Link>
      <h1>Database Viewer</h1>

      {/* Dropdown */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ padding: "10px", marginTop: "20px" }}
      >
        <option value="">Select a table...</option>
        {tables.map((t) => (
          <option key={t.route} value={t.route}>{t.name}</option>
        ))}
      </select>

      {/* Display table data */}
      {selected && <TableView routeName={selected} />}
    </div>
  );
}




function TableView({ routeName }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/${routeName}/`)
      .then((res) => res.json())
      .then((data) => setRows(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [routeName]);

  // No rows? Show message
  if (!rows || rows.length === 0) {
    return <p style={{ marginTop: "20px" }}>No data found.</p>;
  }

  // Automatically derive columns from the first row
  const columns = Object.keys(rows[0]);

  return (
    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}


