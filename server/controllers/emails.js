const postEmail = (req, resp) => resp.json({ emailSent: true, emailData: req.email });

module.exports = { postEmail };