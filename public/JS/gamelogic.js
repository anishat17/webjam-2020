var setSize;
var usedAns = [];

function initializeRound(maxLocs) 
{
    let options = optionsGenerator(maxLocs);
    return $.when(linkGetter(options[0]), optionsGetter(options))
        .then((resp1, resp2) => {
            return {
                "link": resp1[0].Link,
                "mapid": resp1[0].Mapid,
                "locations": resp2[0].locations
            }
        })
}   


function rangeGetter() 
{
    // initializes game with number of locations available
    return $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/maps/range',
    }).then(data => {
        return data.count;
    })
}

function randAnsPicker(maxInt)
{
    return Math.floor(Math.random() * (maxInt) + 1);
}

function optionsGenerator(maxLocs)
{
    var currentOptions = [];
    while (currentOptions.length < 4)
    {
        randNum = randAnsPicker(maxLocs);
        if (!usedAns.includes(randNum) && currentOptions.length == 0)
        {
            usedAns.push(randNum);
            currentOptions.push(randNum);
        }
        else if (!currentOptions.includes(randNum) && currentOptions.length > 0)
        {
            currentOptions.push(randNum);
        }
    }
    return currentOptions;
}

function linkGetter(mapid) {
    return $.ajax({
        type: 'GET',
        url: '/api/maps',
        data: {
            "mapid": mapid 
        }
    });
}

function optionsGetter(arr) {
    return $.ajax({
        type: 'GET',
        url: '/api/maps/locations',
        data: {
            "mapid": arr 
        }
    });
}


function checkOption(mapid, option) {
    return $.ajax({
        type: 'GET',
        url: '/api/maps/check',
        data: {
            "mapid": mapid,
            "location": option 
        }
    }).then(data => {
        return data.correct;
    })
}
