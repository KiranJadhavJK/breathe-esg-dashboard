import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);

  const fetchRecords = () => {
    axios
      .get("http://127.0.0.1:8000/api/test/")
      .then((response) => {
        setRecords(response.data.records);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select CSV file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      fetchRecords();

    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  const approveRecord = async (id) => {
    await axios.post(`http://127.0.0.1:8000/api/approve/${id}/`);
    fetchRecords();
  };

  const flagRecord = async (id) => {
    await axios.post(`http://127.0.0.1:8000/api/flag/${id}/`);
    fetchRecords();
  };

  const pendingCount = records.filter(
    (r) => r.status === "PENDING"
  ).length;

  const approvedCount = records.filter(
    (r) => r.status === "APPROVED"
  ).length;

  const flaggedCount = records.filter(
    (r) => r.status === "FLAGGED"
  ).length;

  return (
    <div style={pageStyle}>

      <h1 style={titleStyle}>
        🌍 ESG Intelligence Dashboard
      </h1>

      <p style={subtitleStyle}>
        Carbon data ingestion, analyst review & emissions workflow
      </p>

      <div style={cardContainerStyle}>

        <div style={cardStyle}>
          <h3>Total Records</h3>
          <h1>{records.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Pending</h3>
          <h1>{pendingCount}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Approved</h3>
          <h1>{approvedCount}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Flagged</h3>
          <h1>{flaggedCount}</h1>
        </div>

      </div>

      <div style={uploadBoxStyle}>

        <h2>📤 Upload CSV</h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ color: "white" }}
        />

        <button
          onClick={uploadFile}
          style={uploadButtonStyle}
        >
          Upload CSV
        </button>

      </div>

      <div style={tableBoxStyle}>

        <h2 style={{ marginBottom: "20px" }}>
          Analyst Review Queue
        </h2>

        <table style={tableStyle}>

          <thead>

            <tr style={tableHeaderRowStyle}>
              <th style={thStyle}>Organization</th>
              <th style={thStyle}>Scope</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Value</th>
              <th style={thStyle}>Unit</th>
              <th style={thStyle}>CO₂e</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>

          </thead>

          <tbody>

            {records.map((record, index) => (

              <tr key={index} style={tableRowStyle}>

                <td style={tdStyle}>
                  {record.organization}
                </td>

                <td style={tdStyle}>
                  {record.scope}
                </td>

                <td style={tdStyle}>
                  {record.category}
                </td>

                <td style={tdStyle}>
                  {record.value}
                </td>

                <td style={tdStyle}>
                  {record.unit}
                </td>

                <td style={{
                  ...tdStyle,
                  color: "#22c55e",
                  fontWeight: "bold"
                }}>
                  {record.co2}
                </td>

                <td style={tdStyle}>

                  <span style={statusStyle(record.status)}>
                    {record.status}
                  </span>

                </td>

                <td style={tdStyle}>

                  {record.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => approveRecord(record.id)}
                        style={approveButtonStyle}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => flagRecord(record.id)}
                        style={flagButtonStyle}
                      >
                        Flag
                      </button>
                    </>
                  )}

                  {record.status === "APPROVED" && (
                    <span style={{
                      color: "#22c55e",
                      fontWeight: "bold"
                    }}>
                      Approved
                    </span>
                  )}

                  {record.status === "FLAGGED" && (
                    <span style={{
                      color: "#ef4444",
                      fontWeight: "bold"
                    }}>
                      Under Review
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "white",
  padding: "40px",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "52px",
  marginBottom: "10px",
};

const subtitleStyle = {
  textAlign: "center",
  color: "#94a3b8",
  marginBottom: "40px",
  fontSize: "18px",
};

const cardContainerStyle = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "35px",
};

const cardStyle = {
  background: "rgba(15, 23, 42, 0.95)",
  padding: "25px",
  borderRadius: "20px",
  width: "220px",
  textAlign: "center",
  boxShadow: "0 0 25px rgba(14,165,233,0.25)",
  border: "1px solid rgba(148,163,184,0.2)",
};

const uploadBoxStyle = {
  background: "rgba(15, 23, 42, 0.95)",
  padding: "25px",
  borderRadius: "20px",
  marginBottom: "35px",
  textAlign: "center",
  boxShadow: "0 0 25px rgba(14,165,233,0.18)",
  border: "1px solid rgba(148,163,184,0.2)",
};

const uploadButtonStyle = {
  marginLeft: "15px",
  padding: "12px 24px",
  background: "#0ea5e9",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const approveButtonStyle = {
  padding: "8px 14px",
  background: "#22c55e",
  border: "none",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  marginRight: "10px",
};

const flagButtonStyle = {
  padding: "8px 14px",
  background: "#ef4444",
  border: "none",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const tableBoxStyle = {
  background: "rgba(15, 23, 42, 0.95)",
  padding: "25px",
  borderRadius: "20px",
  overflowX: "auto",
  boxShadow: "0 0 25px rgba(14,165,233,0.18)",
  border: "1px solid rgba(148,163,184,0.2)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
};

const tableHeaderRowStyle = {
  background: "#0ea5e9",
};

const thStyle = {
  padding: "15px",
};

const tdStyle = {
  padding: "15px",
};

const tableRowStyle = {
  borderBottom: "1px solid #334155",
};

const statusStyle = (status) => ({
  background:
    status === "APPROVED"
      ? "#22c55e"
      : status === "FLAGGED"
      ? "#ef4444"
      : "#f59e0b",

  padding: "8px 15px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "bold",
});

export default App;