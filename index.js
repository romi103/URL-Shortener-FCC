var express = require('express');
var app = express();
var path = require("path");
var shorturl = require('shorturl');

app.set('port', (process.env.PORT || 5000));

app.get("/", function (req, res) {


    res.sendFile(path.join(__dirname + '/index.html'));


});


app.get('/:link', function (req, res) {

    var link = req.params.link;

   
    function validateLink(url) {
         var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

        return re.test(url);
    }

    var validatedLink = validateLink(link);

    if (validatedLink) {
        shorturl(link, function (result) {
            res.send(result);
        });
    } else {
        res.send("alert");
    }



});



app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
});