const errorResponse = (resp, statusNumber, error) => resp.status(statusNumber).json({ ok: false, error });

module.exports = { errorResponse };