var setSize;
var usedAns = [];

function rangeGetter() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/maps/range',
        async: false,
        success:(data) => {
            console.log(data.count);
            setSize = data.count;
            console.log(setSize);
        }
    });
}

function randAnsPicker(maxInt)
{
    randNum = Math.floor(Math.random() * (maxInt) + 1);
    console.log(randNum);
}

function optionsGenerator()
{
    var currentOptions = [];
    while (currentOptions.length < 4)
    {
        randNum = randAnsPicker(setSize);
        if (!usedAns.includes(randNum) && currentOptions.length == 0)
        {
            usedAns.push(randNum);
            currentOptions.push(randNum);
        }
        else if (!currentOptions.includes(randNum))
        {
            currentOptions.push(randNum);
        }
    }
    return currentOptions;
}


randAnsPicker(19);

rangeGetter();
console.log(setSize);