const router = require('express').Router();
const facultyController = require('./faculty.controller');

router.get('/all-notices/:id',facultyController.getMyNotices);
router.get('/all-notices/details/:id',facultyController.getNoticeDetails);
router.post('/generate-notice',facultyController.generateNotice);

module.exports = router;