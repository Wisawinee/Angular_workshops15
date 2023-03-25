const express = require('express')
const router = express.Router()


router.get('/push/:message', async (req, res) => {
    try {

        const restKey = 'ZjE2MDljYmYtMTIzZC00M2QxLWJlMDAtNGViODY3ZmEyYWY3'
        const appID = '1b56ff27-10aa-4276-b051-8c595ba6f535'

        var sendNotification = function (data) {
            var headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Basic ${restKey}`
            };

            var options = {
                host: "onesignal.com",
                port: 443,
                path: "/api/v1/notifications",
                method: "POST",
                headers: headers
            };

            var https = require('https');
            var req = https.request(options, function (res) {
                res.on('data', function (data) {
                    console.log("Response:");
                    console.log(JSON.parse(data));
                });
            });

            req.on('error', function (e) {
                console.log("ERROR:");
                console.log(e);
            });

            req.write(JSON.stringify(data));
            req.end();
        };

        var message = {
            app_id: appID,
            data: { name: 'macbook', price: 20000},
            contents: { "en": req.params.message },
            included_segments: ["All"]
        };

        sendNotification(message);

        res.status(200).json({ message: 'push success' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router