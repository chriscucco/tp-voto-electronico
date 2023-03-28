const {getAllReviews, deleteReviewsByRoom} = require('../../dao/interface');


exports.getReviews = async(req, res) => {
    const response = await getAllReviews()
    return response
};

exports.deleteReviews = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    await deleteReviewsByRoom(room_id)
    return {}
}