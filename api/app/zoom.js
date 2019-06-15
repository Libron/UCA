const express = require('express');
const jwtgen = require('../jwtGenerator');
const config = require('../config');
const rp = require('request-promise');

const router = express.Router();


router.get('/meetings', async (req, res) => {
    const zoomAccounts = [];
    await Promise.all(config.accounts.map(acc => {
        const meetingsUri = `https://api.zoom.us/v2/users/${acc.id}/meetings?type=upcoming`;
        const options = {
            //You can use a different uri if you're making an API call to a different Zoom endpoint.
            uri: meetingsUri,
            qs: {
                status: 'live',
                type: 'upcoming',
                page_size: 30
            },
            auth: {
                'bearer': jwtgen.generate(acc.APIKey, acc.APISecret)
            },
            headers: {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            },
            json: true //Parse the JSON string in the response
        };

        return rp(options)
            .then(function (response) {
                const data = {
                    email: acc.email,
                    ...response
                };
                zoomAccounts.push(data);
            })
    })).then(() => res.send(zoomAccounts))
        .catch(e => {
            console.log(e);
            res.sendStatus(500);
        });
});

router.get('/accounts', (req, res) => {
    const data = config.accounts.reduce((acc, item) => {
        acc[item.accountNumber] = item.email;
        return acc;
    }, {});

    res.send(data);
});

router.get('/meetings/:id',async (req, res) => {
    const data = await config.accounts.find(item => item.accountNumber === parseInt(req.params.id));
    if (!data) {
        res.sendStatus(404);
    }

    const meetingsUri = `https://api.zoom.us/v2/users/${data.id}/meetings?type=upcoming`;
    const options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        uri: meetingsUri,
        qs: {
            status: 'live',
            type: 'upcoming',
            page_size: 30
        },
        auth: {
            'bearer': jwtgen.generate(data.APIKey, data.APISecret)
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    await rp(options)
        .then(function (response) {
            const account = {...response, email: data.email};
           return res.send([account]);
        });

    return res.sendStatus(400);
});

module.exports = router;