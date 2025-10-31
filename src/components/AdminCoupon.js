import React, { useState, useEffect } from "react";
import API_BASE_URL from "./apiConfig";
import { Form, Button, Card, Container, Table, Spinner } from "react-bootstrap";

export default function AdminCoupon() {
  const [coupon, setCoupon] = useState({
    name: "",
    discount: "",
    expiry: "",
    limit: "",
    public: true,
  });

  const [loading, setLoading] = useState(false);
  const [couponsList, setCouponsList] = useState([]); // ✅ new state for coupons
  const [fetching, setFetching] = useState(false); // ✅ loading for table

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCoupon({ ...coupon, [name]: checked });
    } else {
      if (name === "name") value = value.toUpperCase();
      setCoupon({ ...coupon, [name]: value });
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/coupons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coupon),
      });

      const result = await response.json();

      if (result.success) {
        alert("Coupon Generated Successfully!");
        setCoupon({
          name: "",
          discount: "",
          expiry: "",
          limit: "",
          public: true,
        });
        fetchCoupons(); // ✅ refresh table after new coupon
      } else {
        alert("Failed: " + result.message);
      }
    } catch (error) {
      console.error("Error generating coupon:", error);
      alert("Error while saving coupon");
    } finally {
      setLoading(false);
    }
  };

  // ✅ New function to fetch all coupons
  const fetchCoupons = async () => {
    setFetching(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/coupons`);
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setCouponsList(result.data);
      } else {
        console.error("Failed to fetch coupons:", result.message);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setFetching(false);
    }
  };

  // ✅ Fetch on page load
  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(to right, #6a11cb, #2575fc);
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }
        .coupon-header {
          background: linear-gradient(316deg, rgb(42 101 197) 0%, rgb(10 80 177) 100%);
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          border-radius: 10px;
        }
        .coupon-card {
          box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
          border-radius: 12px;
          padding: 20px;
        }
      `}</style>

      <Container className="py-4">
        <div className="coupon-header text-center py-3 mb-4">
          Admin Coupon Management
        </div>

        <Card className="coupon-card mb-5">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={coupon.name}
                onChange={handleChange}
                placeholder="Enter Coupon Name (AUTO CAPS)"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={coupon.discount}
                onChange={handleChange}
                placeholder="Enter Discount Percentage"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="expiry"
                value={coupon.expiry}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Limit to Use</Form.Label>
              <Form.Control
                type="number"
                name="limit"
                value={coupon.limit}
                onChange={handleChange}
                placeholder="Enter Limit"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Public Coupon"
                name="public"
                checked={coupon.public}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleGenerate}
              disabled={loading}
              className="w-100"
            >
              {loading ? "Generating..." : "Generate Coupon"}
            </Button>
          </Form>
        </Card>

        {/* ✅ Coupons List Table */}
        <Card className="coupon-card">
          <h5 className="mb-3 text-center">All Coupons</h5>
          {fetching ? (
            <div className="text-center py-3">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Coupon Name</th>
                  <th>Discount (%)</th>
                  <th>Expiry</th>
                  <th>Limit</th>
                  <th>Public</th>
                </tr>
              </thead>
              <tbody>
                {couponsList.length > 0 ? (
                  couponsList.map((c, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{c.name}</td>
                      <td>{c.discount}</td>
                      <td>{new Date(c.expiry).toLocaleDateString()}</td>
                      <td>{c.limit}</td>
                      <td>{c.public ? "Yes" : "No"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No coupons found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card>
      </Container>
    </>
  );
}
