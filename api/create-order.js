const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { uid, zone, ign, pack, whatsapp } = req.body;

  const orderId = "ALINA-" + Date.now();

  try {
    const apiRes = await axios.post(
      `${process.env.RESELLER_API_URL}/create-order`,
      {
        order_id: orderId,
        product_id: pack.id,
        user_id: uid,
        zone_id: zone
      },
      { headers: { Authorization: `Bearer ${process.env.RESELLER_API_KEY}` } }
    );

    return res.json({
      success: true,
      orderId,
      status: apiRes.data.status || "Completed"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || "Top-up API failed"
    });
  }
};
