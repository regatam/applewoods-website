import React from "react";
import "./PriceSheet.css";

export const priceSheetMeta = {
  eyebrow: "Developer's Introductory Offer",
  title: "Phase 1 Homesites — Suggested Retail vs. Introductory Offer",
  summary: "78 homesites · Introductory offer from $85,000",
  note: "All homesites ≈ 6,000 ft² · Premiere lots highlighted · Prices in USD, introductory developer pricing — subject to availability.",
};

// number, type, srp (suggested retail), offer (introductory). null prices = common area.
export const priceRows = [
  { number: "1001", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1002", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1003", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1004", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1005", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1006", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1007", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1008", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1009", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1010", type: "Corner", srp: "$105,000", offer: "$85,000" },
  { number: "1011", type: "Corner", srp: "$105,000", offer: "$85,000" },
  { number: "1012", type: "Corner", srp: "$105,000", offer: "$85,000" },
  { number: "1013", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1014", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1015", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1016", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1017", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "1018", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2040", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2041", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2042", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2043", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2044", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2061", type: "Premiere", srp: "$120,000", offer: "$95,000" },
  { number: "2062", type: "Premiere", srp: "$120,000", offer: "$95,000" },
  { number: "2063", type: "Premiere", srp: "$120,000", offer: "$95,000" },
  { number: "0001", type: "Club House", srp: null, offer: null },
  { number: "2065", type: "Premiere", srp: "$120,000", offer: "$95,000" },
  { number: "2066", type: "Premiere", srp: "$120,000", offer: "$95,000" },
  { number: "2067", type: "Premiere", srp: "$120,000", offer: "$95,000" },
  { number: "2081", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2082", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2083", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2084", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2085", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "2146", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3001", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3002", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3003", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3004", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3005", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3006", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3007", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3008", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3009", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3010", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3011", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3012", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3013", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3014", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3015", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3016", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3017", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "3018", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "4001", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "4002", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "4003", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5001", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5002", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5003", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5004", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5005", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5006", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5007", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5008", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5009", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5010", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "5011", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "6001", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "6002", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "6003", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "7001", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "7002", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "7003", type: "Park", srp: null, offer: null },
  { number: "7013", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "7014", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "8001", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "8002", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "8003", type: "Court", srp: null, offer: null },
  { number: "8016", type: "Square", srp: "$105,000", offer: "$85,000" },
  { number: "8017", type: "Square", srp: "$105,000", offer: "$85,000" },
];

export default function PriceSheet() {
  return (
    <div className="price-sheet-doc">
      <header className="price-sheet-head">
        <p className="eyebrow">{priceSheetMeta.eyebrow}</p>
        <h3>{priceSheetMeta.title}</h3>
        <p>{priceSheetMeta.summary}</p>
      </header>
      <table className="price-sheet-table">
        <thead>
          <tr>
            <th scope="col">Homesite</th>
            <th scope="col">Type</th>
            <th scope="col">Suggested retail</th>
            <th scope="col">Introductory offer</th>
          </tr>
        </thead>
        <tbody>
          {priceRows.map((row) => (
            <tr key={row.number} className={row.type === "Premiere" ? "is-premiere" : undefined}>
              <td>{row.number}</td>
              <td>{row.type}</td>
              <td>{row.srp ?? "—"}</td>
              <td className="price-offer">{row.offer ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="price-sheet-note">{priceSheetMeta.note}</p>
    </div>
  );
}
