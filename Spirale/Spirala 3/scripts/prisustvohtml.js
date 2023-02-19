function EditujCell(table,i,j,edit) {
    var table = document.getElementById("table");
    var row = table.getElementsByTagName("tr")[i];
    var td = row.getElementsByTagName("td")[j];
  
    td.innerHTML = edit
}
    
window.onload = () =>
{
    const Poruka=document.getElementById("Poruka");
    const tipCasa=document.getElementById("tipCasa");
    const redniBrojCasa=document.getElementById("redniBrojCasa");
    const sedmica=document.getElementById("sedmica");
    const Kod=document.getElementById("Kod");
    const indexStudenta=document.getElementById("indexStudenta");
    const statusPrisustva=document.getElementById("statusPrisustva");
    const Dugme=document.getElementById("Dugme");
    let ImamoLiTabele=false;
    Dugme.onclick = () =>
    {
        let objekat =
        {
            tipCasa: tipCasa.value,
            redniBrojCasa: redniBrojCasa.value,
            sedmica: sedmica.value,
            kodPredmeta: Kod.value,
            indexStudenta: indexStudenta.value,
            statusPrisustva: statusPrisustva.value
        }
        PozoviAjaxe.posaljiPrisustvo(objekat, (error,data) =>
        {
            console.log(tipCasa.value);
            if(error)
            {
                Poruka.innerHTML=error.status;
                Poruka.style.color="red";
                if(ImamoLiTabele==true)
                {
                    document.getElementById("table").remove();
                    ImamoLiTabele=false;
                }
            }
            else
            {   
                let kodPredmeta=objekat.kodPredmeta;
                let indexStudenta=objekat.indexStudenta;
                let sedmica=objekat.sedmica;
                PozoviAjaxe.dajPrisustvo(kodPredmeta,indexStudenta,sedmica, (error,data) =>
                {
                    if(error)
                    {
                        Poruka.innerHTML=error.status;
                        Poruka.style.color="red";
                    }
                    else
                    {
                        Poruka.innerHTML=null;
                        if(ImamoLiTabele==false)
                        {
                            var table=document.createElement("table");
                            table.setAttribute("id", "table");
                        }
                        for (var i = 0; i < 4; i++)
                        {
                            if(ImamoLiTabele==false)
                            {
                                var row = table.insertRow();
                            }
                            for (var j = 0; j < 2; j++)
                            {
                                if(ImamoLiTabele==false)
                                {
                                    var cell = row.insertCell();
                                }
                                if(i==0 && j==0)
                                {
                                    if(ImamoLiTabele==false)
                                    {
                                        cell.innerHTML = "prisustvoZaSedmicu";
                                    }
                                    else
                                    {
                                        document.getElementById("table").rows[i].cells[j].innerHTML="prisustvoZaSedmicu";
                                    }
                                }
                                if(i==0 && j==1)
                                {
                                    if(ImamoLiTabele==false)
                                    {
                                        cell.innerHTML = data.prisustvoZaSedmicu;
                                    }
                                    else
                                    {
                                        document.getElementById("table").rows[i].cells[j].innerHTML=data.prisustvoZaSedmicu;
                                    }
                                }
                                if(i==1 && j==0)
                                {
                                    if(ImamoLiTabele==false)
                                    {
                                        cell.innerHTML = "prisutan";
                                    }
                                    else
                                    {
                                        document.getElementById("table").rows[i].cells[j].innerHTML="prisutan";
                                    }
                                }
                                if(i==1 && j==1)
                                {
                                    if(ImamoLiTabele==false)
                                    {
                                        cell.innerHTML = data.prisutan;
                                    }
                                    else
                                    {
                                        document.getElementById("table").rows[i].cells[j].innerHTML=data.prisutan;
                                    }
                                }
                                if(i==2 && j==0)
                                {
                                    if(ImamoLiTabele==false)
                                    {
                                        cell.innerHTML = "odsutan";
                                    }
                                    else
                                    {
                                        document.getElementById("table").rows[i].cells[j].innerHTML="odsutan";
                                    }
                                }
                                if(i==2 && j==1)
                                {
                                    if(ImamoLiTabele==false)
                                    {
                                        cell.innerHTML = data.odsutan; 
                                    }
                                    else
                                    {
                                        document.getElementById("table").rows[i].cells[j].innerHTML=data.odsutan;
                                    }
                                }
                                if(i==3 && j==0)
                                {
                                    if(ImamoLiTabele==false)
                                    {
                                        cell.innerHTML = "nijeUneseno";
                                    }
                                    else
                                    {
                                        document.getElementById("table").rows[i].cells[j].innerHTML="nijeUneseno";
                                    }
                                }
                                if(i==3 && j==1)
                                {
                                    if(ImamoLiTabele==false)
                                    {
                                        cell.innerHTML = data.nijeUneseno;
                                    }
                                    else
                                    {
                                        document.getElementById("table").rows[i].cells[j].innerHTML=data.nijeUneseno;
                                    }
                                }
                            }
                        }
                        if(ImamoLiTabele==false)
                        {
                            document.body.appendChild(table);
                        }
                        ImamoLiTabele=true;
                    }
                });
            }
        });
    };
};