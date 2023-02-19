window.onload = () =>
{
    const Poruka=document.getElementById("Poruka");
    const Naziv=document.getElementById("Naziv");
    const Kod=document.getElementById("Kod");
    const Dugme=document.getElementById("Dugme");
    Dugme.onclick = () =>
    {
        const objekat =
        {
            naziv: Naziv.value,
            kod: Kod.value
        }   
        PozoviAjaxe.posaljiPredmet(objekat, (error,data) =>
        {
            if(error)
            {
                Poruka.innerHTML=error.status;
                Poruka.style.color="red";
            }
            else
            {
                Poruka.innerHTML=data.status;
                Poruka.style.color="green";
            }
        });
    };
};