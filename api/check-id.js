const axios = require("axios");

module.exports = async (req, res) => {
  const { uid, zone } = req.query;
  if (!uid || !zone) return res.status(400).json({ success: false, message: "Missing UID or Zone" });

  try {
    const response = await axios.post(
      `${process.env.RESELLER_API_URL}/check-nickname`,
      { user_id: uid, zone_id: zone },
      { headers: { Authorization: `Bearer ${process.env.RESELLER_API_KEY}` } }
    );

    return res.json({
      success: true,
      ign: response.data.username || response.data.nickname || "Verified Player"
    });
  } catch (err) {
    return res.json({ success: false, message: "Player not found" });
  }
};
