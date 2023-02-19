const PozoviAjaxe = (function ()
{
    const posaljiStudent = function(studentObjekat,callback)
    {
        const ajax=new XMLHttpRequest();
        ajax.open("POST","http://localhost:8080/student",true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(studentObjekat));
        ajax.onreadystatechange = function() 
        {
            if (ajax.readyState == 4)
            {
                if (ajax.status == 400)
                {
                    callback((JSON.parse(ajax.responseText)),null);
                }
                else
                {
                    callback(null,(JSON.parse(ajax.responseText)));
                }
            }
        };
    }

    const posaljiPredmet = (predmetObjekat,callback) =>
    {
        const ajax=new XMLHttpRequest();
        ajax.open("POST","http://localhost:8080/predmet",true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(predmetObjekat));
        ajax.onreadystatechange = () =>
        {
            if (ajax.readyState == 4)
            {
                if (ajax.status == 400)
                {
                    callback((JSON.parse(ajax.responseText)),null);
                }
                else
                {
                    callback(null,(JSON.parse(ajax.responseText)));
                }
            }
        };
    }

    const posaljiPrisustvo = function(prisustvoObjekat,callback)
    {
        const ajax=new XMLHttpRequest();
        ajax.open("POST","http://localhost:8080/prisustvo",true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(prisustvoObjekat));
        ajax.onreadystatechange = () =>
        {
            if (ajax.readyState == 4)
            {
                if (ajax.status == 400)
                {
                    callback((JSON.parse(ajax.responseText)),null);
                }
                else
                {
                    callback(null,(JSON.parse(ajax.responseText)));
                }
            }
        };
    }

    const dajPrisustvo = function(kodPredmeta, indexStudenta, sedmica, callback)
    {
        const ajax=new XMLHttpRequest();
        ajax.open("GET","http://localhost:8080/prisustvo?kodPredmeta="+kodPredmeta+"&indexStudenta="
        +indexStudenta+"&sedmica="+sedmica,true);
        ajax.send();
        ajax.onreadystatechange = () =>
        {
            if (ajax.readyState == 4)
            {
                if (ajax.status == 400)
                {
                    callback((JSON.parse(ajax.responseText)),null);
                }
                else
                {
                    callback(null,JSON.parse(ajax.response));
                }
            }
        };
    }
    return {
        posaljiStudent: posaljiStudent,
        posaljiPredmet: posaljiPredmet,
        posaljiPrisustvo: posaljiPrisustvo,
        dajPrisustvo: dajPrisustvo
    }
}());